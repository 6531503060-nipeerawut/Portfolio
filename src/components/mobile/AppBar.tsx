"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { APP_ICON_BTN, APP_ROOT, TABS } from "@/lib/mobile";
import { THEME_COLOR, THEME_KEY, type Theme } from "@/lib/theme";

/**
 * The bar across the top of every screen.
 *
 * It answers one question — where am I — and carries the one control that
 * belongs everywhere rather than on a screen of its own. The statement
 * heading below it says something different, so the two do not repeat each
 * other: the bar prints the tab's name, the screen prints its point.
 *
 * This is React rather than the class-toggling in public/js/main.js. That
 * file measures the DOM once at boot and caches what it finds, which is
 * fine for a document that is only ever scrolled and wrong for an app whose
 * screens are replaced under it on every tap.
 */

/** Screens outside the tab bar still need a name up here. */
const EXTRA: Record<string, string> = {
  [`${APP_ROOT}/user`]: "Profile",
};

function titleOf(pathname: string): string {
  const tab = TABS.find((entry) => entry.href === pathname);
  return tab ? tab.label : (EXTRA[pathname] ?? "Portfolio");
}

function read(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function paint(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.getElementById("themeColor")?.setAttribute("content", THEME_COLOR[theme]);
}

export function AppBar() {
  const pathname = usePathname();

  /*
   * Null until mounted. The palette is resolved by the head script from
   * localStorage, which the server cannot read, so rendering a label for it
   * on the server would be a guess — and a guess React would then report as
   * a hydration mismatch. The two glyphs below need no state at all: the
   * stylesheet picks between them off `data-theme`, so the button is
   * correct on the first paint and only its label waits.
   */
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(read()), []);

  function toggle() {
    const next: Theme = read() === "dark" ? "light" : "dark";

    // Painting is not persisting: writing on every visit would make everyone
    // look like they had chosen, permanently disabling the OS follow.
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Private mode or blocked storage. */
    }

    setTheme(next);
    paint(next);
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1100] border-b border-line bg-nav
        pt-[env(safe-area-inset-top,0px)]
        [backdrop-filter:blur(18px)_saturate(160%)]
        [-webkit-backdrop-filter:blur(18px)_saturate(160%)]"
    >
      <div className="flex h-[var(--app-bar-h)] items-center gap-3 px-[18px]">
        {/* The mark doubles as the way home, which is what a phone user
            expects of the top-left corner. */}
        <Link
          className="grid size-9 flex-none place-items-center rounded-[12px] text-white
            bg-[image:var(--gradient-brand)] [background-size:200%_200%] shadow-brand
            [-webkit-tap-highlight-color:transparent] transition-transform duration-200 ease-brand
            active:scale-95"
          href={APP_ROOT}
          aria-label="Home"
        >
          <svg
            className="size-[86%]"
            viewBox="0 0 32 32"
            fill="currentColor"
            fillRule="evenodd"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M16 5.6a5.9 5.9 0 1 1 0 11.8 5.9 5.9 0 0 1 0-11.8Zm-2.65 3.9a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1Zm5.3 0a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1Zm-3.25 1.65h1.2v.8h-1.2Z" />
            <path d="M4.2 32c0-7.3 5.2-12.4 11.8-12.4S27.8 24.7 27.8 32Z" />
          </svg>
        </Link>

        <span className="flex min-w-0 flex-col leading-[1.15]">
          <span className="truncate font-display text-[.98rem] font-bold tracking-[-.02em] text-ink">
            {titleOf(pathname)}
          </span>
          <span className="truncate font-mono text-[.6rem] tracking-[.16em] uppercase text-ink-faint">
            Peerawut Nipakornpan
          </span>
        </span>

        <button
          className={`${APP_ICON_BTN} ml-auto`}
          type="button"
          onClick={toggle}
          aria-label={
            theme ? (theme === "dark" ? "Switch to light theme" : "Switch to dark theme") : "Switch colour theme"
          }
          aria-pressed={theme ? theme === "dark" : undefined}
        >
          <span className="relative grid size-[18px] place-items-center">
            <svg
              className="absolute size-[18px] scale-100 opacity-100 transition-[opacity,scale] duration-300
                ease-brand dark:scale-50 dark:opacity-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href="#i-sun" />
            </svg>
            <svg
              className="absolute size-[18px] scale-50 opacity-0 transition-[opacity,scale] duration-300
                ease-brand dark:scale-100 dark:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href="#i-moon" />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
}
