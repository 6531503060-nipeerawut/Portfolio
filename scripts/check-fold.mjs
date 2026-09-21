/**
 * Measures whether the desktop document still fits the fold.
 *
 * The document is built on a promise the CSS cannot keep by itself: each
 * numbered section is one screen, snapped to, read without scrolling, and left
 * by scrolling once. `SECTION` in `components/ui/document.ts` sets a *minimum*
 * height of one viewport — so a section that outgrows the screen does not
 * error, or warn, or look broken in a screenshot taken at the top of the page.
 * It just quietly starts being cut off at the bottom edge, and the only way to
 * find out is to open it at a real window size and look.
 *
 * Which is how a section grew past the fold on 2026-09-21: four skill groups
 * gained rows and nothing said a word.
 *
 * So this measures instead. It starts the built site, drives the installed
 * Chrome over the DevTools protocol (no extra dependency — Node has WebSocket
 * and Chrome has a debugging port), and at each reference window size reports
 * any section taller than the space between the navbar and the bottom edge.
 *
 * ⚠️ Needs `npm run build` first — it serves `.next`, not the dev server.
 *
 * The phone build is deliberately not checked: its screens scroll by design,
 * which is what a phone does, and `min-h` is nowhere near them.
 */
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/* ── What counts as a desktop ─────────────────────────────────────── */

/**
 * The window sizes this has to hold at.
 *
 * `assert: false` rows are measured and printed but not failed on. Below
 * 1280px `SECTION` stops asking for a full-viewport minimum height and the
 * document simply scrolls, the way it already does on a tablet — so there is
 * no fold to be past. The row stays because the number is still worth seeing
 * when the layout is changed.
 */
const VIEWPORTS = [
  { label: '1024×768  (below the promise)', width: 1024, height: 768, assert: false },
  { label: '1280×800  (smallest asserted)', width: 1280, height: 800, assert: true },
  { label: '1366×768  (common laptop)', width: 1366, height: 768, assert: true },
  { label: '1440×900  (laptop)', width: 1440, height: 900, assert: true },
  { label: '1680×1050 (large laptop)', width: 1680, height: 1050, assert: true },
  { label: '1920×1080 (monitor)', width: 1920, height: 1080, assert: true },
];

/** Routes that use the full-height section layout. */
const ROUTES = ['/', '/about', '/contact', '/user'];

const CHROME =
  process.env.CHROME_PATH ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find((path) => existsSync(path));

if (!CHROME) {
  console.error('\n⚠️  Chrome not found — skipping the fold check.');
  console.error('   Set CHROME_PATH to run it.\n');
  process.exit(0);
}

const PORT = Number(process.env.FOLD_PORT ?? 3177);
const DEBUG_PORT = PORT + 1;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const PROFILE = join(tmpdir(), `portfolio-fold-${process.pid}`);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ── Server ───────────────────────────────────────────────────────── */

if (!existsSync('.next/BUILD_ID')) {
  console.error('\n❌ No production build found. Run `npm run build` first.\n');
  process.exit(1);
}

const server = spawn('npx', ['next', 'start', '--port', String(PORT)], {
  stdio: 'ignore',
  shell: process.platform === 'win32',
});

async function waitFor(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  return false;
}

/* ── Chrome, over the DevTools protocol ───────────────────────────── */

let chrome;
let socket;
let nextId = 0;
const pending = new Map();

function send(method, params = {}, sessionId) {
  const id = (nextId += 1);
  socket.send(JSON.stringify({ id, method, params, sessionId }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    setTimeout(() => {
      if (pending.delete(id)) reject(new Error(`${method} timed out`));
    }, 30_000);
  });
}

/** Runs an expression in the page and returns its value. */
async function evaluate(sessionId, expression) {
  const { result, exceptionDetails } = await send(
    'Runtime.evaluate',
    { expression, returnByValue: true, awaitPromise: true },
    sessionId,
  );
  if (exceptionDetails) throw new Error(exceptionDetails.text ?? 'evaluation failed');
  return result.value;
}

/**
 * Measures every section on the page that is currently laid out.
 *
 * `--nav-offset` is what the stylesheet reserves for the fixed navbar, and it
 * is the same value `scroll-padding-top` uses — so the space a section really
 * has is the viewport minus that. Anything past it is below the fold.
 */
