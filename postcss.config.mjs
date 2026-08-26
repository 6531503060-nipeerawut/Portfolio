/**
 * Tailwind v4 needs no tailwind.config.js — the design tokens live in
 * `@theme` inside src/app/globals.css, and the content it scans is inferred
 * from the project. This file is the whole build-side configuration.
 */
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
