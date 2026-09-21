import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';

/**
 * The rules of this project that a machine can actually hold us to.
 *
 * A rule that lives only in CLAUDE.md is advice; a rule ESLint catches is a
 * rule. R3 (all HTTP through the api-client), R6 (TypeScript used in full) and
 * R9 (no importing across features) are enforced here so that nobody has to
 * remember them during review.
 */

/** One message for every route around the api-client. */
const BYPASS_MESSAGE =
  "Do not speak HTTP directly (R3) — use getJson from '@/lib/api-client', " +
  'so caching, failure handling and the shape of a result are decided in one place.';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,

  // Turns off what collides with Prettier. Must come before our own rules, or
  // it would switch off the ones we are about to switch on.
  prettier,

  // ── R3: every request goes through @/lib/api-client ──────────────────────
  {
    /*
     * Scoped to src/ on purpose. R3 is about the code that ships to a visitor:
     * one place decides how long a response is cached, what counts as a
     * failure and what a failure turns into. The Node scripts under scripts/
     * are build tooling that never reaches a browser — check-fold.mjs talks to
     * a local Chrome over its debugging port, which is not an API call and has
     * no policy to share.
     */
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Catches bare `fetch(...)` and `XMLHttpRequest`.
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: BYPASS_MESSAGE },
        { name: 'XMLHttpRequest', message: BYPASS_MESSAGE },
      ],

      /**
       * `no-restricted-globals` only sees a bare identifier — `window.fetch`
       * and `globalThis.fetch` both slip past it, which would leave any file
       * free to route around the client with lint still green.
       */
      'no-restricted-syntax': [
        'error',
        {
          selector: "MemberExpression[property.name='fetch']",
          message: `${BYPASS_MESSAGE} (window.fetch and globalThis.fetch included)`,
        },
        {
          selector: "MemberExpression[property.name='XMLHttpRequest']",
          message: BYPASS_MESSAGE,
        },
        {
          selector: "NewExpression[callee.name='XMLHttpRequest']",
          message: BYPASS_MESSAGE,
        },
      ],
    },
  },
  {
    // The one file allowed to touch the network directly.
    files: ['src/lib/api-client.ts'],
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
    },
  },

  // ── R9: features may not import each other ───────────────────────────────
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/include': ['src/**/*.{ts,tsx}'],
      /**
       * The device proxy is the one file src/ holds outside any folder, and
       * element patterns match folders rather than files — so it is excused
       * from classification here and governed by its own rule further down,
       * which is narrower than an element policy would have been anyway.
       */
      'boundaries/ignore': ['src/proxy.ts'],
      'boundaries/elements': [
        { type: 'app', pattern: ['src/app', 'src/app/**'] },
        { type: 'feature', pattern: 'src/features/*', capture: ['featureName'] },
        {
          type: 'shared',
          pattern: [
            'src/components',
            'src/components/**',
            'src/hooks',
            'src/hooks/**',
            'src/lib',
            'src/lib/**',
            'src/types',
            'src/types/**',
            'src/constants',
            'src/constants/**',
          ],
        },
      ],
    },
    rules: {
      /**
       * A file in src/ that belongs to no element is an error in itself.
       *
       * This matters more than it looks: `boundaries/dependencies` skips files
       * it does not recognise even with `default: 'disallow'`. So anyone who
       * adds `src/utils/` or `src/store/` creates a corridor through which
       * features can import each other with lint still green — R9 would
       * disappear without a word. This forces a new top-level folder to be
       * declared above before it can be used at all.
       */
      'boundaries/no-unknown-files': 'error',

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          message:
            'This import crosses an architectural boundary (R9) — a feature may not reach into ' +
            'another feature, and shared code may not know features exist. Move what is shared ' +
            'into components/, hooks/, lib/, types/ or constants/.',
          policies: [
            // app/ is only a way in to a route: it may pick a Screen out of a
            // feature and use anything shared.
            {
              from: { element: { type: 'app' } },
              allow: { to: { element: { types: { anyOf: ['app', 'feature', 'shared'] } } } },
            },
            // A feature may use its own files, but not another feature's.
            {
              from: { element: { type: 'feature' } },
              allow: {
                to: {
                  element: { type: 'feature', captured: { featureName: '{{from.featureName}}' } },
                },
              },
            },
            // A feature may use shared code.
            {
              from: { element: { type: 'feature' } },
              allow: { to: { element: { type: 'shared' } } },
            },
            // Shared code must not know about features — that would be a
            // dependency pointing back up the tree.
            {
              from: { element: { type: 'shared' } },
              allow: { to: { element: { type: 'shared' } } },
            },
          ],
        },
      ],
    },
  },

  // ── R9, for the one file boundaries cannot classify ──────────────────────
  {
    files: ['src/proxy.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*', '@/features/**', '@/app/*', '@/app/**'],
              message:
                'The device proxy runs before any route and must stay independent of both ' +
                'front ends (R9) — it may read constants/ and lib/ and nothing else. The route ' +
                'tables are in @/constants/routes and the decision in @/lib/device-route.',
            },
          ],
        },
      ],
    },
  },

  // ── R6: TypeScript used in full ──────────────────────────────────────────
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  globalIgnores([
    '.next/**',
    '.next-dev/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Two hand-laid-out print documents and the script that drives the
    // desktop document, none of which are modules.
    'resume/**',
    'public/**',
  ]),
]);

export default eslintConfig;
