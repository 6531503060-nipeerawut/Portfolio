/**
 * The one list of sections, and the order they are in.
 *
 * It drives the desktop nav rail, the app's tab bar and the counter printed
 * in each section's own eyebrow. Those used to be numbered by hand in four
 * files, so reordering a section meant editing all of them and hoping the
 * numbers still lined up.
 *
 * The two front ends address these differently and that is the whole point
 * of the split. On the desktop every entry is an anchor on the home page,
 * because that is what the site is over there: one document a visitor
 * scrolls through, with a rail that scroll-spies it. The phone app gives
 * each entry a route of its own — see `appHref` in src/lib/mobile.ts —
 * because a tab that scrolls instead of navigating is not a tab. Same six
 * ids, same order, two ways of reaching them.
 *
 * The desktop paths are absolute (`/#about`, not `#about`) so the nav still
 * works from a route that is not the home page. main.js reads the part
 * before the `#` to decide whether a link is a same-page jump it should
 * smooth scroll and scroll-spy, or a navigation it should leave alone.
 *
 * `icon` is a sprite id from IconSprite, without the leading `#`. Only the
 * tab bar and the app's own hub list draw it — the desktop rail is wide
 * enough for words alone — but it belongs here rather than in either of
 * them, because a section and the glyph that stands for it are the same
 * fact. `blurb` is the one-line description the app's home screen prints
 * under each entry and the admin console lists beside it.
 */
export const SECTIONS = [
  { id: "home", label: "Home", icon: "i-home", blurb: "Introduction and quick links" },
  { id: "about", label: "About", icon: "i-user", blurb: "How I work and where I studied" },
  { id: "skills", label: "Skills", icon: "i-code", blurb: "Languages, frameworks and tooling" },
  { id: "experience", label: "Experience", icon: "i-briefcase", blurb: "Roles, education and timeline" },
  { id: "work", label: "Work", icon: "i-layers", blurb: "Systems I have shipped" },
  { id: "contact", label: "Contact", icon: "i-mail", blurb: "Say hello or start a conversation" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** On the desktop, every section is an anchor on the home page. */
export function sectionHref(id: SectionId): string {
  return `/#${id}`;
}

/** Zero-padded, so "3" reads as "03". */
function pad(n: number): string {
  return String(n).padStart(2, "0");
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
