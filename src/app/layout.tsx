import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { AUTHOR, DESCRIPTION, OPEN_GRAPH, SITE_URL, TAB_TITLE, TWITTER } from "@/lib/site";
import { THEME_BOOTSTRAP } from "@/lib/theme";

/*
 * Scroll-reveal is driven by an observer; without JS, show everything.
 *
 * This is the one place raw CSS is unavoidable: the rule has to out-rank the
 * utility classes that hide a resting section, and there is no utility that
 * applies only when scripting is off. React escapes the children of
 * <noscript>, so it is injected as raw markup rather than nested elements.
 */
const NOSCRIPT_STYLE = `<style>
  [data-reveal] { opacity: 1 !important; transform: none !important; animation: none !important; }
  [data-caret] { display: none; }
</style>`;

/*
 * Everything here is inherited by every route, so a page that is not the home
 * page still gets the title, the icons and the share card rather than a blank
 * head. `metadataBase` resolves the relative URLs below against the real
 * origin; only the canonical and og:url, which differ per route, are left to
 * the pages themselves.
 */
export const metadata: Metadata = {
  metadataBase: SITE_URL,
  /*
   * `default` is the tab on any route that names no title of its own;
   * `template` wraps the ones that do, so About reads "About · PN ·
   * Portfolio" rather than losing the site it belongs to. The share cards
   * keep the long descriptive title — they set their own og:title below.
   */
  title: {
    default: TAB_TITLE,
    template: `%s · ${TAB_TITLE}`,
  },
  description: DESCRIPTION,
  authors: [{ name: AUTHOR }],
  /*
   * favicon.ico sits next to this file and Next links it on its own. These
   * two are the upgrades it cannot infer: an SVG for displays that would
   * show the .ico soft, and a square bitmap for the iOS home screen.
   */
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: OPEN_GRAPH,
  twitter: TWITTER,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  /*
   * Let the page fill the screen edge to edge on a phone, notch and home
   * indicator included, the way a native app does — the alternative is two
   * letterboxed bands in the theme colour. It is what makes env(safe-area-
   * inset-*) report anything but zero, and every fixed surface reads those:
   * the top bar pads itself past the notch, the tab bar floats above the home
   * indicator, and --spacing-gutter keeps text clear of a landscape camera
   * housing. See globals.css.
   */
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /* THEME_BOOTSTRAP rewrites data-theme before React hydrates, so the value
       the client finds is expected to differ from the one rendered here.

       data-scroll-behavior asks Next to suspend the `scroll-behavior: smooth`
       in globals.css for the length of a route change, which it stopped doing
       by default in 16. Without it every navigation animates its way back to
       the top of the new page: on the desktop that is the jump to /about
       scrolling itself, and in the app it is a tab tap gliding up a screen
       the visitor has not seen yet instead of arriving at the top of it. The
       smooth scroll is wanted for in-page jumps and nowhere else. */
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* The Metadata API cannot attach the id that THEME_BOOTSTRAP and
            main.js look up to repaint the browser chrome, so this one tag
            stays hand-written. It has to precede the script that reads it,
            and it carries the same opt-out as <html>: the script rewrites it
            before hydration, which is a mismatch React would otherwise
            report and recover from by re-rendering the tree. */}
        <meta name="theme-color" id="themeColor" content="#05070f" suppressHydrationWarning />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_STYLE }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>

      <body
        className="min-h-svh overflow-x-clip bg-canvas font-body text-base leading-[1.65] text-ink
          antialiased transition-colors duration-[450ms] ease-brand
          print:bg-white print:text-black"
      >
        {/* The interaction layer is not here.
            public/js/main.js drives the desktop document — the scroll spy,
            the sliding nav pill, the eased in-page jumps, the reveals, the
            cursor effects — and it measures the DOM once at boot. The app
            under (mobile) replaces its screens on every tap and owns those
            behaviours in React instead, so it must not load that file. Each
            route group brings its own; see (front)/layout.tsx. */}
        {children}
      </body>
    </html>
  );
}