const MEASURE = `(() => {
  /* Read scroll-padding-top rather than --nav-offset itself. The token is
     declared as calc(72px + env(safe-area-inset-top)), and a custom property
     comes back as that literal string — parseFloat gives NaN, which silently
     became a zero offset and made this check 72px too generous. The computed
     scroll-padding-top is the same value with the calc already resolved. */
  const navOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const available = window.innerHeight - navOffset;
  return {
    available: Math.round(available),
    navOffset: Math.round(navOffset),
    sections: [...document.querySelectorAll('section[id], main > div > section')].map((el) => ({
      id: el.id || '(unnamed)',
      height: Math.round(el.getBoundingClientRect().height),
      /* The hero is the one section the navbar floats over rather than sits
         above: it is min-h-svh and its content is inset instead. So it gets
         the whole viewport, and every section a visitor arrives at by jumping
         gets the viewport minus the bar that would cover its first line. */
      budget: Math.round(el.id === 'home' ? window.innerHeight : available),
    })),
  };
})()`;

const problems = [];

try {
  if (!(await waitFor(ORIGIN))) {
    console.error('\n❌ The server did not come up.\n');
    process.exit(1);
  }

  chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${PROFILE}`,
      `--remote-debugging-port=${DEBUG_PORT}`,
      /* The animations rest at opacity 0 and rise on a timer, which a
         measurement would otherwise race. Layout is identical either way —
         the entrance moves opacity and translate, never height. */
      '--force-prefers-reduced-motion',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  let version;
  for (let i = 0; i < 60; i += 1) {
    try {
      version = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)).json();
      break;
    } catch {
      await sleep(500);
    }
  }
  if (!version) {
    console.error('\n❌ Chrome did not expose a debugging port.\n');
    process.exit(1);
  }

  socket = new WebSocket(version.webSocketDebuggerUrl);
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id == null) return;
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  });
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', () => reject(new Error('debugger socket failed')), {
      once: true,
    });
  });

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);

  for (const viewport of VIEWPORTS) {
    await send(
      'Emulation.setDeviceMetricsOverride',
      { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: false },
      sessionId,
    );

    console.log(`\n  ${viewport.label}`);

    for (const route of ROUTES) {
      await send('Page.navigate', { url: ORIGIN + route }, sessionId);
      // Two frames is enough for layout; the fonts are self-hosted and the
      // only image with intrinsic size carries width and height attributes.
      await sleep(900);

      const { sections } = await evaluate(sessionId, MEASURE);
      for (const section of sections) {
        const over = section.height - section.budget;
        const label = `${route}#${section.id}`.padEnd(22);
        const size = `${section.height}px / ${section.budget}px`;
        if (over <= 0) {
          console.log(`    ✓ ${label} ${size}  (${over}px spare)`);
        } else if (!viewport.assert) {
          console.log(`    · ${label} ${size}  (+${over}, below the promise)`);
        } else {
          problems.push(
            `${viewport.label} · ${route} → section "${section.id}" is ${over}px past the fold ` +
              `(${size})`,
          );
          console.log(`    ✖ ${label} ${size}  (+${over})`);
        }
      }
    }
  }
} finally {
  socket?.close();
  chrome?.kill();
  server.kill();
  // Only ever this run's own profile — never a browser the person had open.
  try {
    rmSync(PROFILE, { recursive: true, force: true });
  } catch {
    /* Windows may still hold it; it is under the temp directory either way. */
  }
  try {
    execFileSync(process.execPath, [join('scripts', 'free-port.mjs'), String(PORT)], {
      stdio: 'ignore',
    });
  } catch {
    /* Best effort. */
  }
}

if (problems.length > 0) {
  console.error('\n❌ Sections taller than the fold:\n');
  for (const problem of problems) console.error(`   • ${problem}`);
  console.error(
    '\n   Every numbered section of the document is meant to be one screen.\n' +
      '   Either cut what was added, or give that section a denser layout —\n' +
      '   do not let it spill, because nothing else will tell you that it has.\n',
  );
  process.exit(1);
}

console.log('\n✅ every section fits the fold at all reference window sizes\n');
