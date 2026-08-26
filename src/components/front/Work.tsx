import { SectionEyebrow } from "@/components/front/SectionEyebrow";
import { BTN_GHOST, CARD, GRAD, H2, REVEAL, SECTION, SECTION_HEAD_SPLIT, SHELL, TAG } from "@/lib/styles";
import { cssVars, stagger } from "@/lib/site";

type WorkItem = {
  title: string;
  /** Organisation and category line under the title. */
  org: string;
  blurb: string;
  tags: string[];
  /** Sprite id of the card icon, without the leading `#`. */
  icon: string;
  /**
   * Corner badge. Given a `href` it renders as a link out; otherwise it is a
   * plain label.
   */
  badge: { text: string; href?: string; ariaLabel?: string };
};

/** Card tints, cycled so no two neighbours share one. */
const TINTS = [
  "var(--brand-1)",
  "var(--brand-2)",
  "var(--brand-3)",
  "var(--brand-4)",
  "var(--brand-1)",
  "var(--brand-3)",
];

const PROJECTS: WorkItem[] = [
  {
    title: "Gendee for Business",
    org: "Gendee.ai · B2B",
    blurb: "Shared credit pools, member limits and invite flows — schema through to the admin console.",
    tags: ["Angular", "Deno", "PostgreSQL"],
    icon: "i-building",
    badge: { text: "End to end" },
  },
  {
    title: "Course Platform",
    org: "Gendee.ai · Commerce",
    blurb: "Catalog, checkout, payment and classroom — plus the staff console behind it.",
    tags: ["Angular", "Deno", "PostgreSQL"],
    icon: "i-cap",
    badge: { text: "End to end" },
  },
  {
    title: "Notifications & Push",
    org: "Gendee.ai · Platform",
    blurb: "Database triggers fanning out to Firebase Cloud Messaging, plus an in-app bell.",
    tags: ["Firebase FCM", "Deno", "PostgreSQL"],
    icon: "i-bell",
    badge: { text: "End to end" },
  },
  {
    title: "CIRCLE News Platform",
    org: "Formerly BCC24 News",
    blurb: "Reader app and editorial desk wired to their backend, plus the rebrand across both.",
    tags: ["Ionic", "Capacitor", "Supabase"],
    icon: "i-news",
    badge: { text: "Mobile app" },
  },
  {
    title: "Operations Dashboard",
    org: "Gendee.ai · Admin",
    blurb: "Redeem codes, organizations and reporting, on shared components I wrote for it.",
    tags: ["Angular", "Chart.js", "Supabase"],
    icon: "i-gauge",
    badge: { text: "Internal tool" },
  },
  {
    title: "DoiTung Waste Management",
    org: "Senior project · Mae Fah Luang University",
    blurb: "Community waste tracking that surfaces generation patterns — published as a peer-reviewed IEEE paper.",
    tags: ["React", "Node.js", "MySQL"],
    icon: "i-leaf",
    badge: {
      text: "IEEE 2026",
      href: "https://ieeexplore.ieee.org/document/11460046",
      ariaLabel: "Read the IEEE conference paper on IEEE Xplore",
    },
  },
];

/**
 * Project card.
 *
 * --tilt-x / --tilt-y and --mx / --my are written by the tilt handler in
 * main.js from the pointer's position over the card: the first pair rotates
 * it in 3D, the second moves the ::after highlight to sit under the cursor.
 * --tf-dur is dropped to zero while tracking so the card follows rather
 * than lags, and --lift is the hover rise, kept in the same transform so
 * the two compose.
 */
const WORK_CARD =
  CARD +
  " group flex flex-col overflow-hidden p-[clamp(1.1rem,2.2vw,1.45rem)] [transform-style:preserve-3d] " +
  "[transform:perspective(1100px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))_translateY(var(--lift,0px))] " +
  "transition-[transform,box-shadow,border-color] duration-[var(--tf-dur,500ms)] ease-brand " +
  "hover:[--lift:-6px] hover:shadow-lg hover:border-[color-mix(in_srgb,var(--tint)_42%,var(--line))] " +
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 " +
  "after:content-[''] after:transition-opacity after:duration-500 after:ease-brand hover:after:opacity-100 " +
  "after:bg-[radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_srgb,var(--tint)_15%,transparent),transparent_70%)]";

