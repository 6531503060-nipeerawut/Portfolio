import { SectionEyebrow } from "@/components/front/SectionEyebrow";
import {
  CARD,
  GRAD,
  H2,
  REVEAL,
  REVEAL_LEFT,
  REVEAL_RIGHT,
  SECTION,
  SECTION_HEAD_SPLIT,
  SHELL,
} from "@/lib/styles";
import { cssVars } from "@/lib/site";

/** Stat tile: a gradient number over a mono caption. */
const STAT =
  CARD +
  " rounded-brand px-[.85rem] py-[.9rem] short:px-[.8rem] short:py-[.7rem] text-center " +
  "max-[640px]:flex max-[640px]:items-center max-[640px]:justify-between max-[640px]:text-left " +
  "max-[640px]:px-[1.1rem] max-[640px]:py-[.9rem] " +
  "transition-[transform,translate,scale,rotate,border-color] duration-[400ms] " +
  "ease-brand hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--brand-1)_38%,var(--line))]";

const STAT_NUM =
  "font-display text-[clamp(1.5rem,3vw,1.95rem)] font-extrabold leading-none tracking-[-.04em] " +
  "[font-variant-numeric:tabular-nums] bg-[image:var(--gradient-text)] bg-clip-text text-transparent";

const STAT_LABEL =
  "mt-[.4rem] font-mono text-[.64rem] leading-[1.35] tracking-[.12em] uppercase text-ink-faint " +
  "max-[640px]:mt-0 max-[640px]:max-w-[70%] max-[640px]:text-right max-[640px]:text-[.72rem] " +
  "max-[640px]:tracking-[.1em]";

/** One row of the fact list. `+ li` gets the divider, so the first has none. */
const FACT =
  "flex items-start gap-[.8rem] py-2 short:py-[.34rem] [&+li]:border-t [&+li]:border-line";

const FACT_ICO =
  "grid size-8 flex-none place-items-center rounded-[11px] text-brand-1 " +
  "bg-[color-mix(in_srgb,var(--brand-1)_12%,transparent)] [&_svg]:size-[17px]";

const FACT_K =
  "block font-mono text-[.65rem] max-[640px]:text-[.72rem] tracking-[.15em] uppercase text-ink-faint";
const FACT_V = "block text-[.91rem] font-medium leading-[1.35] text-ink";

/**
 * A live product link. --tint is what makes the two rows differ: every
 * hover, ring and icon colour below reads from it, so the second card is
 * a one-property override rather than a duplicated block.
 */
const LIVE_LINK =
  "group flex min-w-0 items-center gap-3 rounded-brand border border-line bg-sunken px-[.8rem] py-[.6rem] " +
  "short:px-[.7rem] short:py-2 " +
  "transition-[transform,translate,scale,rotate,border-color,box-shadow,background-color] duration-[400ms] ease-brand " +
  "hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--tint)_45%,var(--line))] " +
  "hover:bg-[color-mix(in_srgb,var(--tint)_7%,transparent)] hover:shadow-md";

const LIVE_ICO =
  "grid size-8 flex-none place-items-center rounded-[11px] text-[var(--tint)] " +
  "bg-[color-mix(in_srgb,var(--tint)_13%,transparent)] transition-transform duration-[450ms] ease-spring " +
  "group-hover:scale-[1.07] group-hover:-rotate-6 [&_svg]:size-[18px]";

const LIVE_ARROW =
  "ml-auto flex-none text-ink-faint transition-[transform,translate,scale,rotate,color] duration-[400ms] ease-spring " +
  "group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[var(--tint)] " +
  "[&_svg]:size-[15px]";

const LIVE_META =
  "flex items-center gap-[.4rem] overflow-hidden font-mono text-[.71rem] text-ellipsis " +
  "whitespace-nowrap text-ink-faint";

/** Small breathing dot: this URL is reachable right now. */
const LIVE_DOT = "size-[6px] flex-none rounded-full bg-[#22c55e] animate-ping-live";

