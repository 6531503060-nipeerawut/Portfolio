import Link from 'next/link';

import { CARD, H2, H3 } from '@/components/ui/document';
import { RESUME_ATS_HREF, RESUME_HREF } from '@/constants';
import { PROJECTS, SKILL_GROUPS, STATS, TIMELINE } from '@/constants/content';
import { SECTIONS, appHref, sectionHref } from '@/constants/navigation';
import { StatCard } from './StatCard';

const ROW =
  'flex flex-wrap items-center justify-between gap-3 rounded-brand border border-line bg-sunken px-4 py-3';

/** Every vendor named across the four skill groups. */
const TOOL_COUNT = SKILL_GROUPS.reduce((total, group) => total + group.items.length, 0);

/**
 * Content inventory for the public site.
 *
 * Every figure is derived from the modules the site itself renders from, so
 * this cannot drift from what visitors see — add a project to
 * `constants/content.ts` and the count here moves with it. It is a scaffold:
 * there is no CMS, no database and no auth behind this route, and nothing here
 * writes anything.
 */
export function ConsoleScreen() {
  return (
    <>
      <div className="mb-8">
        <h1 className={H2}>Console</h1>
        <p className="mt-2 text-[.95rem] text-ink-muted">
          What the public site is currently serving, read from the same modules it renders from.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
        <StatCard
          label="Navigation entries"
          value={SECTIONS.length}
          hint="One registry, read by the desktop rail and the app's tab bar."
        />
        <StatCard
          label="Projects listed"
          value={PROJECTS.length}
          hint="Systems in the Work section, each one shipped to real users."
        />
        <StatCard
          label="Tools named"
          value={TOOL_COUNT}
          hint={`Across ${SKILL_GROUPS.length} skill groups, every one linked to its vendor.`}
        />
        <StatCard
          label="Roles on the timeline"
          value={TIMELINE.length}
          hint="Current position and the internship before it."
        />
      </div>

      <section className={`${CARD} mt-6 p-6`}>
        <h2 className={`${H3} mb-4`}>Navigation</h2>
        <ul className="grid gap-2">
          {SECTIONS.map((section) => (
            <li className={ROW} key={section.id}>
              <span className="min-w-0">
                <span className="block font-display text-[.92rem] font-semibold text-ink">
                  {section.label}
                </span>
                <span className="block text-[.8rem] text-ink-muted">{section.blurb}</span>
              </span>
              {/* Both addresses for the same section: the anchor the document
                  scrolls to, and the screen the app navigates to. */}
              <span className="flex items-center gap-3">
                <Link
                  className="font-mono text-[.76rem] text-brand-1 hover:underline"
                  href={sectionHref(section.id)}
                >
                  {sectionHref(section.id)}
                </Link>
                <Link
                  className="font-mono text-[.76rem] text-ink-faint hover:underline"
                  href={appHref(section.id)}
                >
                  {appHref(section.id)}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${CARD} mt-6 p-6`}>
        <h2 className={`${H3} mb-4`}>Counters on the About section</h2>
        <ul className="grid gap-2">
          {STATS.map((stat) => (
            <li className={ROW} key={stat.label}>
              <span className="min-w-0">
                <span className="block font-display text-[.92rem] font-semibold text-ink">
                  {stat.label}
                </span>
                <span className="block text-[.8rem] text-ink-muted">
                  Shown as &ldquo;{stat.short}&rdquo; on a phone.
                </span>
              </span>
              <span className="font-mono text-[.95rem] font-semibold text-brand-1 [font-variant-numeric:tabular-nums]">
                {stat.value}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[.8rem] text-ink-faint">
          Counted from the repositories, not estimated — see CLAUDE.md §6 for the commands.
        </p>
      </section>

      <section className={`${CARD} mt-6 p-6`}>
        <h2 className={`${H3} mb-4`}>Documents</h2>
        <ul className="grid gap-2">
          {[
            { href: RESUME_HREF, label: 'Résumé — the designed one page' },
            { href: RESUME_ATS_HREF, label: 'Résumé — plain, for applicant tracking systems' },
          ].map((document) => (
            <li className={ROW} key={document.href}>
              <span className="text-[.85rem] text-ink-muted">{document.label}</span>
              <a
                className="font-mono text-[.78rem] text-brand-1 hover:underline"
                href={document.href}
                download
              >
                {document.href}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