const WORK_ICO =
  "grid size-[38px] place-items-center rounded-[13px] text-[var(--tint)] " +
  "border border-[color-mix(in_srgb,var(--tint)_30%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_12%,transparent)] transition-transform duration-500 ease-spring " +
  "group-hover:-translate-y-0.5 group-hover:-rotate-6 [&_svg]:size-[21px]";

const BADGE =
  "rounded-full border px-[.7rem] py-[.3rem] font-mono text-[.66rem] tracking-[.1em] uppercase " +
  "whitespace-nowrap text-[var(--tint)] border-[color-mix(in_srgb,var(--tint)_32%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_10%,transparent)] max-[640px]:px-[.55rem] max-[640px]:text-[.66rem]";

/* The publication badge is a link, so it needs affordance the static ones do not. */
const BADGE_PUB =
  BADGE +
  " inline-flex items-center gap-[.34rem] border-[color-mix(in_srgb,var(--tint)_46%,transparent)] " +
  "bg-[color-mix(in_srgb,var(--tint)_16%,transparent)] transition-[background-color,border-color] duration-[250ms] " +
  "ease-brand hover:border-[var(--tint)] hover:bg-[color-mix(in_srgb,var(--tint)_26%,transparent)] " +
  "focus-visible:border-[var(--tint)] focus-visible:bg-[color-mix(in_srgb,var(--tint)_26%,transparent)] " +
  "[&_svg]:size-[11px] max-[640px]:py-[.5rem]";

export function Work() {
  return (
    <section className={SECTION} id="work">
      <div className={SHELL}>
        <div className={`${SECTION_HEAD_SPLIT} ${REVEAL}`} data-reveal>
          <div>
            <SectionEyebrow id="work" />
            <h2 className={H2}>
              Systems I have <span className={GRAD}>shipped</span>.
            </h2>
            <p>Six builds that reached real users — schema, API and interface where it says end to end.</p>
          </div>

          <a
            className={`${BTN_GHOST} magnetic`}
            href="https://github.com/6531503060-nipeerawut?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
            More on GitHub
            <svg className="arr-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-arrow-right" /></svg>
          </a>
        </div>

        <div className="grid gap-[clamp(.8rem,1.6vw,1.15rem)] grid-cols-[repeat(auto-fit,minmax(min(285px,100%),1fr))]">
          {PROJECTS.map((project, index) => (
            <article
              className={`${WORK_CARD} ${REVEAL} tilt`}
              key={project.title}
              /* The first card has never carried a delay, so it gets the
                 tint alone. */
              style={
                index === 0
                  ? cssVars({ "--tint": TINTS[index] })
                  : { ...stagger(index, 80), ...cssVars({ "--tint": TINTS[index] }) }
              }
              data-reveal
            >
              <header className="mb-[.85rem] flex items-center justify-between gap-3">
                <span className={WORK_ICO}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href={`#${project.icon}`} /></svg>
                </span>
                {project.badge.href ? (
                  <a
                    className={BADGE_PUB}
                    href={project.badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.badge.ariaLabel}
                  >
                    {project.badge.text}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
                  </a>
                ) : (
                  <span className={BADGE}>{project.badge.text}</span>
                )}
              </header>

              <h3 className="mb-[.3rem] font-display text-[clamp(1.15rem,2.1vw,1.3rem)] font-bold leading-[1.1] tracking-[-.02em] text-ink">
                {project.title}
              </h3>
              <p className="mb-[.6rem] font-mono text-[.74rem] text-ink-faint">{project.org}</p>
              <p className="text-[.9rem] text-ink-muted">{project.blurb}</p>

              <div className="mt-auto flex flex-wrap gap-[.45rem] pt-[.9rem]">
                {project.tags.map((tag) => (
                  <span className={TAG} key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
