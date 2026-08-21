import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Interactions } from "@/app/_components/interactions";
import { AUTHOR, DESCRIPTION, OPEN_GRAPH, SITE_URL, TITLE, TWITTER } from "@/app/_lib/site";
import { THEME_BOOTSTRAP } from "@/app/_lib/theme";

/*
 * Scroll-reveal is driven by an observer; without JS, show everything.
 * The role line and the statistics render their real values already.
 *
 * React escapes the children of <noscript>, so these rules are injected as
 * raw markup rather than as nested elements.
 */
const NOSCRIPT_STYLE = `<style>
  .reveal { opacity: 1 !important; transform: none !important; animation: none !important; }
  .hero__role .caret { display: none; }
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
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: AUTHOR }],
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    apple: "/images/favicon.png",
  },
  openGraph: OPEN_GRAPH,
  twitter: TWITTER,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /* THEME_BOOTSTRAP rewrites data-theme before React hydrates, so the value
       the client finds is expected to differ from the one rendered here. */
    <html lang="en" data-theme="dark" suppressHydrationWarning>
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
        <link rel="stylesheet" href="/css/style.css" />

        <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_STYLE }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>

      <body>
        {children}

        <Interactions />
      </body>
    </html>
  );
}
