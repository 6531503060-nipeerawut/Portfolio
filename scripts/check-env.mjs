/**
 * Checks the environment files before anything reads them.
 *
 * Next and dotenv both fail silently here: a missing file is not an error, a
 * missing key is `undefined`, and a key that is present but empty is left
 * empty rather than filled in from anywhere else. All three surface later as a
 * wrong URL in a meta tag, which nobody notices until a link is shared.
 *
 * Four things are checked:
 *
 *   1. Every file listed in ENVIRONMENTS exists.
 *   2. Its keys match .env.example exactly — neither side may drift.
 *   3. Every key has a value.
 *   4. Every NEXT_PUBLIC_* key that src/ actually reads is in .env.example.
 *
 * .env.local is required; the others are optional and only checked when
 * present, because deploying on Vercel means the dashboard holds them.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EXAMPLE = '.env.example';

/** file → the value NEXT_PUBLIC_APP_ENV must hold inside it. */
const ENVIRONMENTS = [
  { file: '.env.local', appEnv: 'local', required: true },
  { file: '.env.production', appEnv: 'production', required: false },
];

const problems = [];

/** Parses a dotenv file into an ordered list of [key, value]. */
function parse(file) {
  return readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const at = line.indexOf('=');
      return at === -1 ? [line, ''] : [line.slice(0, at).trim(), line.slice(at + 1).trim()];
    });
}

if (!existsSync(EXAMPLE)) {
  console.error(`\n❌ ${EXAMPLE} is missing — it is the list of keys every other file copies.\n`);
  process.exit(1);
}

const expected = parse(EXAMPLE).map(([key]) => key);

for (const { file, appEnv, required } of ENVIRONMENTS) {
  if (!existsSync(file)) {
    if (required) problems.push(`${file} is missing — copy ${EXAMPLE} to it and fill it in.`);
    continue;
  }

  const entries = parse(file);
  const keys = entries.map(([key]) => key);

  for (const key of expected) {
    if (!keys.includes(key)) problems.push(`${file} is missing ${key} (it is in ${EXAMPLE}).`);
  }
  for (const key of keys) {
    if (!expected.includes(key)) problems.push(`${file} has ${key}, which ${EXAMPLE} does not.`);
  }
  for (const [key, value] of entries) {
    if (value === '') problems.push(`${file} → ${key} is empty. Give it a value or remove it.`);
  }

  const declared = entries.find(([key]) => key === 'NEXT_PUBLIC_APP_ENV')?.[1];
  if (declared && declared !== appEnv) {
    problems.push(`${file} → NEXT_PUBLIC_APP_ENV is "${declared}", expected "${appEnv}".`);
  }
}

/* ── 4. Keys the source reads must be documented ──────────────────── */

const used = new Set();
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path);
      continue;
    }
    if (!['.ts', '.tsx'].includes(extname(entry.name))) continue;
    for (const match of readFileSync(path, 'utf8').matchAll(/process\.env\.(NEXT_PUBLIC_\w+)/g)) {
      used.add(match[1]);
    }
  }
}
if (existsSync('src') && statSync('src').isDirectory()) walk('src');

for (const key of used) {
  if (!expected.includes(key)) {
    problems.push(`src/ reads ${key}, which is not in ${EXAMPLE}. Document it there.`);
  }
}

if (problems.length > 0) {
  console.error('\n❌ Environment check failed:\n');
  for (const problem of problems) console.error(`   • ${problem}`);
  console.error('');
  process.exit(1);
}

console.log('✅ env files are complete and consistent with .env.example');
