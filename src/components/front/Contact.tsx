import { SectionEyebrow } from "@/components/front/SectionEyebrow";
import { CARD, GRAD, H2, REVEAL_SCALE, SECTION, SHELL } from "@/lib/styles";
import { RESUME_HREF, cssVars } from "@/lib/site";

/**
 * Contact channel. --tint carries the service's own colour, which every
 * hover state below reads, so a new channel is one extra property rather
 * than a new block of rules.
 */
const CHANNEL =
  "group flex items-center gap-[.9rem] rounded-brand border border-line bg-glass px-5 py-[1.1rem] " +
  "transition-[transform,border-color,box-shadow] duration-[400ms] ease-brand " +
  "hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--tint)_45%,var(--line))] hover:shadow-md";

const CHANNEL_ICO =
  "grid size-10 flex-none place-items-center rounded-xl text-[var(--tint)] " +
  "bg-[color-mix(in_srgb,var(--tint)_13%,transparent)] transition-transform duration-[450ms] ease-spring " +
  "group-hover:scale-[1.08] group-hover:-rotate-[5deg] [&_svg]:size-[19px]";

const CHANNEL_LABEL =
  "block font-display text-[.95rem] font-semibold tracking-[-.01em] text-ink";

const CHANNEL_HANDLE =
  "block overflow-hidden font-mono text-[.73rem] text-ellipsis whitespace-nowrap text-ink-faint";

const CHANNEL_ARROW =
  "ml-auto text-ink-faint transition-[transform,color] duration-[400ms] ease-spring " +
  "group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[var(--tint)] " +
  "[&_svg]:size-4";

export function Contact() {
  return (
    <section className={SECTION} id="contact">
      <div className={SHELL}>
        {/* The ::after is a wide glow anchored below the panel; every child
            is lifted above it rather than the glow being pushed behind, so
            the rounded corners still clip it. */}
        <div
          className={`${CARD} ${REVEAL_SCALE} relative overflow-hidden rounded-brand-xl
            p-[clamp(1.6rem,3.6vw,2.6rem)] text-center
            after:pointer-events-none after:absolute after:bottom-[-55%] after:left-1/2 after:aspect-[2/1]
            after:w-[130%] after:-translate-x-1/2 after:content-['']
            after:bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--brand-2)_22%,transparent),transparent_65%)]
            [&>*]:relative [&>*]:z-[1]`}
          data-reveal
        >
          <SectionEyebrow id="contact" />
          <h2 className={`${H2} mb-4`}>
            Say <span className={GRAD}>hello</span>.
          </h2>
          <p className="mx-auto mb-6 max-w-[40rem] text-ink-muted">
            Hiring, collaborating, or just comparing notes on something you are building &mdash; my inbox is open
            and I reply to everything.
          </p>

          {/* main.js toggles .is-copied here for a beat after a successful
              copy, which is what swaps the icon inside the button. */}
          <div
            className="copy-mail mx-auto mb-7 inline-flex max-w-full items-center gap-[.85rem] rounded-full
              border border-line-strong bg-glass-strong py-[.7rem] pr-3 pl-[1.35rem] shadow-md
              transition-[transform,border-color,box-shadow] duration-[400ms] ease-brand
              hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-1)_45%,var(--line-strong))]
              hover:shadow-lg
              [&.is-copied_.i-copy]:hidden [&.is-copied_.i-check]:block"
            id="copyMail"
          >
            <svg
              className="size-[19px] flex-none text-brand-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href="#i-mail" />
            </svg>
            <span
              className="overflow-hidden font-mono text-[clamp(.85rem,2.4vw,1.02rem)] font-medium
                text-ellipsis text-ink"
              id="emailValue"
            >
              nipeerawutdev15@gmail.com
            </span>
            <button
              className="inline-flex flex-none items-center gap-[.45rem] rounded-full
                bg-[image:var(--gradient-brand)] px-[.95rem] py-2 font-display text-[.8rem] font-semibold
                text-white transition-transform duration-[350ms] ease-spring hover:scale-[1.04]
                [&_svg]:size-[15px]"
              id="copyBtn"
              type="button"
              aria-label="Copy email address to clipboard"
            >
              <svg className="i-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-copy" /></svg>
              <svg className="i-check hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
              <span id="copyLabel">Copy</span>
            </button>
          </div>

          <div className="grid gap-[.9rem] text-left grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))]">
            <a
              className={CHANNEL}
              style={cssVars({ "--tint": "#0a66c2" })}
              href="https://www.linkedin.com/in/peerawut-nipakornpan-3550a131a"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={CHANNEL_ICO}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-linkedin" /></svg>
              </span>
              <span className="min-w-0">
                <span className={CHANNEL_LABEL}>LinkedIn</span>
                <span className={CHANNEL_HANDLE}>peerawut-nipakornpan</span>
              </span>
              <span className={CHANNEL_ARROW}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
              </span>
            </a>

            <a
              className={CHANNEL}
              style={cssVars({ "--tint": "var(--text)" })}
              href="https://github.com/6531503060-nipeerawut"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={CHANNEL_ICO}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
              </span>
              <span className="min-w-0">
                <span className={CHANNEL_LABEL}>GitHub</span>
                <span className={CHANNEL_HANDLE}>6531503060-nipeerawut</span>
              </span>
              <span className={CHANNEL_ARROW}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
              </span>
            </a>

            <a
              className={CHANNEL}
              style={cssVars({ "--tint": "#1877f2" })}
              href="https://www.facebook.com/nong.off.3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={CHANNEL_ICO}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-facebook" /></svg>
              </span>
              <span className="min-w-0">
                <span className={CHANNEL_LABEL}>Facebook</span>
                <span className={CHANNEL_HANDLE}>nong.off.3</span>
              </span>
              <span className={CHANNEL_ARROW}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
              </span>
            </a>

            <a className={CHANNEL} style={cssVars({ "--tint": "var(--brand-2)" })} href={RESUME_HREF} download>
              <span className={CHANNEL_ICO}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-download" /></svg>
              </span>
              <span className="min-w-0">
                <span className={CHANNEL_LABEL}>Resume</span>
                <span className={CHANNEL_HANDLE}>PDF, one page</span>
              </span>
              <span className={CHANNEL_ARROW}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-arrow-down" /></svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
