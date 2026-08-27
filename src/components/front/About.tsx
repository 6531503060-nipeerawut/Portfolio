import { Rich } from "@/components/Rich";
import { SectionEyebrow } from "@/components/front/SectionEyebrow";
import { BIO, FACTS, HEADINGS, LIVE_LINKS, STATS } from "@/lib/content";
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
  const heading = HEADINGS.about;

  return (
    <section className={SECTION} id="about">
      <div className={SHELL}>
        <div className={`${SECTION_HEAD_SPLIT} ${REVEAL}`} data-reveal>
          <div>
            <SectionEyebrow id="about" />
            <h2 className={H2}>
              {heading.before}
              <span className={GRAD}>{heading.accent}</span>
              {heading.after}
            </h2>
            <p>{heading.blurb}</p>
          </div>

          {/* Beside the title on a wide screen, stacked under it below. */}
          <div className="grid w-[min(100%,26rem)] flex-none grid-cols-3 gap-[.55rem] max-[640px]:w-full max-[640px]:grid-cols-1">
            {STATS.map((stat) => (
              <div className={STAT} key={stat.label}>
                {/* The real figure is in the markup; setupCounters only
                    animates its way up to it. */}
                <div className={STAT_NUM} data-count={stat.value}>
                  {stat.value}
                </div>
                <div className={STAT_LABEL}>{stat.label}</div>
              </div>
            ))}
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
              {BIO.lead}
            </p>
            {BIO.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <Rich
                  parts={paragraph}
                  strongClass="font-semibold text-ink-soft"
                  markClass="bg-transparent font-semibold text-brand-1"
                />
              </p>
            ))}
          </article>

          <div className="grid gap-[clamp(.85rem,1.8vw,1.15rem)] grid-rows-[auto_1fr]">
            <ul
              className={`${CARD} ${REVEAL_RIGHT} p-[clamp(1.15rem,2.4vw,1.6rem)] short:px-[1.1rem] short:py-[.85rem]`}
              style={cssVars({ "--d": "80ms" })}
              data-reveal
            >
              {FACTS.map((fact) => (
                <li className={FACT} key={fact.key}>
                  <span className={FACT_ICO}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true"><use href={`#${fact.icon}`} /></svg>
                  </span>
                  <div>
                    <span className={FACT_K}>{fact.key}</span>
                    {/* One line each: the education entry is two, and a
                        block per line is the same break the markup used to
                        spell out with <br>. */}
                    {fact.value.map((line) => (
                      <span className={FACT_V} key={line}>
                        {line}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
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
                {LIVE_LINKS.map((live) => (
                  <a
                    className={LIVE_LINK}
                    key={live.name}
                    style={cssVars({ "--tint": live.tint })}
                    href={live.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={LIVE_ICO}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href={`#${live.icon}`} /></svg>
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-[.4rem] font-display text-[.94rem] font-semibold tracking-[-.01em] text-ink">
                        {live.name}
                      </span>
                      <span className={LIVE_META}><i className={LIVE_DOT} />{live.host}</span>
                    </span>
                    <span className={LIVE_ARROW}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
