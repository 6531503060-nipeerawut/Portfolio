import { SectionEyebrow } from "@/components/front/SectionEyebrow";
import { HEADINGS, SKILL_GROUPS } from "@/lib/content";
import { CARD, GRAD, H2, H3, REVEAL, SECTION, SECTION_HEAD, SHELL } from "@/lib/styles";
import { cssVars, stagger } from "@/lib/site";

/**
 * Skill card. The ::after is a tinted glow that blooms out from behind the
 * icon on hover; `overflow-hidden` is what keeps it inside the card.
 */
const SKILL =
  CARD +
  " group/card overflow-hidden p-[clamp(1.1rem,2.2vw,1.45rem)] short:px-[1.1rem] short:py-[.85rem] " +
  "transition-[transform,translate,scale,rotate,box-shadow,border-color] duration-[450ms] ease-brand " +
  "hover:-translate-y-1.5 hover:shadow-lg hover:border-[color-mix(in_srgb,var(--tint)_42%,var(--line))] " +
  "after:pointer-events-none after:absolute after:-top-[40%] after:-left-[20%] after:size-[260px] " +
  "after:rounded-full after:opacity-0 after:content-[''] " +
  "after:transition-opacity after:duration-[550ms] after:ease-brand hover:after:opacity-30 " +
  "after:bg-[radial-gradient(circle,color-mix(in_srgb,var(--tint)_100%,transparent)_0%,color-mix(in_srgb,var(--tint)_62%,transparent)_26%,color-mix(in_srgb,var(--tint)_26%,transparent)_50%,transparent_76%)]";

const SKILL_ICO =
  "mb-[.8rem] grid size-10 place-items-center rounded-[14px] text-[var(--tint)] " +
  "border border-[color-mix(in_srgb,var(--tint)_30%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_12%,transparent)] " +
  "transition-transform duration-500 ease-spring " +
  "group-hover/card:-translate-y-0.5 group-hover/card:-rotate-6 [&_svg]:size-[21px]";

/**
 * One vendor row. --logo resolves the brand colour per theme so the hover,
 * ring and icon rules below can all read a single token.
 */
const SKILL_ITEM =
  "group/item flex items-center gap-[.7rem] rounded-[10px] border border-transparent px-2 py-[.38rem] " +
  "short:py-[.28rem] touch:py-2 " +
  "text-[.88rem] font-medium text-ink-soft [--logo:var(--brand)] " +
  "dark:[--logo:var(--brand-on-dark,var(--brand))] " +
  "transition-[background-color,border-color,color] duration-300 ease-brand " +
  "hover:border-[color-mix(in_srgb,var(--logo)_38%,transparent)] " +
  "hover:bg-[color-mix(in_srgb,var(--logo)_9%,transparent)] hover:text-ink " +
  "focus-visible:border-[color-mix(in_srgb,var(--logo)_38%,transparent)] " +
  "focus-visible:bg-[color-mix(in_srgb,var(--logo)_9%,transparent)] focus-visible:text-ink " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--logo)]";

const SKILL_LOGO =
  "grid size-7 flex-none place-items-center rounded-lg text-[var(--logo)] " +
  "bg-[color-mix(in_srgb,var(--logo)_14%,transparent)] transition-transform duration-[400ms] ease-spring " +
  "group-hover/item:scale-[1.08] [&_svg]:size-4";

/* A link affordance that does not change the row height. */
const SKILL_OUT =
  "ml-auto size-[13px] flex-none -translate-x-0.5 translate-y-0.5 text-[var(--logo)] opacity-0 " +
  "transition-[opacity,transform,translate,scale,rotate] duration-300 ease-brand " +
  "group-hover/item:translate-x-0 group-hover/item:translate-y-0 group-hover/item:opacity-85 " +
  "group-focus-visible/item:translate-x-0 group-focus-visible/item:translate-y-0 group-focus-visible/item:opacity-85";

export function Skills() {
  const heading = HEADINGS.skills;

  return (
    <section className={SECTION} id="skills">
      <div className={SHELL}>
        <div className={`${SECTION_HEAD} ${REVEAL} mx-auto text-center`} data-reveal>
          <SectionEyebrow id="skills" />
          <h2 className={H2}>
            {heading.before}
            <span className={GRAD}>{heading.accent}</span>
            {heading.after}
          </h2>
          <p>{heading.blurb}</p>
        </div>

        <div className="grid gap-[clamp(1rem,2vw,1.35rem)] grid-cols-[repeat(auto-fit,minmax(min(255px,100%),1fr))]">
          {SKILL_GROUPS.map((group, index) => (
            <article
              className={`${SKILL} ${REVEAL}`}
              key={group.title}
              style={{ ...stagger(index, 90), ...cssVars({ "--tint": group.tint }) }}
              data-reveal
            >
              <span className={SKILL_ICO}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href={`#${group.icon}`} /></svg>
              </span>
              <h3 className={`${H3} mb-1`}>{group.title}</h3>
              <span className="mb-[.85rem] block font-mono text-[.68rem] max-[640px]:text-[.74rem] tracking-[.13em] uppercase text-ink-faint">
                {group.meta}
              </span>
              <ul className="grid gap-[.3rem]">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    style={cssVars({ "--brand": item.brand, "--brand-on-dark": item.brandOnDark })}
                  >
                    <a className={SKILL_ITEM} href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className={SKILL_LOGO}>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href={`#${item.logo}`} /></svg>
                      </span>
                      <span className="min-w-0">{item.name}</span>
                      <svg className={SKILL_OUT} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <use href="#i-external" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
