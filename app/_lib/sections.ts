/**
 * The one list of page sections.
 *
 * It drives the desktop nav, the mobile drawer (including its 01–06 counters)
 * and the counter printed in each section's own eyebrow. Those three used to
 * be numbered by hand in four files, so reordering a section meant editing all
 * of them and hoping the numbers still lined up.
 */
export const SECTIONS = [
  { id: "home", label: "Home", blurb: "Introduction and quick links" },
  { id: "about", label: "About", blurb: "How I work and where I studied" },
  { id: "skills", label: "Skills", blurb: "Languages, frameworks and tooling" },
  { id: "experience", label: "Experience", blurb: "Roles, education and timeline" },
  { id: "work", label: "Work", blurb: "Systems I have shipped" },
  { id: "contact", label: "Contact", blurb: "Say hello or start a conversation" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Zero-padded, so "3" reads as "03". */
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Position in the drawer, counting from 01. */
export function drawerNumber(index: number): string {
  return pad(index + 1);
}

/**
 * The counter in a section's eyebrow. Home is the landing view and has no
 * eyebrow, so About — the second entry — is 01 and the rest follow from it.
 */
export function sectionIndex(id: SectionId): string {
  return pad(SECTIONS.findIndex((section) => section.id === id));
}

/** The label the eyebrow prints after its counter, e.g. "01 / About". */
export function sectionLabel(id: SectionId): string {
  const section = SECTIONS.find((entry) => entry.id === id);
  // Unreachable: SectionId is derived from SECTIONS.
  if (!section) throw new Error(`Unknown section: ${id}`);
  return section.label;
}