export function About() {
  return (
    <section className={SECTION} id="about">
      <div className={SHELL}>
        <div className={`${SECTION_HEAD_SPLIT} ${REVEAL}`} data-reveal>
          <div>
            <SectionEyebrow id="about" />
            <h2 className={H2}>
              I build features <span className={GRAD}>end to end</span>.
            </h2>
            <p>Who I am, where I studied, and the way I like to work.</p>
          </div>

          {/* Beside the title on a wide screen, stacked under it below. */}
          <div className="grid w-[min(100%,26rem)] flex-none grid-cols-3 gap-[.55rem] max-[640px]:w-full max-[640px]:grid-cols-1">
            <div className={STAT}>
              <div className={STAT_NUM} data-count="2">2</div>
              <div className={STAT_LABEL}>Platforms in production</div>
            </div>
            <div className={STAT}>
              <div className={STAT_NUM} data-count="6">6</div>
              <div className={STAT_LABEL}>Repositories contributed to</div>
            </div>
            <div className={STAT}>
              <div className={STAT_NUM} data-count="218">218</div>
              <div className={STAT_LABEL}>Commits authored</div>
            </div>
          </div>
        </div>

        <div
          className="grid items-stretch gap-[clamp(1.25rem,2.6vw,1.9rem)]
            grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] max-[1024px]:grid-cols-1"
        >
          {/* Both columns end level; the bio absorbs whatever slack is left. */}
          <article
            className={`${CARD} ${REVEAL_LEFT} flex flex-col justify-center p-[clamp(1.4rem,2.8vw,2rem)]
              short:px-[1.1rem] short:py-[.85rem] short:[&>p+p]:mt-[.6rem]
              [&>p]:text-[.97rem] [&>p]:text-ink-muted [&>p+p]:mt-[.8rem]`}
            data-reveal
          >
            <p
              className="text-[clamp(1.02rem,1.6vw,1.16rem)]! font-display font-semibold
                leading-normal tracking-[-.02em] text-ink!"
            >
              Most features I take on start at the database and finish in the browser. I design the tables and
              access rules, write the API, then build the screens that use them.
            </p>
            <p>
              That is how I work at{" "}
              <mark className="bg-transparent font-semibold text-brand-1">Gendee.ai</mark>, on two products at
              once: <strong>Gendee.ai</strong>, an AI content generation platform, and <strong>CIRCLE</strong>, a
              digital news app. Owning the whole path means the pieces actually fit — no guessing at a contract
              someone else wrote.
            </p>
            <p>
              I graduated in Software Engineering from Mae Fah Luang University, School of Applied Digital
              Technology. My senior project and my internship both ran inside real operations, where accurate
              records mattered more than clever code. That shaped how I build: get the data model right first,
              keep the interface predictable, and write it down so the next person is not stuck.
            </p>
          </article>

          <div className="grid gap-[clamp(.85rem,1.8vw,1.15rem)] grid-rows-[auto_1fr]">
            <ul
              className={`${CARD} ${REVEAL_RIGHT} p-[clamp(1.15rem,2.4vw,1.6rem)] short:px-[1.1rem] short:py-[.85rem]`}
              style={cssVars({ "--d": "80ms" })}
              data-reveal
            >
              <li className={FACT}>
                <span className={FACT_ICO}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-briefcase" /></svg>
                </span>
                <div>
                  <span className={FACT_K}>Currently</span>
                  <span className={FACT_V}>Junior Full-Stack Developer at Gendee.ai</span>
                </div>
              </li>
              <li className={FACT}>
                <span className={FACT_ICO}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-cap" /></svg>
                </span>
                <div>
                  <span className={FACT_K}>Education</span>
                  <span className={FACT_V}>B.Eng. Software Engineering<br />Mae Fah Luang University</span>
                </div>
              </li>
              <li className={FACT}>
                <span className={FACT_ICO}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-code" /></svg>
                </span>
                <div>
                  <span className={FACT_K}>Focus</span>
                  <span className={FACT_V}>Next.js, Go (Fiber), PostgreSQL</span>
                </div>
              </li>
              <li className={FACT}>
                <span className={FACT_ICO}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-pin" /></svg>
                </span>
                <div>
                  <span className={FACT_K}>Based in</span>
                  <span className={FACT_V}>Thailand — open to remote &amp; on-site</span>
                </div>
              </li>
            </ul>

            <div
              className={`${CARD} ${REVEAL_RIGHT} p-[clamp(1.25rem,2.6vw,1.6rem)] short:px-[1.1rem] short:py-[.85rem]`}
              style={cssVars({ "--d": "240ms" })}
              data-reveal
            >
              <span className="mb-[.65rem] short:mb-2 block font-mono text-[.68rem] max-[640px]:text-[.74rem] tracking-[.15em] uppercase text-ink-faint">
                See them live
              </span>
              {/* Stacked so the full host name fits without truncating. */}
              <div className="grid gap-2">
                <a
                  className={LIVE_LINK}
                  style={cssVars({ "--tint": "var(--brand-1)" })}
                  href="https://gendee.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={LIVE_ICO}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-globe" /></svg>
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-[.4rem] font-display text-[.94rem] font-semibold tracking-[-.01em] text-ink">
                      Gendee.ai
                    </span>
                    <span className={LIVE_META}><i className={LIVE_DOT} />gendee.ai</span>
                  </span>
                  <span className={LIVE_ARROW}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
                  </span>
                </a>

                <a
                  className={LIVE_LINK}
                  style={cssVars({ "--tint": "var(--brand-4)" })}
                  href="https://circle-th.com/tabs/home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={LIVE_ICO}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-news" /></svg>
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-[.4rem] font-display text-[.94rem] font-semibold tracking-[-.01em] text-ink">
                      CIRCLE
                    </span>
                    <span className={LIVE_META}><i className={LIVE_DOT} />circle-th.com</span>
                  </span>
                  <span className={LIVE_ARROW}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
