/**
 * The one list of sections, the order they are in, and the two ways of
 * reaching them.
 *
 * It drives the desktop nav rail, the app's tab bar, the counter printed in
 * each section's own eyebrow and the inventory in the console. Those used to
 * be numbered by hand in four files, so reordering a section meant editing all
 * of them and hoping the numbers still lined up.
 *
 * The two front ends address these differently and that is the whole point of
 * the split. On the desktop every entry is an anchor on the home page, because
 * that is what the site is over there: one document a visitor scrolls through,
 * with a rail that scroll-spies it. The phone app gives each entry a route of
 * its own, because a tab that scrolls instead of navigating is not a tab. Same
 * six ids, same order, two ways of reaching them.
 *
 * The desktop paths are absolute (`/#about`, not `#about`) so the nav still
 * works from a route that is not the home page. public/js/main.js reads the
 * part before the `#` to decide whether a link is a same-page jump it should
 * smooth scroll and scroll-spy, or a navigation it should leave alone.
 *
 * `icon` is a sprite id from `components/ui/IconSprite`, without the leading
 * `#`. Only the tab bar and the app's own hub list draw it — the desktop rail
 * is wide enough for words alone — but it belongs here rather than in either
 * of them, because a section and the glyph that stands for it are the same
 * fact. `blurb` is the one-line description the app's home screen prints under
 * each entry and the console lists beside it.
 */
export const SECTIONS = [
  { id: 'home', label: 'Home', icon: 'i-home', blurb: 'Introduction and quick links' },
  { id: 'about', label: 'About', icon: 'i-user', blurb: 'How I work and where I studied' },
  { id: 'skills', label: 'Skills', icon: 'i-code', blurb: 'Languages, frameworks and tooling' },
  {
    id: 'experience',
    label: 'Experience',
    icon: 'i-briefcase',
    blurb: 'Roles, education and timeline',
  },
  { id: 'work', label: 'Work', icon: 'i-layers', blurb: 'Systems I have shipped' },
  { id: 'contact', label: 'Contact', icon: 'i-mail', blurb: 'Say hello or start a conversation' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/* ── The document's addresses ─────────────────────────────────────── */

/** On the desktop, every section is an anchor on the home page. */
export function sectionHref(id: SectionId): string {
  return `/#${id}`;
}

/** Zero-padded, so "3" reads as "03". */
function pad(n: number): string {
  return String(n).padStart(2, '0');
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

/* ── The app's addresses ──────────────────────────────────────────── */

/** Every app screen lives under this prefix; nothing else does. */
export const APP_ROOT = '/m';

/**
 * The media query that pairs a document with its screen, for the
 * `rel="alternate"` link each desktop route carries.
 *
 * A search engine finding two URLs with the same content has to be told which
 * is which, or it picks one and may pick the phone's. The document points
 * here, every screen points a canonical back at its document, and the pair is
 * understood as one page served two ways. Nothing routes on this value — that
 * is the proxy's job, off the user agent — so it only has to describe the
 * split, not implement it.
 */
export const APP_MEDIA = 'only screen and (max-width: 760px)';

/**
 * One screen per navigation entry — which is the whole point of the split.
 * On the desktop the same six ids are anchors inside one document; here each
 * is a route of its own, so a tap is a navigation and the back button means
 * something.
 */
export function appHref(id: SectionId): string {
  return id === 'home' ? APP_ROOT : `${APP_ROOT}/${id}`;
}

/** The tab bar, in the order it is drawn. */
export const TABS = SECTIONS.map((section) => ({ ...section, href: appHref(section.id) }));

/**
 * The GitHub profile, which is a route on both sides but not a section.
 *
 * Six tabs is already as many as a phone can label and the desktop rail
 * numbers its entries from SECTIONS, so this one is reached from the app's hub
 * list and from links given out — never from the tab bar or the rail.
 */
export const ACCOUNT_HREF = '/user';
export const ACCOUNT_APP_HREF = `${APP_ROOT}/user`;
