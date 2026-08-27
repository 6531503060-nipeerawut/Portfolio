import type { Metadata } from "next";

import { ScreenHead } from "@/components/mobile/ScreenHead";
import { SKILL_GROUPS } from "@/lib/content";
import { APP_CARD, APP_ENTER, SCREEN, STACK } from "@/lib/mobile";
import { OPEN_GRAPH, SHARE_DESCRIPTION, cssVars, stagger } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skills",
  description: "The stack I use day to day, plus what I have shipped with before.",
  // No desktop route of its own: over there this is a section of the one page.
  alternates: { canonical: "/#skills" },
  openGraph: { ...OPEN_GRAPH, url: "/m/skills" },
};

/** The tinted square opening a group. Reads `--tint` from the card. */
const GROUP_ICON =
  "grid size-10 flex-none place-items-center rounded-[13px] text-[var(--tint)] " +
  "border border-[color-mix(in_srgb,var(--tint)_30%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_12%,transparent)] [&_svg]:size-[20px]";

/**
 * One vendor.
 *
 * `--logo` resolves the brand colour per palette, so the swatch below reads
 * a single token rather than branching on the theme itself.
 */
const ITEM =
  "flex min-h-[52px] items-center gap-3 px-[16px] py-[.6rem] [--logo:var(--brand)] " +
  "dark:[--logo:var(--brand-on-dark,var(--brand))] [-webkit-tap-highlight-color:transparent] " +
  "transition-[background-color,transform] duration-200 ease-brand active:scale-[.985] active:bg-sunken";

const ITEM_LOGO =
  "grid size-8 flex-none place-items-center rounded-[10px] text-[var(--logo)] " +
  "bg-[color-mix(in_srgb,var(--logo)_14%,transparent)] [&_svg]:size-[17px]";

/**
 * Skills, as four lists rather than four hover cards.
 *
 * The desktop lays these out as a responsive grid whose columns fall out of
 * the available width, and each card blooms a tinted glow from under the
 * cursor. A phone has one column and no cursor, so what is left is the
 * useful part — the grouping, the vendor colours, and a link out of every
 * row that is large enough to hit.
 */
export default function AppSkills() {
  return (
    <div className={`${SCREEN} ${STACK}`}>
      <ScreenHead id="skills" />

      {SKILL_GROUPS.map((group, index) => (
        <section
          className={`${APP_CARD} ${APP_ENTER} overflow-hidden`}
          key={group.title}
          style={{ ...stagger(index + 1, 70), ...cssVars({ "--tint": group.tint }) }}
        >
          <header className="flex items-center gap-3 p-[16px]">
            <span className={GROUP_ICON}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <use href={`#${group.icon}`} />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <h2 className="font-display text-[1.08rem] font-bold tracking-[-.02em] text-ink">
                {group.title}
              </h2>
              <span className="mt-[.1rem] block font-mono text-[.68rem] tracking-[.12em] uppercase text-ink-faint">
                {group.meta}
              </span>
            </span>

            <span
              className="flex-none rounded-full border border-line bg-sunken px-[.55rem] py-[.2rem]
                font-mono text-[.68rem] text-ink-muted [font-variant-numeric:tabular-nums]"
            >
              {group.items.length}
            </span>
          </header>

          <ul className="border-t border-line [&>li+li]:border-t [&>li+li]:border-line">
            {group.items.map((item) => (
              <li
                key={item.name}
                style={cssVars({ "--brand": item.brand, "--brand-on-dark": item.brandOnDark })}
              >
                <a className={ITEM} href={item.href} target="_blank" rel="noopener noreferrer">
                  <span className={ITEM_LOGO}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <use href={`#${item.logo}`} />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1 text-[.89rem] font-medium text-ink-soft">
                    {item.name}
                  </span>
                  <svg
                    className="size-[15px] flex-none text-ink-faint"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <use href="#i-external" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
