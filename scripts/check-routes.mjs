/**
 * Enforces R13: no dynamic segments — `[id]`, `[slug]`, `[...path]` — in src/app.
 *
 * The reason here is not the one the same rule has in the other front ends.
 * This site's routes are a fixed, hand-written set: six sections, a résumé, a
 * console. There is no collection to page through and nothing whose URL comes
 * from data, so a dynamic segment could only ever be a route nobody meant to
 * create — one that renders for any string a crawler tries, and that the
 * device proxy's two lookup tables have no entry for.
 *
 * Something addressed by a value belongs in a query parameter on a fixed route
 * (`/work/detail?id=…`), which the proxy can route and the sitemap can list.
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/app';
const offenders = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith('[')) offenders.push(path);
    walk(path);
  }
}

walk(ROOT);

if (offenders.length > 0) {
  console.error(`\n❌ Dynamic segments found in ${ROOT} — not allowed (R13):\n`);
  for (const path of offenders) console.error(`   ${path}`);
  console.error(
    '\n   Use a fixed route plus a query parameter instead, e.g.\n' +
      '   src/app/(front)/work/detail/page.tsx → /work/detail?id=…\n' +
      '   and add the route to both tables in src/constants/routes.ts.\n',
  );
  process.exit(1);
}

console.log('✅ routes are all static — no dynamic segments in src/app (R13)');
