import { SectionEyebrow } from "@/components/front/SectionEyebrow";
import { CARD, GRAD, H2, H3, REVEAL, SECTION, SECTION_HEAD, SHELL } from "@/lib/styles";
import { cssVars, stagger } from "@/lib/site";

type SkillLink = {
  name: string;
  href: string;
  /** Sprite id of the vendor logo, without the leading `#`. */
  logo: string;
  /** Vendor colour used on the light palette. */
  brand: string;
  /** Same colour lifted for contrast on the dark palette. */
  brandOnDark: string;
};

type SkillGroup = {
  title: string;
  meta: string;
  /** Brand token the card tints itself with. */
  tint: string;
  /** Sprite id of the card icon, without the leading `#`. */
  icon: string;
  items: SkillLink[];
};

const GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    meta: "Interfaces & experience",
    tint: "var(--brand-1)",
    icon: "i-code",
    items: [
      { name: "Angular", href: "https://angular.dev/", logo: "logo-angular", brand: "#0F0F11", brandOnDark: "#e8ecf8" },
      { name: "React", href: "https://react.dev/", logo: "logo-react", brand: "#61DAFB", brandOnDark: "#61DAFB" },
      { name: "Next.js", href: "https://nextjs.org/", logo: "logo-nextjs", brand: "#000000", brandOnDark: "#e8ecf8" },
      { name: "Tailwind CSS", href: "https://tailwindcss.com/", logo: "logo-tailwind-css", brand: "#06B6D4", brandOnDark: "hsl(189 94% 68%)" },
      { name: "Flutter", href: "https://flutter.dev/", logo: "logo-flutter", brand: "#02569B", brandOnDark: "hsl(207 97% 68%)" },
    ],
  },
  {
    title: "Backend",
    meta: "APIs & services",
    tint: "var(--brand-2)",
    icon: "i-server",
    items: [
      { name: "Go (Fiber)", href: "https://go.dev/", logo: "logo-go-fiber", brand: "#00ADD8", brandOnDark: "hsl(192 100% 68%)" },
      { name: "Node.js (Express.js)", href: "https://nodejs.org/", logo: "logo-nodejs-expressjs", brand: "#5FA04E", brandOnDark: "hsl(108 55% 68%)" },
      { name: "Java (Spring Boot)", href: "https://spring.io/projects/spring-boot", logo: "logo-spring-boot", brand: "#6DB33F", brandOnDark: "hsl(96 48% 68%)" },
      { name: "Edge Functions", href: "https://supabase.com/docs/guides/functions", logo: "logo-edge-fn", brand: "#7C8CFF", brandOnDark: "#7C8CFF" },
    ],
  },
  {
    title: "Database",
    meta: "Modelling & integrity",
    tint: "var(--brand-3)",
    icon: "i-database",
    items: [
      { name: "MSSQL", href: "https://www.microsoft.com/en-us/sql-server", logo: "logo-generic-db", brand: "#CC2927", brandOnDark: "hsl(1 68% 68%)" },
      { name: "MySQL", href: "https://www.mysql.com/", logo: "logo-mysql", brand: "#4479A1", brandOnDark: "hsl(206 55% 68%)" },
      { name: "PostgreSQL", href: "https://www.postgresql.org/", logo: "logo-postgresql", brand: "#4169E1", brandOnDark: "hsl(225 73% 68%)" },
      { name: "Supabase", href: "https://supabase.com/", logo: "logo-supabase", brand: "#3FCF8E", brandOnDark: "hsl(153 60% 68%)" },
    ],
  },
  {
    title: "Tools",
    meta: "Workflow & collaboration",
    tint: "var(--brand-4)",
    icon: "i-tools",
    items: [
      { name: "Git", href: "https://git-scm.com/", logo: "logo-git", brand: "#F03C2E", brandOnDark: "hsl(4 87% 68%)" },
      { name: "GitHub", href: "https://github.com/", logo: "logo-github", brand: "#181717", brandOnDark: "#e8ecf8" },
      { name: "Swagger", href: "https://swagger.io/", logo: "logo-swagger", brand: "#85EA2D", brandOnDark: "hsl(92 82% 68%)" },
      { name: "Postman", href: "https://www.postman.com/", logo: "logo-postman", brand: "#FF6C37", brandOnDark: "hsl(16 100% 68%)" },
      { name: "Figma", href: "https://www.figma.com/", logo: "logo-figma", brand: "#F24E1E", brandOnDark: "hsl(14 89% 68%)" },
    ],
  },
];

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
  return (
    <section className={SECTION} id="skills">
      <div className={SHELL}>
        <div className={`${SECTION_HEAD} ${REVEAL} mx-auto text-center`} data-reveal>
          <SectionEyebrow id="skills" />
          <h2 className={H2}>
            What I <span className={GRAD}>work with</span>.
          </h2>
          <p>The stack I use day to day, plus what I have shipped with before.</p>
        </div>

        <div className="grid gap-[clamp(1rem,2vw,1.35rem)] grid-cols-[repeat(auto-fit,minmax(min(255px,100%),1fr))]">
          {GROUPS.map((group, index) => (
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
