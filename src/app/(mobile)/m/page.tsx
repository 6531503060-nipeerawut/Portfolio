import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Rich } from "@/components/Rich";
import { PROFILE, SOCIALS, STATS } from "@/lib/content";
import {
  APP_BTN,
  APP_BTN_PRIMARY,
  APP_CARD,
  APP_ENTER,
  APP_EYEBROW,
  APP_LABEL,
  APP_ROOT,
  APP_ROW,
  APP_ROW_ARROW,
  APP_ROW_GROUP,
  APP_ROW_ICON,
  APP_ROW_TITLE,
  SCREEN,
  STACK,
  appHref,
} from "@/lib/mobile";
import { SECTIONS } from "@/lib/sections";
import { OPEN_GRAPH, PROFILE_IMAGE, PROFILE_IMAGE_ALT, RESUME_HREF, SHARE_DESCRIPTION, cssVars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description: SHARE_DESCRIPTION,
  // The document is the indexed copy of all of this; see the app layout.
  alternates: { canonical: "/" },
  openGraph: { ...OPEN_GRAPH, url: "/m" },
};

/** Row tints, cycled so no two neighbours in the list share one. */
const TINTS = [
  "var(--brand-1)",
  "var(--brand-2)",
  "var(--brand-3)",
  "var(--brand-4)",
  "var(--brand-1)",
  "var(--brand-3)",
];

/** Everything the tab bar reaches, minus the screen you are already on. */
const ELSEWHERE = SECTIONS.filter((section) => section.id !== "home");

const ROW_BLURB = "mt-[.15rem] block text-[.79rem] leading-[1.35] text-ink-muted";

const SOCIAL =
  "grid aspect-square place-items-center rounded-[16px] border border-line bg-surface text-ink-muted " +
  "shadow-sm [-webkit-tap-highlight-color:transparent] transition-transform duration-200 ease-brand " +
  "active:scale-95 [&_svg]:size-[20px]";

/**
 * The app's home screen.
 *
 * The desktop hero is a full viewport split down the middle, portrait on
 * one side and everything else on the other. Stacked into a single column
 * that becomes a photograph the size of the screen followed by a name below
 * the fold, which is what this replaces: the portrait is an 84px avatar
 * beside the availability badge, and the first screen introduces someone
 * and then offers somewhere to go.
 *
 * That last part is the point of the list at the bottom. On a phone the
 * home screen of an app is a hub, not the first sixth of a document — the
 * five other sections are named, described and one tap away, instead of
 * being five flicks down.
 */
