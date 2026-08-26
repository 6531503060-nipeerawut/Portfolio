import Image from "next/image";

import { CARD, H3 } from "@/lib/styles";

const FIGURE = "text-center";

const FIGURE_NUM =
  "block font-display text-[clamp(1.35rem,3vw,1.7rem)] font-extrabold leading-none tracking-[-.04em] " +
  "[font-variant-numeric:tabular-nums] bg-[image:var(--gradient-text)] bg-clip-text text-transparent";

const FIGURE_LABEL =
  "mt-[.35rem] block font-mono text-[.62rem] tracking-[.12em] uppercase text-ink-faint";

const META_ROW =
  "flex items-center gap-[.55rem] font-mono text-[.78rem] text-ink-muted [&_svg]:size-4 " +
  "[&_svg]:flex-none [&_svg]:text-brand-1";

/** "Joined March 2022" — the year alone reads as less precise than it is. */
function joined(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/**
 * Renders the GitHub account, or says why it could not be read.
 *
 * The failure path is a first-class render rather than a thrown error: the
 * profile is a supporting detail on a portfolio, and a rate-limited API is
 * not a reason to fail the whole route.
 */
export function User({ user, error }: UserResult) {
  if (!user) {
    return (
      <div className={`${CARD} p-[clamp(1.4rem,3vw,2rem)] text-center`}>
        <p className="text-[.94rem] text-ink-muted">
          The GitHub profile could not be loaded right now — {error}.
        </p>
        <a
          className="mt-3 inline-flex items-center gap-2 font-display text-[.9rem] font-semibold text-brand-1"
          href="https://github.com/6531503060-nipeerawut"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open it on GitHub
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true" className="size-4"><use href="#i-external" /></svg>
        </a>
      </div>
    );
  }

  return (
    <div className={`${CARD} overflow-hidden p-[clamp(1.4rem,3vw,2rem)]`}>
      <div className="flex flex-wrap items-center gap-[clamp(1rem,3vw,1.75rem)] max-[640px]:flex-col max-[640px]:text-center">
        <div className="relative size-[104px] flex-none rounded-full p-1.5 bg-[image:var(--gradient-brand)] [background-size:220%_220%] animate-hue-slow">
          <Image
            className="size-full rounded-full bg-surface object-cover"
            src={user.avatar_url}
            alt={`${user.name ?? user.login} on GitHub`}
            width={208}
            height={208}
            unoptimized
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={H3}>{user.name ?? user.login}</h3>
          <a
            className="mt-1 inline-flex items-center gap-[.4rem] font-mono text-[.82rem] text-brand-1"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{user.login}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true" className="size-[13px]"><use href="#i-external" /></svg>
          </a>

          {user.bio ? <p className="mt-3 text-[.94rem] text-ink-muted">{user.bio}</p> : null}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 max-[640px]:justify-center">
            {user.company ? (
              <span className={META_ROW}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-building" /></svg>
                {user.company}
              </span>
            ) : null}
            {user.location ? (
              <span className={META_ROW}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-pin" /></svg>
                {user.location}
              </span>
            ) : null}
            <span className={META_ROW}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true"><use href="#i-cap" /></svg>
              Joined {joined(user.created_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-6">
        <div className={FIGURE}>
          <span className={FIGURE_NUM}>{user.public_repos}</span>
          <span className={FIGURE_LABEL}>Public repos</span>
        </div>
        <div className={FIGURE}>
          <span className={FIGURE_NUM}>{user.followers}</span>
          <span className={FIGURE_LABEL}>Followers</span>
        </div>
        <div className={FIGURE}>
          <span className={FIGURE_NUM}>{user.following}</span>
          <span className={FIGURE_LABEL}>Following</span>
        </div>
      </div>
    </div>
  );
}
