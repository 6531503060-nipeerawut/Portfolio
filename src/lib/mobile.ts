import { SECTIONS, type SectionId } from "@/lib/sections";

/**
 * The phone app: routes and shared class strings.
 *
 * This is the mobile half of the site and it shares nothing visual with
 * `lib/styles.ts`. That file describes a document — glass panels, hover
 * lifts, magnetic buttons, a cursor spotlight, sections a screen tall that
 * a mouse wheel travels through. None of that means anything to a thumb,
 * and half of it costs a phone real frames.
 *
 * What replaces it is the vocabulary a native app already uses: solid
 * surfaces instead of blurred ones, list rows instead of hover cards,
 * pressed states instead of hovered ones, and full-width controls sized
 * for a finger rather than a pointer.
 */

/** Every app screen lives under this prefix; nothing else does. */
export const APP_ROOT = "/m";

/**
 * The media query that pairs a document with its screen, for the
 * `rel="alternate"` link each desktop route carries.
 *
 * A search engine finding two URLs with the same content has to be told
 * which is which, or it picks one and may pick the phone's. The document
 * points here, every screen points a canonical back at its document, and
 * the pair is understood as one page served two ways. Nothing routes on
 * this value — that is the proxy's job, off the user agent — so it only
 * has to describe the split, not implement it.
 */
export const APP_MEDIA = "only screen and (max-width: 760px)";

/**
 * One screen per navigation entry — which is the whole point of the split.
 * On the desktop the same six ids are anchors inside one document; here
 * each is a route of its own, so a tap is a navigation and the back button
 * means something.
 */
export function appHref(id: SectionId): string {
  return id === "home" ? APP_ROOT : `${APP_ROOT}/${id}`;
}

/** The tab bar, in the order it is drawn. */
export const TABS = SECTIONS.map((section) => ({ ...section, href: appHref(section.id) }));

/* ── Screen scaffolding ───────────────────────────────────────────── */

/**
 * The column every screen is drawn in.
 *
 * 18px rather than the site's fluid gutter: that clamp bottoms out at
 * 1.15rem and is written to grow with the viewport, which on a phone means
 * it never grows at all. A flat value is the same thing with less to read,
 * and the safe-area insets that matter here are handled by the shell.
 */
export const SCREEN = "px-[18px]";

/** Vertical rhythm between the blocks of a screen. */
export const STACK = "grid gap-[18px]";

export const APP_EYEBROW =
  "inline-flex items-center gap-[.45rem] rounded-full border border-line bg-surface " +
  "px-[.7rem] py-[.3rem] font-mono text-[.66rem] font-medium tracking-[.14em] uppercase text-ink-muted";

/** The statement at the top of a screen. Sized off the viewport, not the page. */
export const APP_TITLE =
  "mt-[.7rem] font-display text-[clamp(1.55rem,7.2vw,2.05rem)] font-extrabold leading-[1.14] " +
  "tracking-[-.03em] text-ink text-balance";

export const APP_LEAD = "mt-[.6rem] text-[.92rem] leading-[1.6] text-ink-muted text-pretty";

/** Small mono label above a group of rows. */
export const APP_LABEL =
  "mb-[.7rem] block font-mono text-[.66rem] tracking-[.16em] uppercase text-ink-faint";

/* ── Surfaces ─────────────────────────────────────────────────────── */

/**
 * The card.
 *
 * Opaque, unlike the desktop's `bg-glass`. A blurred backdrop is the single
 * most expensive thing a phone can be asked to composite while a finger is
 * dragging the page, and there is nothing behind these worth seeing through
 * them anyway.
 */
export const APP_CARD = "rounded-[20px] border border-line bg-surface shadow-sm";

/** Card with the padding most of them want. */
export const APP_PANEL = APP_CARD + " p-[18px]";

/**
 * A list row: icon, two lines of text, and usually something on the right.
 *
 * 60px of height is the floor rather than the target — a row whose second
 * line wraps grows instead of clipping.
 */
