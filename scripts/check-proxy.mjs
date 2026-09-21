/**
 * Checks the device proxy — the one decision that cannot fail loudly.
 *
 * `src/proxy.ts` picks which of the two front ends answers a request. Get it
 * wrong and nothing throws: a phone lands on the desktop copy of exactly one
 * page, or a laptop gets the app, and the site keeps returning 200 forever.
 * Neither `tsc` nor `next build` has anything to say about it, so this is the
 * only place the rule is actually held to.
 *
 * Four things are checked:
 *
 *   1. Every path in the two tables round-trips: a desktop route maps to a
 *      screen that maps back to a desktop route.
 *   2. Every table entry names a route that exists under `src/app`.
 *   3. `config.matcher` in proxy.ts covers every key in both tables.
 *   4. `resolveDeviceTarget` answers a fixture table correctly, trailing
 *      slashes and unknown paths included.
 *
 * The source is loaded straight from TypeScript with jiti, so there is
 * nothing to build and the check runs on any Node the `engines` field allows.
 */
import { readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

import { createJiti } from 'jiti';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const jiti = createJiti(import.meta.url, { alias: { '@': join(ROOT, 'src') } });

const { TO_APP, TO_WEB } = await jiti.import(join(ROOT, 'src/constants/routes.ts'));
const { resolveDeviceTarget, normalisePath } = await jiti.import(
  join(ROOT, 'src/lib/device-route.ts'),
);

const problems = [];

/* ── 1. The two tables agree ──────────────────────────────────────── */

for (const [web, app] of Object.entries(TO_APP)) {
  if (!(app in TO_WEB)) {
    problems.push(`TO_APP sends ${web} to ${app}, which TO_WEB has no entry for.`);
    continue;
  }
  if (TO_WEB[app] !== web) {
    problems.push(`${web} → ${app} → ${TO_WEB[app]} does not come back to where it started.`);
  }
}

/* ── 2. Both sides name routes that exist ─────────────────────────── */

/** `/m/skills` → src/app/(mobile)/m/skills/page.tsx, whatever group holds it. */
function routeExists(path) {
  const clean = path.split('#')[0].replace(/\/$/, '') || '/';
  const segments = clean === '/' ? [] : clean.slice(1).split('/');
  const groups = ['', '(front)', '(mobile)', '(admin)'];
  return groups.some((group) => existsSync(join(ROOT, 'src/app', group, ...segments, 'page.tsx')));
}

for (const [from, table] of [
  ['TO_APP', TO_APP],
  ['TO_WEB', TO_WEB],
]) {
  for (const [key, value] of Object.entries(table)) {
    if (!routeExists(key)) problems.push(`${from} has a key ${key} with no page.tsx behind it.`);
    if (!routeExists(value)) problems.push(`${from} points ${key} at ${value}, which has no page.`);
  }
}

/* ── 3. The matcher covers both tables ────────────────────────────── */

const proxySource = readFileSync(join(ROOT, 'src/proxy.ts'), 'utf8');
const matcherBlock = proxySource.match(/matcher:\s*\[([^\]]*)\]/);

if (!matcherBlock) {
  problems.push('src/proxy.ts has no literal config.matcher array — Next will not see it.');
} else {
  const patterns = [...matcherBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  const covers = (path) =>
    patterns.some((pattern) =>
      pattern.includes(':path*')
        ? path.startsWith(`${pattern.replace('/:path*', '')}/`)
        : pattern === path,
    );

  for (const path of [...Object.keys(TO_APP), ...Object.keys(TO_WEB)]) {
    if (!covers(path)) problems.push(`config.matcher in proxy.ts never sees ${path}.`);
  }
}

/* ── 4. The decision behaves ──────────────────────────────────────── */

const PHONE = true;
const DESKTOP = false;

/** [path, device, expected target or null when already correct] */
const CASES = [
  ['/', PHONE, '/m'],
  ['/', DESKTOP, null],
  ['/m', PHONE, null],
  ['/m', DESKTOP, '/'],
  ['/about', PHONE, '/m/about'],
  ['/m/about', DESKTOP, '/about'],
  ['/m/skills', DESKTOP, '/#skills'],
  ['/m/experience', DESKTOP, '/#experience'],
  ['/m/work', DESKTOP, '/#work'],
  ['/contact', PHONE, '/m/contact'],
  ['/user', PHONE, '/m/user'],
  ['/m/user', DESKTOP, '/user'],
  // Trailing slashes must not fall through either table.
  ['/about/', PHONE, '/m/about'],
  ['/m/about/', DESKTOP, '/about'],
  ['//', PHONE, '/m'],
  // A screen with no desktop twin keeps a phone where it is.
  ['/m/skills', PHONE, null],
  // Nothing the tables do not know about may be moved.
  ['/nowhere', PHONE, null],
  ['/m/nowhere', DESKTOP, null],
];

for (const [path, phone, expected] of CASES) {
  const actual = resolveDeviceTarget(path, phone);
  if (actual !== expected) {
    problems.push(
      `resolveDeviceTarget(${JSON.stringify(path)}, ${phone ? 'phone' : 'desktop'}) ` +
        `gave ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}.`,
    );
  }
}

if (normalisePath('/') !== '/') problems.push('normalisePath("/") must stay "/".');

if (problems.length > 0) {
  console.error('\n❌ Device proxy check failed:\n');
  for (const problem of problems) console.error(`   • ${problem}`);
  console.error('\n   Tables: src/constants/routes.ts · decision: src/lib/device-route.ts\n');
  process.exit(1);
}

console.log(
  `✅ device proxy is consistent — ${Object.keys(TO_APP).length} paired routes, ` +
    `${CASES.length} routing cases`,
);
