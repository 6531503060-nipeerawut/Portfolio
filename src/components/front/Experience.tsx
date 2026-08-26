import { SectionEyebrow } from "@/components/front/SectionEyebrow";
import { CARD, GRAD, H2, REVEAL, SECTION, SECTION_HEAD, SHELL, TAG } from "@/lib/styles";
import { cssVars } from "@/lib/site";

/** Timeline card: nudges sideways on hover, towards its dot. */
const TL_CARD =
  CARD +
  " rounded-brand-lg p-[clamp(1.1rem,2.3vw,1.5rem)] short:px-[1.1rem] short:py-[.85rem] " +
  "transition-[transform,translate,scale,rotate,box-shadow,border-color] duration-[450ms] ease-brand " +
  "hover:translate-x-1 hover:shadow-lg hover:border-[color-mix(in_srgb,var(--brand-1)_35%,var(--line))] " +
  "max-[1024px]:hover:translate-x-0";

const TL_HEAD = "mb-[.7rem] short:mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-[.4rem] max-[640px]:flex-col max-[640px]:items-start";

const TL_ORG =
  "mt-[.3rem] short:mt-[.15rem] flex items-center gap-[.45rem] font-mono text-[.82rem] text-brand-1 [&_svg]:size-[15px] " +
  "max-[640px]:mt-[.15rem]";

const TL_WHEN =
  "flex-none rounded-full border border-line bg-sunken px-3 py-[.3rem] font-mono text-[.72rem] " +
  "tracking-[.05em] whitespace-nowrap text-ink-muted";

const TL_POINT = "flex gap-[.6rem] text-[.89rem] short:text-[.86rem] text-ink-muted [&_svg]:mt-[.28rem] [&_svg]:size-4 [&_svg]:flex-none [&_svg]:text-brand-3";

/**
 * The dot sits in the gutter the list reserves with its padding, so the
 * offset is the negative of that same clamp. The ring is painted in the
 * page background rather than being transparent, which is what makes the
 * spine appear to pass behind it.
 */
const TL_DOT =
  "absolute top-8 size-3 rounded-full bg-[image:var(--gradient-brand)] " +
  "left-[calc(clamp(1.6rem,3.5vw,2.4rem)*-1)] " +
  "shadow-[0_0_0_4px_var(--bg),0_0_18px_2px_color-mix(in_srgb,var(--brand-2)_55%,transparent)] " +
  "max-[640px]:top-[1.6rem] max-[640px]:left-[-1.4rem] max-[640px]:size-2.5";

export function Experience() {
  return (
    <section className={SECTION} id="experience">
      <div className={SHELL}>
        <div className={`${SECTION_HEAD} ${REVEAL}`} data-reveal>
          <SectionEyebrow id="experience" />
          <h2 className={H2}>
            Two products, built <span className={GRAD}>in parallel</span>.
          </h2>
          <p>Where I have worked and what I owned there.</p>
        </div>

        {/* The ::before is the spine, fading in at the top and out at the
            bottom so it never ends on a hard edge. */}
        <ol
          className="relative grid list-none gap-[clamp(.8rem,1.8vh,1.15rem)] short:gap-2
            pl-[clamp(1.6rem,3.5vw,2.4rem)]
            before:absolute before:top-[.6rem] before:bottom-[.6rem] before:left-[5px] before:w-0.5
            before:rounded-sm before:content-['']
            before:bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--brand-1)_55%,transparent)_12%,color-mix(in_srgb,var(--brand-2)_45%,transparent)_60%,transparent)]
            max-[640px]:pl-[1.4rem]"
        >
          <li className={`${REVEAL} relative`} data-reveal>
            {/* Only the current role breathes. */}
            <span className={`${TL_DOT} animate-ping-dot`} aria-hidden="true" />
            <article className={TL_CARD}>
              <header className={TL_HEAD}>
                <div>
                  <h3 className="font-display text-[clamp(1.15rem,2.2vw,1.35rem)] font-bold leading-[1.1] tracking-[-.02em] text-ink">
                    Junior Full-Stack Developer
                  </h3>
                  <p className={TL_ORG}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-building" /></svg>
                    Gendee.ai
                  </p>
                </div>
                <span className={TL_WHEN}>Jun 2026 &ndash; Present</span>
              </header>

              <p className="text-[.94rem] short:text-[.88rem] short:leading-[1.5] text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink-soft">
                Two platforms at once &mdash; <strong>Gendee.ai</strong>, an AI content studio, and{" "}
                <strong>CIRCLE</strong>, a news app. 218 commits across six repositories.
              </p>

              <ul className="my-[.8rem] short:my-[.55rem] grid gap-[.45rem] short:gap-[.3rem]">
                <li className={TL_POINT}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
                  Shipped three systems end to end &mdash; courses, notifications, and B2B organizations &mdash;
                  each from schema through API to UI.
                </li>
                <li className={TL_POINT}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
                  Connected the CIRCLE reader app and editorial desk to their backend, then simplified the news
                  schema behind them.
                </li>
                <li className={TL_POINT}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
                  Kept the details honest: mobile layouts, multi-language copy, accessibility, tests and handover docs.
                </li>
              </ul>

              <div className="mt-[.85rem] short:mt-[.6rem] flex flex-wrap gap-[.45rem]">
                <span className={TAG}>Angular</span>
                <span className={TAG}>Ionic</span>
                <span className={TAG}>Supabase</span>
                <span className={TAG}>PostgreSQL</span>
              </div>
            </article>
          </li>

          <li className={`${REVEAL} relative`} style={cssVars({ "--d": "100ms" })} data-reveal>
            <span className={TL_DOT} aria-hidden="true" />
            <article className={TL_CARD}>
              <header className={TL_HEAD}>
                <div>
                  <h3 className="font-display text-[clamp(1.15rem,2.2vw,1.35rem)] font-bold leading-[1.1] tracking-[-.02em] text-ink">
                    Full Stack Developer Intern
                  </h3>
                  <p className={TL_ORG}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-briefcase" /></svg>
                    DoiTung
                  </p>
                </div>
                {/* Two of them here — the label and the dates. They share a
                    row so the head keeps its two-child left/right split. */}
                <div className="flex flex-wrap items-baseline gap-[.4rem]">
                  <span className={TL_WHEN}>Internship</span>
                  <span className={TL_WHEN}>Jan 2026 &ndash; Apr 2026</span>
                </div>
              </header>

              <p className="text-[.94rem] short:text-[.88rem] short:leading-[1.5] text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink-soft">
                Built <strong>MyTissue</strong>, an internal system tracking client wood inventory through every
                processing stage &mdash; multi-step workflows with transactional consistency.
              </p>

              <div className="mt-[.85rem] short:mt-[.6rem] flex flex-wrap gap-[.45rem]">
                <span className={TAG}>Next.js</span>
                <span className={TAG}>Go / Fiber</span>
                <span className={TAG}>MSSQL</span>
              </div>
            </article>
          </li>
        </ol>
      </div>
    </section>
  );
}
