import Link from "next/link";

import { StatCard } from "@/components/admin/StatCard";
import { SECTIONS } from "@/lib/sections";
import { CARD, H2, H3 } from "@/lib/styles";
import { RESUME_HREF } from "@/lib/site";

/**
 * Content inventory for the public site.
 *
 * Every figure is derived from the modules the site itself renders from,
 * so this cannot drift from what visitors see. It is a scaffold: there is
 * no CMS, no database and no auth behind this route yet, and nothing here
 * writes anything.
 */
export default function AdminPage() {
  const anchors = SECTIONS.filter((section) => section.href.includes("#"));

  return (
    <>
      <div className="mb-8">
        <h1 className={H2}>Console</h1>
        <p className="mt-2 text-[.95rem] text-ink-muted">
          What the public site is currently serving, read from the same modules it renders from.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]">
        <StatCard label="Navigation entries" value={SECTIONS.length} hint="Shared by the navbar and the mobile drawer." />
        <StatCard label="Home anchors" value={anchors.length} hint="Entries that scroll within the single page." />
        <StatCard label="Documents" value={2} hint="Résumé PDFs served from /public." />
      </div>

      <section className={`${CARD} mt-6 p-6`}>
        <h2 className={`${H3} mb-4`}>Navigation</h2>
        <ul className="grid gap-2">
          {SECTIONS.map((section) => (
            <li
              className="flex flex-wrap items-center justify-between gap-3 rounded-brand border border-line
                bg-sunken px-4 py-3"
              key={section.id}
            >
              <span className="min-w-0">
                <span className="block font-display text-[.92rem] font-semibold text-ink">{section.label}</span>
                <span className="block text-[.8rem] text-ink-muted">{section.blurb}</span>
              </span>
              <Link className="font-mono text-[.76rem] text-brand-1 hover:underline" href={section.href}>
                {section.href}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${CARD} mt-6 p-6`}>
        <h2 className={`${H3} mb-4`}>Documents</h2>
        <a
          className="inline-flex items-center gap-2 font-mono text-[.82rem] text-brand-1 hover:underline"
          href={RESUME_HREF}
          download
        >
          {RESUME_HREF}
        </a>
      </section>
    </>
  );
}
