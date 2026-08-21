import { SectionEyebrow } from "@/app/_components/section-eyebrow";
import { cssVars, stagger } from "@/app/_lib/site";

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
  /** Card variant class, e.g. `skill--fe`. */
  variant: string;
  /** Sprite id of the card icon, without the leading `#`. */
  icon: string;
  items: SkillLink[];
};

const GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    meta: "Interfaces & experience",
    variant: "skill--fe",
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
    variant: "skill--be",
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
    variant: "skill--db",
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
    variant: "skill--tools",
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

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <div className="section-head center reveal">
          <SectionEyebrow id="skills" />
          <h2>What I <span className="grad">work with</span>.</h2>
          <p>The stack I use day to day, plus what I have shipped with before.</p>
        </div>

        <div className="skills__grid">
          {GROUPS.map((group, index) => (
            <article className={`card skill ${group.variant} reveal`} key={group.title}
              style={stagger(index, 90)}>
              <span className="skill__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href={`#${group.icon}`} /></svg>
              </span>
              <h3>{group.title}</h3>
              <span className="skill__meta">{group.meta}</span>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item.name} style={cssVars({ "--brand": item.brand, "--brand-on-dark": item.brandOnDark })}>
                    <a className="skill-item" href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className="skill-item__logo">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href={`#${item.logo}`} /></svg>
                      </span>
                      <span className="skill-item__name">{item.name}</span>
                      <svg className="skill-item__out" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use
                          href="#i-external" /></svg>
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