export default function AppHome() {
  return (
    <div className={`${SCREEN} ${STACK} pt-6`}>
      <section className={APP_ENTER}>
        <div className="flex items-center gap-4">
          <div
            className="relative aspect-square w-[84px] flex-none rounded-full p-[3px] shadow-md
              bg-[image:var(--gradient-brand)] [background-size:220%_220%]"
          >
            <Image
              className="size-full rounded-full bg-surface object-cover"
              src={PROFILE_IMAGE}
              alt={PROFILE_IMAGE_ALT}
              width={960}
              height={960}
              sizes="84px"
              priority
            />
            <span
              className="absolute right-0 bottom-0 size-[15px] rounded-full border-[3px] border-canvas
                bg-brand-3 animate-ping-dot"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <span className={APP_EYEBROW}>
              <span className="size-[6px] flex-none rounded-full bg-brand-3" aria-hidden="true" />
              {PROFILE.status}
            </span>
            <p className="mt-[.55rem] flex items-center gap-[.35rem] font-mono text-[.76rem] text-ink-faint">
              <svg
                className="size-[14px] flex-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <use href="#i-pin" />
              </svg>
              {PROFILE.location}
            </p>
          </div>
        </div>

        <p className="mt-5 font-mono text-[.84rem] text-ink-muted">{PROFILE.greeting}</p>

        <h1
          className="mt-[.3rem] font-display text-[clamp(1.95rem,9vw,2.5rem)] font-extrabold
            leading-[1.08] tracking-[-.03em] text-ink"
        >
          <span className="bg-[image:var(--gradient-text)] bg-clip-text text-transparent">
            {PROFILE.first}
          </span>
          <span className="block text-ink-muted">{PROFILE.last}</span>
        </h1>

        {/* The desktop cycles the other two through a typewriter. Here it is
            the one line, held still: an animation nobody asked for, running
            behind the first thing they read, is not worth a phone's battery. */}
        <p className="mt-[.55rem] flex items-center gap-[.45rem] font-mono text-[.9rem] font-medium text-ink-soft">
          <span className="text-brand-3" aria-hidden="true">
            &gt;
          </span>
          {PROFILE.roles[0]}
        </p>
      </section>

      <p
        className={`${APP_ENTER} text-[.92rem] leading-[1.62] text-ink-muted text-pretty`}
        style={cssVars({ "--d": "70ms" })}
      >
        <Rich parts={PROFILE.intro} strongClass="font-semibold text-ink-soft" />
      </p>

      <section className={`${APP_ENTER} grid gap-[.6rem]`} style={cssVars({ "--d": "140ms" })}>
        <Link className={APP_BTN_PRIMARY} href={appHref("work")}>
          See what I have built
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <use href="#i-arrow-right" />
          </svg>
        </Link>

        <div className="grid grid-cols-2 gap-[.6rem]">
          <Link className={APP_BTN} href={appHref("contact")}>
            Contact
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href="#i-mail" />
            </svg>
          </Link>
          <a className={APP_BTN} href={RESUME_HREF} download>
            Resume
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href="#i-download" />
            </svg>
          </a>
        </div>
      </section>

      <section className={`${APP_ENTER} grid grid-cols-3 gap-[.6rem]`} style={cssVars({ "--d": "210ms" })}>
        {STATS.map((stat) => (
          <div className={`${APP_CARD} px-2 py-[.85rem] text-center`} key={stat.label}>
            <span
              className="block font-display text-[1.45rem] font-extrabold leading-none tracking-[-.04em]
                [font-variant-numeric:tabular-nums] bg-[image:var(--gradient-text)] bg-clip-text text-transparent"
            >
              {stat.value}
            </span>
            <span className="mt-[.4rem] block font-mono text-[.62rem] tracking-[.1em] uppercase text-ink-faint">
              {stat.short}
            </span>
          </div>
        ))}
      </section>

      <section className={APP_ENTER} style={cssVars({ "--d": "280ms" })}>
        <span className={APP_LABEL}>Explore</span>

        <div className={APP_ROW_GROUP}>
          {ELSEWHERE.map((section, index) => (
            <Link
              className={APP_ROW}
              href={appHref(section.id)}
              key={section.id}
              style={cssVars({ "--tint": TINTS[index] })}
            >
              <span className={APP_ROW_ICON}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href={`#${section.icon}`} />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className={APP_ROW_TITLE}>{section.label}</span>
                <span className={ROW_BLURB}>{section.blurb}</span>
              </span>
              <span className={APP_ROW_ARROW}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href="#i-arrow-right" />
                </svg>
              </span>
            </Link>
          ))}

          {/* Not a tab — six is already as many as a phone can label — but
              it is part of the site, so it is reachable from the hub rather
              than only from a link someone was given. */}
          <Link
            className={APP_ROW}
            href={`${APP_ROOT}/user`}
            style={cssVars({ "--tint": TINTS[ELSEWHERE.length] })}
          >
            <span className={APP_ROW_ICON}>
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
            </span>
            <span className="min-w-0 flex-1">
              <span className={APP_ROW_TITLE}>Profile</span>
              <span className={ROW_BLURB}>The GitHub account behind the commits</span>
            </span>
            <span className={APP_ROW_ARROW}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <use href="#i-arrow-right" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <section className={APP_ENTER} style={cssVars({ "--d": "350ms" })}>
        <span className={APP_LABEL}>Find me</span>
        <div className="grid grid-cols-4 gap-[.6rem]">
          {SOCIALS.map((social) => (
            <a
              className={SOCIAL}
              href={social.href}
              key={social.label}
              aria-label={social.label}
              {...(social.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
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
                <use href={`#${social.icon}`} />
              </svg>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
