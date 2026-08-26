"use client";

import Script from "next/script";
import { useLayoutEffect } from "react";

/**
 * Loads the interaction script and keeps the palette applied in development.
 *
 * main.js has to run *after* hydration: it writes classes, text and inline
 * styles onto elements React also owns, and React treats anything it finds
 * there and did not render as a mismatch — it then discards the tree and
 * rebuilds it, taking main.js's event listeners with it. `afterInteractive`
 * is what keeps the two passes from overlapping. The stylesheet carries a
 * failsafe for the one thing that would otherwise be gated on that wait, the
 * scroll reveal; see REVEAL in src/lib/styles.ts.
 *
 * The cost is that main.js can start after `window.load` has already fired,
 * and it leans on that event for a second measurement of the navbar. The
 * first one runs before any link carries `.is-active`, and an active link is
 * a heavier weight than a resting one, so the sliding pill would otherwise
 * keep a width measured against the wrong font weight. Where the event is
 * already gone, replaying a resize gives that pass back.
 */
export function Interactions() {
  useLayoutEffect(() => {
    // Guard against React's Strict Mode remount, which the Next guide on
    // preventing flash before hydration warns can reset <html> to the
    // attributes it renders from JSX and so drop the data-theme the head
    // script set. This build does not actually do that — checked with the
    // remount isolated and main.js blocked, the attribute survives — so the
    // call is a no-op that lands on the value already there. It is kept
    // because it costs nothing and the guide prescribes it for this exact
    // pattern. Replaying the head script rather than repeating its logic is
    // what keeps the two from drifting.
    window.__portfolioTheme?.();
  }, []);

  return (
    <Script
      src="/js/main.js"
      strategy="afterInteractive"
      onLoad={() => {
        // Still loading: main.js's own listener will get the event.
        if (document.readyState !== "complete") return;

        // main.js queues its first measurement in an animation frame and marks
        // the active link in that same frame, so this pass waits one out.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.dispatchEvent(new Event("resize"));
          });
        });
      }}
    />
  );
}
