import type { Metadata } from "next";

import { Rich } from "@/components/Rich";
import { ScreenHead } from "@/components/mobile/ScreenHead";
import { TIMELINE } from "@/lib/content";
import { APP_ENTER, APP_PANEL, APP_PILL, APP_TAG, SCREEN, STACK } from "@/lib/mobile";
import { OPEN_GRAPH, stagger } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where I have worked and what I owned there.",
  alternates: { canonical: "/#experience" },
  openGraph: { ...OPEN_GRAPH, url: "/m/experience" },
};

/**
 * The dot sits in the gutter the list reserves with its padding, so the
 * offset is the negative of it. The ring is painted in the page background
 * rather than being transparent, which is what makes the spine appear to
 * pass behind it.
 */
const DOT =
  "absolute top-[22px] left-[-22px] size-3 rounded-full bg-[image:var(--gradient-brand)] " +
  "shadow-[0_0_0_4px_var(--bg),0_0_16px_2px_color-mix(in_srgb,var(--brand-2)_55%,transparent)]";

const POINT =
  "flex gap-[.55rem] text-[.86rem] leading-[1.5] text-ink-muted " +
  "[&_svg]:mt-[.25rem] [&_svg]:size-[15px] [&_svg]:flex-none [&_svg]:text-brand-3";

export default function AppExperience() {
  return (
    <div className={`${SCREEN} ${STACK}`}>
      <ScreenHead id="experience" />

      {/* The ::before is the spine, fading in at the top and out at the
          bottom so it never ends on a hard edge. */}
      <ol
        className="relative grid list-none gap-[14px] pl-[22px]
          before:absolute before:top-[.5rem] before:bottom-[.5rem] before:left-[5px] before:w-0.5
          before:rounded-sm before:content-['']
          before:bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--brand-1)_55%,transparent)_12%,color-mix(in_srgb,var(--brand-2)_45%,transparent)_60%,transparent)]"
      >
        {TIMELINE.map((role, index) => (
          <li className={`${APP_ENTER} relative`} key={role.title} style={stagger(index + 1, 90)}>
            {/* Only the current role breathes. */}
            <span className={`${DOT} ${role.current ? "animate-ping-dot" : ""}`} aria-hidden="true" />

            <article className={APP_PANEL}>
              <h2 className="font-display text-[1.12rem] font-bold leading-[1.2] tracking-[-.02em] text-ink">
                {role.title}
              </h2>

              <p className="mt-[.3rem] flex items-center gap-[.4rem] font-mono text-[.8rem] text-brand-1">
                <svg
                  className="size-[15px] flex-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href={`#${role.orgIcon}`} />
                </svg>
                {role.org}
              </p>

              {/* Under the title rather than opposite it: the desktop head is
                  a two-column row, and at this width the dates would either
                  squeeze the job title or wrap under it anyway. */}
              <div className="mt-[.6rem] flex flex-wrap gap-[.35rem]">
                {role.when.map((when) => (
                  <span className={APP_PILL} key={when}>
                    {when}
                  </span>
                ))}
              </div>

              <p className="mt-[.85rem] text-[.89rem] leading-[1.58] text-ink-muted">
                <Rich parts={role.summary} strongClass="font-semibold text-ink-soft" />
              </p>

              {role.highlights.length > 0 ? (
                <ul className="mt-[.8rem] grid gap-[.5rem]">
                  {role.highlights.map((point) => (
                    <li className={POINT} key={point}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <use href="#i-check" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-[.9rem] flex flex-wrap gap-[.4rem]">
                {role.tags.map((tag) => (
                  <span className={APP_TAG} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
