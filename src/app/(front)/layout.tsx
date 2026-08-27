import type { ReactNode } from "react";

import { IconSprite } from "@/components/IconSprite";
import { Ambient } from "@/components/front/Ambient";
import { Footer } from "@/components/front/Footer";
import { Interactions } from "@/components/front/Interactions";
import { Navbar } from "@/components/front/Navbar";

/*
 * Prerendered, then rebuilt daily.
 *
 * Nothing here is per-visitor, so these pages should be static files a CDN
 * can hold. The one value that goes stale is the copyright year, and a
 * deployment can easily outlive the year it was built in — a daily
 * revalidation refreshes it without giving up the cache.
 */
export const revalidate = 86400;

/**
 * Chrome shared by every page of the desktop site: the ambient background,
 * the icon sprite everything points `<use>` at, the navbar, the footer and
 * the interaction script.
 *
 * This is the document half of the site. The phone app lives under
 * `(mobile)` and shares none of it — see src/proxy.ts for how a request
 * reaches one rather than the other, and src/lib/mobile.ts for why the two
 * do not share a vocabulary.
 */
export default function FrontLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Off-screen until focused, which is the only time it is useful. */}
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1400]
          focus:rounded-full focus:border focus:border-line-strong focus:bg-surface focus:px-5
          focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
        href="#main"
      >
        Skip to content
      </a>

      <Ambient />
      <IconSprite />
      <Navbar />

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <Footer year={year} />

      {/* Loaded here rather than in the root layout: main.js caches the
          elements it finds at boot, which suits a document that is only ever
          scrolled and would go stale under an app that swaps its screens. */}
      <Interactions />
    </>
  );
}
