import { EYEBROW } from "@/lib/styles";
import { type SectionId, sectionIndex, sectionLabel } from "@/lib/sections";

/**
 * The "01 / About" line above a section heading. Both halves come from the
 * section registry, so the counter cannot fall out of step with the drawer.
 */
export function SectionEyebrow({ id }: { id: SectionId }) {
  return (
    <span className={EYEBROW}>
      {/* One template literal rather than two adjacent expressions: React
          separates consecutive text children with a comment node. */}
      <span className="text-brand-1 [font-variant-numeric:tabular-nums]">{sectionIndex(id)}</span>
      {` / ${sectionLabel(id)}`}
    </span>
  );
}
