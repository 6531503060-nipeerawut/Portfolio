import type { Metadata } from "next";
import type { ReactNode } from "react";

import { IconSprite } from "@/components/IconSprite";
import { AppBar } from "@/components/mobile/AppBar";
import { TabBar } from "@/components/mobile/TabBar";
import { SCREEN } from "@/lib/mobile";
import { AUTHOR } from "@/lib/site";

/*
 * Prerendered, then rebuilt daily — the same deal the document gets, and
 * for the same reason: nothing on these screens is per-visitor, and the one
 * value that goes stale is the copyright year.
 */
export const revalidate = 86400;

export const metadata: Metadata = {
  /*
   * The app says exactly what the document says, at a second set of URLs.
   * Only one of the two belongs in an index, and it should be the one that
   * links out to everything — so every screen here points a canonical at
   * its desktop counterpart and stays out of results itself.
   */
  robots: { index: false, follow: true },
};

/**
 * The app shell.
 *
 * Fixed bar, fixed tab bar, and one scrolling column between them. The
 * document's chrome is not reused and could not be: that layout assumes a
 * page tall enough to scroll a navbar into being, sections a screen high,
 * and a pointer to react to. None of those exist here.
 *
 * The two insets are read straight from the device rather than guessed at.
 * `viewportFit: "cover"` in the root layout is what makes them report
 * anything at all, and it is why the bar can be flush to the top edge and
 * still keep its contents clear of the notch.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-svh">
      {/*
        The whole background layer.

        The document paints three animated aurora blobs, a blueprint grid
        and a film-grain overlay behind everything. That is five composited
        layers a phone would carry through every flick for decoration nobody
        is looking at, so this is one static gradient instead — the same
        brand wash falling away from the top of the screen.
      */}
      <div
        className="pointer-events-none fixed inset-0 -z-10
          bg-[radial-gradient(120%_55%_at_50%_0%,color-mix(in_srgb,var(--brand-1)_13%,var(--bg))_0%,var(--bg)_52%,var(--bg-deep)_100%)]"
        aria-hidden="true"
      />

      <IconSprite />
      <AppBar />

      <main
        className="pt-[calc(var(--app-bar-h)+env(safe-area-inset-top,0px))]
          pb-[calc(var(--app-tab-h)+env(safe-area-inset-bottom,0px)+1.5rem)]"
        id="main"
        tabIndex={-1}
      >
        {children}

        {/* No link across to the document. Which build a visitor gets is the
            proxy's decision and only the proxy's — offering the other one
            here would put the choice back in front of someone who never
            asked to make it, on the one screen size where the desktop
            layout is the wrong answer. */}
        <footer className={`${SCREEN} mt-8 border-t border-line pt-5 text-center`}>
          <p className="text-[.78rem] text-ink-faint">
            &copy; {year} {AUTHOR}
          </p>
        </footer>
      </main>

      <TabBar />
    </div>
  );
}
