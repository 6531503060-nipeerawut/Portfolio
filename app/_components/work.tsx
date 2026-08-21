import { SectionEyebrow } from "@/app/_components/section-eyebrow";
import { stagger } from "@/app/_lib/site";

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

export function Work() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-head section-head--split reveal">
          <div>
            <SectionEyebrow id="work" />
            <h2>Systems I have <span className="grad">shipped</span>.</h2>
            <p>Six builds that reached real users — schema, API and interface where it says end to end.</p>
          </div>

          <a className="btn btn--ghost magnetic" href="https://github.com/6531503060-nipeerawut?tab=repositories"
            target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
            More on GitHub
            <svg className="arr-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-arrow-right" /></svg>
          </a>
        </div>

        <div className="work__grid">
          {PROJECTS.map((project, index) => (
            <article className={`card work-card work-card--${index + 1} tilt reveal`} key={project.title}
              /* The first card has never carried a delay, so it carries no
                 style attribute either. */
              style={index === 0 ? undefined : stagger(index, 80)}>
              <header className="work-card__top">
                <span className="work-card__ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href={`#${project.icon}`} /></svg>
                </span>
                {project.badge.href ? (
                  <a className="work-card__badge work-card__badge--pub"
                    href={project.badge.href} target="_blank" rel="noopener noreferrer"
                    aria-label={project.badge.ariaLabel}>
                    {project.badge.text}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
                  </a>
                ) : (
                  <span className="work-card__badge">{project.badge.text}</span>
                )}
              </header>
              <h3>{project.title}</h3>
              <p className="work-card__org">{project.org}</p>
              <p>{project.blurb}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
