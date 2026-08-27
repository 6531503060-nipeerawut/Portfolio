import type { Metadata } from "next";

import { ScreenHead } from "@/components/mobile/ScreenHead";
import { PROJECTS, REPOSITORIES_URL } from "@/lib/content";
import { APP_BTN, APP_ENTER, APP_PANEL, APP_TAG, SCREEN, STACK } from "@/lib/mobile";
import { OPEN_GRAPH, cssVars, stagger } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Six builds that reached real users — schema, API and interface where it says end to end.",
  alternates: { canonical: "/#work" },
  openGraph: { ...OPEN_GRAPH, url: "/m/work" },
};

const ICON =
  "grid size-10 flex-none place-items-center rounded-[13px] text-[var(--tint)] " +
  "border border-[color-mix(in_srgb,var(--tint)_30%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_12%,transparent)] [&_svg]:size-[20px]";

const BADGE =
  "rounded-full border px-[.6rem] py-[.26rem] font-mono text-[.64rem] tracking-[.1em] uppercase " +
  "whitespace-nowrap text-[var(--tint)] border-[color-mix(in_srgb,var(--tint)_32%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_10%,transparent)]";

/* The publication badge is a link, so it needs a target a finger can land on. */
const BADGE_LINK =
  "inline-flex min-h-[34px] items-center gap-[.34rem] rounded-full border px-[.7rem] " +
  "font-mono text-[.64rem] tracking-[.1em] uppercase whitespace-nowrap text-[var(--tint)] " +
  "border-[color-mix(in_srgb,var(--tint)_46%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_16%,transparent)] [-webkit-tap-highlight-color:transparent] " +
  "transition-transform duration-200 ease-brand active:scale-95 [&_svg]:size-[11px]";

/**
 * The six builds, one card each.
 *
 * The desktop version tilts these in 3D under the pointer and floats a
 * highlight where the cursor is. Both are pointer effects with nothing to
 * drive them here, and what they were dressing up — an icon, a badge, a
 * title, a line of context and the stack — is what a phone gets, at a size
 * that can be read at arm's length.
 */
export default function AppWork() {
  return (
    <div className={`${SCREEN} ${STACK}`}>
      <ScreenHead id="work" />

      {PROJECTS.map((project, index) => (
        <article
          className={`${APP_PANEL} ${APP_ENTER}`}
          key={project.title}
          style={{ ...stagger(index + 1, 60), ...cssVars({ "--tint": project.tint }) }}
        >
          <header className="mb-[.85rem] flex items-center justify-between gap-3">
            <span className={ICON}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <use href={`#${project.icon}`} />
              </svg>
            </span>

            {project.badge.href ? (
              <a
                className={BADGE_LINK}
                href={project.badge.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={project.badge.ariaLabel}
              >
                {project.badge.text}
                <svg
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
            ) : (
              <span className={BADGE}>{project.badge.text}</span>
            )}
          </header>

          <h2 className="font-display text-[1.12rem] font-bold leading-[1.2] tracking-[-.02em] text-ink">
            {project.title}
          </h2>
          <p className="mt-[.25rem] font-mono text-[.73rem] text-ink-faint">{project.org}</p>
          <p className="mt-[.6rem] text-[.88rem] leading-[1.55] text-ink-muted">{project.blurb}</p>

          <div className="mt-[.9rem] flex flex-wrap gap-[.4rem]">
            {project.tags.map((tag) => (
              <span className={APP_TAG} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}

      <a
        className={`${APP_BTN} ${APP_ENTER}`}
        href={REPOSITORIES_URL}
        style={stagger(PROJECTS.length + 1, 60)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <use href="#i-github" />
        </svg>
        More on GitHub
      </a>
    </div>
  );
}
