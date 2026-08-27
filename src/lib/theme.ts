/** The stored preference. Also read by public/js/main.js. */
export const THEME_KEY = "portfolio-theme";

/**
 * What the browser chrome is painted, per palette. These are `--bg` from
 * globals.css; the address bar and the page have to agree, so an explicit
 * override cannot desync them.
 */
export const THEME_COLOR = { dark: "#05070f", light: "#eceff8" } as const;

export type Theme = keyof typeof THEME_COLOR;

/**
 * Palette bootstrap, inlined into the head of every response.
 *
 * The stored preference lives in localStorage, which the server cannot read,
 * so the markup ships with the dark palette and this script corrects it while
 * the browser is still parsing the head — before the first paint, and before
 * React is involved. Anything deferred would flash the wrong theme first.
 *
 * Notes on the shape, since it is terser than the rest of the codebase (every
 * byte here is on the critical path of every page load):
 *
 * - The try only wraps the lookup. Letting it wrap the write as well meant a
 *   missing `#themeColor` threw *after* the palette had been resolved, and the
 *   catch then forced dark over a light theme it had already got right.
 * - `#themeColor` is looked up defensively: React's development remount clears
 *   the head, and the attribute on `<html>` is what actually drives the page,
 *   so a miss is not worth throwing over.
 * - `apply` is parked on `window` so the one caller that has to replay it —
 *   `Interactions`, after that same remount — cannot drift from what ran here.
 *
 * The key and the two colours are interpolated rather than repeated, so the
 * app's theme switch — which is React, not main.js — reads the same values
 * this line writes.
 */
export const THEME_BOOTSTRAP = `(function(){var K="${THEME_KEY}";function a(){var t="dark";try{var s=localStorage.getItem(K);t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")}catch(e){}document.documentElement.setAttribute("data-theme",t);var m=document.getElementById("themeColor");if(m)m.setAttribute("content",t==="dark"?"${THEME_COLOR.dark}":"${THEME_COLOR.light}")}window.__portfolioTheme=a;a()})();`;

declare global {
  interface Window {
    /** Installed by THEME_BOOTSTRAP. Re-resolves and re-applies the palette. */
    __portfolioTheme?: () => void;
  }
}