export const APP_ROW =
  "flex min-h-[60px] w-full items-center gap-[.85rem] px-[14px] py-3 text-left " +
  "[-webkit-tap-highlight-color:transparent] transition-[background-color,transform] duration-200 ease-brand " +
  "active:scale-[.985] active:bg-sunken";

/** Rows sharing one card: hairlines between them, none above the first. */
export const APP_ROW_GROUP = APP_CARD + " overflow-hidden [&>*+*]:border-t [&>*+*]:border-line";

/** The tinted square that opens a row. Reads `--tint` from the row. */
export const APP_ROW_ICON =
  "grid size-10 flex-none place-items-center rounded-[13px] text-[var(--tint,var(--brand-1))] " +
  "bg-[color-mix(in_srgb,var(--tint,var(--brand-1))_13%,transparent)] [&_svg]:size-[19px]";

export const APP_ROW_TITLE =
  "block font-display text-[.94rem] font-semibold tracking-[-.01em] text-ink";

export const APP_ROW_META =
  "mt-[.1rem] block overflow-hidden text-[.8rem] text-ellipsis whitespace-nowrap text-ink-faint";

export const APP_ROW_ARROW = "ml-auto flex-none text-ink-faint [&_svg]:size-[17px]";

/* ── Controls ─────────────────────────────────────────────────────── */

/**
 * Full-width button, 50px tall.
 *
 * Nothing here reacts to a hover: on a touch screen a hover state is only
 * ever seen stuck to whatever was tapped last. The press is the feedback.
 */
export const APP_BTN =
  "inline-flex h-[50px] w-full items-center justify-center gap-[.55rem] rounded-[16px] " +
  "border border-line-strong bg-surface px-5 font-display text-[.95rem] font-semibold " +
  "tracking-[-.01em] text-ink shadow-sm [-webkit-tap-highlight-color:transparent] " +
  "transition-[transform,background-color,border-color] duration-200 ease-brand " +
  "active:scale-[.97] active:bg-sunken [&_svg]:size-[18px] [&_svg]:flex-none";

export const APP_BTN_PRIMARY =
  "inline-flex h-[50px] w-full items-center justify-center gap-[.55rem] rounded-[16px] " +
  "border border-transparent bg-[image:var(--gradient-brand)] px-5 font-display text-[.95rem] " +
  "font-semibold tracking-[-.01em] text-white shadow-brand [-webkit-tap-highlight-color:transparent] " +
  "transition-transform duration-200 ease-brand active:scale-[.97] " +
  "[&_svg]:size-[18px] [&_svg]:flex-none";

/** Square control in the app bar. */
export const APP_ICON_BTN =
  "grid size-10 flex-none place-items-center rounded-[13px] border border-line bg-surface " +
  "text-ink-soft [-webkit-tap-highlight-color:transparent] " +
  "transition-[transform,color,border-color] duration-200 ease-brand active:scale-95 " +
  "[&_svg]:size-[18px]";

export const APP_TAG =
  "rounded-[9px] border border-line bg-sunken px-[.55rem] py-[.28rem] font-mono text-[.7rem] " +
  "font-medium text-ink-soft";

/** Pill carrying a date range or a label, on the timeline. */
export const APP_PILL =
  "rounded-full border border-line bg-sunken px-[.6rem] py-[.22rem] font-mono text-[.68rem] " +
  "tracking-[.04em] whitespace-nowrap text-ink-muted";

/**
 * Entrance for a block of a screen.
 *
 * Not the desktop's `data-reveal`: that is an IntersectionObserver watching
 * a document being scrolled through. Here a navigation replaces the whole
 * screen, so every block is new and a staggered rise on mount is both
 * cheaper and closer to what a native transition looks like. `--d` is the
 * per-block delay, exactly as `ENTER` uses it.
 */
export const APP_ENTER = "opacity-0 animate-enter-up [animation-delay:var(--d,0ms)]";
