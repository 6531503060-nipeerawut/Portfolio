import type { ReactNode } from "react";

import { Ambient } from "@/components/front/Ambient";
import { Footer } from "@/components/front/Footer";
import { IconSprite } from "@/components/front/IconSprite";
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
 * Chrome shared by every public page: the ambient background, the icon
 * sprite everything points `<use>` at, the navbar and the footer.
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
    </>
  );
}
