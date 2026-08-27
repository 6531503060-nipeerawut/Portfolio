"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TABS } from "@/lib/mobile";

/**
 * The tab bar, and the reason the app exists as its own build.
 *
 * On the desktop these six entries are anchors that scroll one document.
 * Here each is a route: a tap is a navigation, the back gesture undoes it,
 * and a screen is only ever showing one section. That is what a phone
 * expects, and it is not something a single scrolling page can imitate —
 * scroll position is not history, and a tab bar that scrolls instead of
 * navigating leaves you halfway between two sections on every flick.
 *
 * The active state is `usePathname()` rather than a scroll spy, and the
 * indicator is a background on the current item rather than a pill measured
 * off the DOM. Nothing here reads a box, so nothing here can be measured
 * wrong.
 */
export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[1100] border-t border-line bg-nav
        pb-[env(safe-area-inset-bottom,0px)]
        [backdrop-filter:blur(18px)_saturate(160%)]
        [-webkit-backdrop-filter:blur(18px)_saturate(160%)]"
      aria-label="Sections"
    >
      <ul className="grid h-[var(--app-tab-h)] grid-cols-6">
        {TABS.map((tab) => {
          const active = pathname === tab.href;

          return (
            <li className="min-w-0" key={tab.id}>
              <Link
                className={`flex h-full flex-col items-center justify-center gap-[3px] px-[2px]
                  [-webkit-tap-highlight-color:transparent]
                  transition-[color,transform] duration-200 ease-brand active:scale-[.92]
                  ${active ? "text-brand-1" : "text-ink-faint"}`}
                href={tab.href}
                aria-current={active ? "page" : undefined}
              >
                {/* The indicator. A background rather than a travelling pill:
                    there is no geometry to measure, so it cannot land in the
                    wrong place after a rotation or a font swap. */}
                <span
                  className={`grid h-[26px] w-[46px] max-w-full place-items-center rounded-full
                    transition-[background-color,transform] duration-300 ease-spring
                    ${active
                      ? "scale-100 bg-[color-mix(in_srgb,var(--brand-1)_16%,transparent)]"
                      : "scale-95 bg-transparent"}`}
                >
                  <svg
                    className="size-[19px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <use href={`#${tab.icon}`} />
                  </svg>
                </span>

                {/* Sized off the viewport rather than a breakpoint: six
                    labels share the width, and "Experience" is the one that
                    runs out of it first. The clamp keeps it whole down to a
                    320px screen and stops growing once there is room. */}
                <span
                  className={`max-w-full truncate font-display text-[clamp(8.5px,2.55vw,9.5px)]
                    tracking-[-.02em] ${active ? "font-bold" : "font-semibold"}`}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
