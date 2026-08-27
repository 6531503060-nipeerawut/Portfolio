import type { Metadata } from "next";
import Image from "next/image";

import { GITHUB_URL } from "@/lib/content";
import { loadUser } from "@/lib/github";
import {
  APP_BTN,
  APP_ENTER,
  APP_CARD,
  APP_EYEBROW,
  APP_LEAD,
  APP_PANEL,
  APP_TITLE,
  SCREEN,
  STACK,
} from "@/lib/mobile";
import { OPEN_GRAPH, cssVars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Profile",
  description: "The GitHub account behind the commits listed across this portfolio.",
  alternates: { canonical: "/user" },
  openGraph: { ...OPEN_GRAPH, url: "/m/user" },
};

const META_ROW =
  "flex items-center gap-[.5rem] font-mono text-[.78rem] text-ink-muted " +
  "[&_svg]:size-[15px] [&_svg]:flex-none [&_svg]:text-brand-1";

const FIGURE_NUM =
  "block font-display text-[1.35rem] font-extrabold leading-none tracking-[-.04em] " +
  "[font-variant-numeric:tabular-nums] bg-[image:var(--gradient-text)] bg-clip-text text-transparent";

const FIGURE_LABEL = "mt-[.35rem] block font-mono text-[.6rem] tracking-[.1em] uppercase text-ink-faint";

/** "Joined March 2022" — the year alone reads as less precise than it is. */
function joined(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export default async function AppUser() {
  const { user, error } = await loadUser();

  return (
    <div className={`${SCREEN} ${STACK}`}>
      <header className={`${APP_ENTER} pt-6 pb-1`}>
        <span className={APP_EYEBROW}>
          <span className="text-brand-1">&#47;&#47;</span>
          {" GitHub"}
        </span>
        <h1 className={APP_TITLE}>
          The account behind the{" "}
          <span className="bg-[image:var(--gradient-text)] bg-clip-text text-transparent">commits</span>.
        </h1>
        <p className={APP_LEAD}>Read live from GitHub, so the counts here are whatever they are today.</p>
      </header>

      {/* The failure path is a first-class render rather than a thrown error:
          the profile is a supporting detail on a portfolio, and a rate-limited
          API is not a reason to fail the whole screen. */}
      {user ? (
        <>
          <section className={`${APP_PANEL} ${APP_ENTER} text-center`} style={cssVars({ "--d": "70ms" })}>
            <div
              className="relative mx-auto aspect-square w-[96px] rounded-full p-[3px] shadow-md
                bg-[image:var(--gradient-brand)] [background-size:220%_220%]"
            >
              <Image
                className="size-full rounded-full bg-surface object-cover"
                src={user.avatar_url}
                alt={`${user.name ?? user.login} on GitHub`}
                width={208}
                height={208}
                unoptimized
              />
            </div>

            <h2 className="mt-[.9rem] font-display text-[1.25rem] font-bold tracking-[-.02em] text-ink">
              {user.name ?? user.login}
            </h2>
            <p className="mt-[.2rem] font-mono text-[.82rem] text-brand-1">@{user.login}</p>

            {user.bio ? (
              <p className="mt-[.8rem] text-[.89rem] leading-[1.55] text-ink-muted">{user.bio}</p>
            ) : null}

            <div className="mt-[1rem] grid justify-center gap-[.45rem]">
              {user.company ? (
                <span className={META_ROW}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-building" /></svg>
                  {user.company}
                </span>
              ) : null}
              {user.location ? (
                <span className={META_ROW}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-pin" /></svg>
                  {user.location}
                </span>
              ) : null}
              <span className={META_ROW}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-cap" /></svg>
                Joined {joined(user.created_at)}
              </span>
            </div>
          </section>

          <section className={`${APP_ENTER} grid grid-cols-3 gap-[.6rem]`} style={cssVars({ "--d": "140ms" })}>
            <div className={`${APP_CARD} px-2 py-[.85rem] text-center`}>
              <span className={FIGURE_NUM}>{user.public_repos}</span>
              <span className={FIGURE_LABEL}>Repos</span>
            </div>
            <div className={`${APP_CARD} px-2 py-[.85rem] text-center`}>
              <span className={FIGURE_NUM}>{user.followers}</span>
              <span className={FIGURE_LABEL}>Followers</span>
            </div>
            <div className={`${APP_CARD} px-2 py-[.85rem] text-center`}>
              <span className={FIGURE_NUM}>{user.following}</span>
              <span className={FIGURE_LABEL}>Following</span>
            </div>
          </section>

          <a
            className={`${APP_BTN} ${APP_ENTER}`}
            href={user.html_url}
            style={cssVars({ "--d": "210ms" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
            Open it on GitHub
          </a>
        </>
      ) : (
        <section className={`${APP_PANEL} ${APP_ENTER} text-center`} style={cssVars({ "--d": "70ms" })}>
          <p className="text-[.9rem] leading-[1.55] text-ink-muted">
            The GitHub profile could not be loaded right now — {error}.
          </p>
          <a className={`${APP_BTN} mt-4`} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
            Open it on GitHub
          </a>
        </section>
      )}
    </div>
  );
}
