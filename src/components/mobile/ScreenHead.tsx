import { HEADINGS } from "@/lib/content";
import { APP_ENTER, APP_EYEBROW, APP_LEAD, APP_TITLE } from "@/lib/mobile";
import { type SectionId, sectionIndex, sectionLabel } from "@/lib/sections";

/**
 * The top of a screen: counter, statement, one line of context.
 *
 * The counter is the same registry the desktop numbers its sections from,
 * so "03 / Skills" means the same thing on both — the app has not
 * reordered anything, it has given each entry a page.
 */
export function ScreenHead({ id }: { id: Exclude<SectionId, "home"> }) {
  const heading = HEADINGS[id];

  return (
    <header className={`${APP_ENTER} pt-6 pb-1`}>
      <span className={APP_EYEBROW}>
        <span className="text-brand-1 [font-variant-numeric:tabular-nums]">{sectionIndex(id)}</span>
        {` / ${sectionLabel(id)}`}
      </span>

      <h1 className={APP_TITLE}>
        {heading.before}
        <span className="bg-[image:var(--gradient-text)] bg-clip-text text-transparent">
          {heading.accent}
        </span>
        {heading.after}
      </h1>

      <p className={APP_LEAD}>{heading.blurb}</p>
    </header>
  );
}
