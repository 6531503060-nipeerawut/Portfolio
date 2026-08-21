import { type SectionId, sectionIndex, sectionLabel } from "@/app/_lib/sections";

/**
 * The "01 / About" line above a section heading. Both halves come from the
 * section registry, so the counter cannot fall out of step with the drawer.
 */
export function SectionEyebrow({ id }: { id: SectionId }) {
  return (
    <span className="eyebrow">
      {/* One template literal rather than two adjacent expressions: React
          separates consecutive text children with a comment node. */}
      <span className="idx">{sectionIndex(id)}</span>{` / ${sectionLabel(id)}`}
    </span>
  );
}
