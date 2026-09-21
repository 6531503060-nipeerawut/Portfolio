/**
 * Frees the dev port before `next dev` takes it. Runs from `predev`.
 *
 * Two failures this prevents, both of which look like a broken project rather
 * than a stale process:
 *
 * 1. `EPERM: operation not permitted, rename '….next-dev\…manifest.js.tmp.x'`
 *    repeated a dozen times, then pages start returning 500. On Windows a file
 *    another process holds open cannot be renamed over, so a dev server that
 *    was closed by shutting its terminal — and is therefore still running —
 *    makes every manifest write of the new one fail.
 *
 * 2. Next quietly moving to port 3001 when 3000 is busy, so localhost:3000
 *    keeps serving whatever the old process is building.
 *
 * It is deliberately incapable of blocking the start: anything that goes wrong
 * here is reported and ignored. Its job is tidying up, not gatekeeping.
 */
import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';

const port = Number(process.argv[2] ?? 3000);
const isWindows = process.platform === 'win32';

/** Every pid listening on `target`, excluding this process. */
function listenersOn(target) {
  try {
    if (isWindows) {
      const out = execFileSync('netstat', ['-ano', '-p', 'tcp'], { encoding: 'utf8' });
      return [
        ...new Set(
          out
            .split('\n')
            .filter((line) => /LISTENING/i.test(line) && line.includes(`:${target} `))
            .map((line) => Number(line.trim().split(/\s+/).pop()))
            .filter((pid) => Number.isInteger(pid) && pid > 0 && pid !== process.pid),
        ),
      ];
    }
    const out = execFileSync('lsof', ['-ti', `tcp:${target}`, '-sTCP:LISTEN'], {
      encoding: 'utf8',
    });
    return [...new Set(out.split('\n').map(Number).filter(Boolean))];
  } catch {
    // netstat/lsof exits non-zero when nothing matches. Nobody is listening.
    return [];
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const stale = listenersOn(port);
if (stale.length === 0) process.exit(0);

console.log(`⚠️  Port ${port} is busy — closing: ${stale.join(', ')}`);
for (const pid of stale) {
  try {
    process.kill(pid);
  } catch {
    // Already gone, or not ours to kill. The wait below decides either way.
  }
}

// Wait for the port to actually free rather than trusting the signal: Windows
// releases the handle some time after the process is gone.
let free = false;
for (let i = 0; i < 40; i += 1) {
  await sleep(250);
  if (listenersOn(port).length === 0) {
    free = true;
    break;
  }
}

if (!free) {
  console.log(`⚠️  Port ${port} is still held — close it by hand and start again.`);
  process.exit(0);
}

/*
 * Killing the process is not enough: it may have left a manifest half written,
 * and the next dev server will read that and report `Could not find files for
 * /_error in build-manifest.json`. Only the dev output is removed — `.next`,
 * which belongs to `next build`, is not touched.
 */
try {
  rmSync('.next-dev', { recursive: true, force: true });
  console.log('🧹 Cleared .next-dev left by the previous process.');
} catch {
  console.log('⚠️  Could not clear .next-dev — delete it by hand if EPERM comes back.');
}
