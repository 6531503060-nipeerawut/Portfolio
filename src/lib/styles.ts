/**
 * Shared utility strings.
 *
 * These are Tailwind classes, not a stylesheet: they exist so the button
 * that appears eleven times across the site is described once instead of
 * eleven times. Tailwind scans this file like any other source file, so
 * every class below has to be written out in full — nothing here may be
 * assembled from fragments at runtime.
 */

/** The reading column: full width up to 1180px, then centred with gutters. */
export const SHELL = "mx-auto w-full max-w-shell px-gutter";

/** Vertical rhythm between the numbered sections. */
export const SECTION = "relative py-section";

/**
 * Glass card. The ::before is the hairline of brand colour along the top
 * edge that catches the eye without drawing a full border.
 */
export const CARD =
  "relative rounded-brand-lg border border-line bg-glass shadow-md " +
  "before:absolute before:inset-x-[12%] before:top-0 before:h-px before:opacity-70 before:content-[''] " +
  "before:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--brand-2)_55%,transparent),transparent)]";

/**
 * Button shell.
 *
 * --mag-x / --mag-y are written onto the element by the magnetic-cursor
 * handler in main.js; --lift is the hover rise. Keeping all three in one
 * transform is what lets the two effects compose instead of overwriting
 * each other, and --tf-dur drops the transition to zero while the pointer
 * is actually dragging the button around.
 */
export const BTN =
  "relative isolate inline-flex cursor-pointer items-center justify-center gap-[.6rem] overflow-hidden " +
  "whitespace-nowrap rounded-full border border-line-strong bg-surface px-6 py-[.85rem] " +
  "font-display text-[.94rem] font-semibold tracking-[-.01em] text-ink shadow-sm " +
  "[transform:translate(var(--mag-x,0px),calc(var(--mag-y,0px)+var(--lift,0px)))] " +
  "transition-[transform,box-shadow,border-color,color,background-position] " +
  "duration-[var(--tf-dur,350ms)] ease-brand " +
  "hover:[--lift:-2px] hover:border-[color-mix(in_srgb,var(--brand-1)_45%,var(--line-strong))] hover:shadow-md " +
  "active:[--lift:0px] active:scale-[.985] " +
  "[&_svg]:size-[18px] [&_svg]:flex-none [&_svg]:transition-transform [&_svg]:duration-[400ms] [&_svg]:ease-spring " +
  "hover:[&_.arr-right]:translate-x-1 hover:[&_.arr-down]:translate-y-[3px] hover:[&_.arr-up]:-translate-y-[3px]";

/**
 * Filled button. The ::after is a highlight that sweeps across on hover —
 * it sits behind the label via the shell's `isolate` plus a negative
 * z-index, so it never washes out the text it passes under.
 */
export const BTN_PRIMARY =
  BTN +
  " border-transparent bg-[image:var(--gradient-brand)] [background-size:180%_100%] text-white shadow-brand " +
  "hover:bg-right-top hover:shadow-[0_14px_32px_-12px_color-mix(in_srgb,var(--brand-1)_65%,transparent)] " +
  "after:absolute after:inset-0 after:-z-10 after:-translate-x-[120%] after:content-[''] " +
  "after:bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/.38)_50%,transparent_65%)] " +
  "after:transition-transform after:duration-[850ms] after:ease-brand hover:after:translate-x-[120%]";

/** Outlined button on the glass surface. */
export const BTN_GHOST = BTN + " bg-glass hover:text-brand-1";

/** The pill above a section heading, e.g. "01 / About". */
export const EYEBROW =
  "mb-[.8rem] inline-flex items-center gap-[.6rem] rounded-full border border-line bg-glass " +
  "py-[.38rem] pr-[.85rem] pl-[.55rem] font-mono text-[.74rem] font-medium uppercase " +
  "tracking-[.14em] text-ink-muted shadow-xs";

/** Brand-gradient text. Wide background so the hue can drift across it. */
export const GRAD =
  "bg-[image:var(--gradient-text)] [background-size:220%_100%] bg-clip-text text-transparent";

/** Section heading block: eyebrow, h2, and a muted line under it. */
export const SECTION_HEAD =
  "mb-[clamp(1.5rem,3.6vh,2.75rem)] max-w-[46rem] " +
  "[&>p]:mt-3 [&>p]:text-[clamp(.95rem,1.2vw,1.04rem)] [&>p]:text-ink-muted";

/** Display headings. h1/h2/h3 are set per use rather than globally. */
export const H1 =
  "font-display text-[clamp(2.3rem,min(6.4vw,9.2vh),4.1rem)] font-extrabold leading-[1.1] " +
  "tracking-[-.03em] text-ink text-balance";

export const H2 =
  "font-display text-[clamp(1.7rem,min(3.6vw,5.4vh),2.5rem)] font-bold leading-[1.1] " +
  "tracking-[-.03em] text-ink text-balance";

export const H3 =
  "font-display text-[clamp(1.2rem,2.1vw,1.45rem)] font-bold leading-[1.1] tracking-[-.02em] " +
  "text-ink text-balance";

/**
 * Scroll-reveal. main.js adds .is-in once the element crosses into view;
 * the failsafe animation reveals it anyway if the script never arrives.
 * `data-reveal` is the hook the observer queries and the <noscript> rule
 * overrides, so it must stay on the element alongside these classes.
 */
export const REVEAL =
  "translate-y-[26px] opacity-0 animate-reveal-failsafe " +
  "transition-[opacity,transform] duration-[800ms] ease-brand [transition-delay:var(--d,0ms)] " +
  "[&.is-in]:translate-y-0 [&.is-in]:opacity-100";

/** First paint of the hero, which runs on a timer rather than an observer. */
export const ENTER =
  "translate-y-6 opacity-0 animate-enter-up [animation-delay:var(--d,0ms)]";

/**
 * Directional reveals. Below 1024px the layout is a single column, so the
 * sideways variants slide up instead — which also keeps their transform
 * inside the viewport rather than pushing a scrollbar out.
 */
export const REVEAL_LEFT =
  "-translate-x-[30px] opacity-0 animate-reveal-failsafe " +
  "transition-[opacity,transform] duration-[800ms] ease-brand [transition-delay:var(--d,0ms)] " +
  "[&.is-in]:translate-x-0 [&.is-in]:opacity-100 " +
  "max-[1024px]:translate-x-0 max-[1024px]:translate-y-[26px] max-[1024px]:[&.is-in]:translate-y-0";

export const REVEAL_RIGHT =
  "translate-x-[30px] opacity-0 animate-reveal-failsafe " +
  "transition-[opacity,transform] duration-[800ms] ease-brand [transition-delay:var(--d,0ms)] " +
  "[&.is-in]:translate-x-0 [&.is-in]:opacity-100 " +
  "max-[1024px]:translate-x-0 max-[1024px]:translate-y-[26px] max-[1024px]:[&.is-in]:translate-y-0";

export const REVEAL_SCALE =
  "scale-[.94] opacity-0 animate-reveal-failsafe " +
  "transition-[opacity,transform] duration-[800ms] ease-brand [transition-delay:var(--d,0ms)] " +
  "[&.is-in]:scale-100 [&.is-in]:opacity-100";

/** Heading block with the stat tiles pulled up beside the title. */
export const SECTION_HEAD_SPLIT =
  "mb-[clamp(1.5rem,3.6vh,2.75rem)] flex max-w-none flex-wrap items-end justify-between gap-x-8 gap-y-4 " +
  "[&>div]:max-w-[46rem] [&>div>p]:mt-3 [&>div>p]:text-[clamp(.95rem,1.2vw,1.04rem)] [&>div>p]:text-ink-muted";

/**
 * Tech tag. The hover reads --tint from whichever card encloses it, so a
 * tag picks up the colour of its own card and falls back to brand-1 when
 * nothing sets one.
 */
export const TAG =
  "rounded-lg border border-line bg-sunken px-3 py-[.34rem] font-mono text-[.74rem] font-medium text-ink-soft " +
  "transition-[transform,color,border-color,background-color] duration-300 ease-brand " +
  "hover:-translate-y-0.5 hover:text-[var(--tint,var(--brand-1))] " +
  "hover:border-[color-mix(in_srgb,var(--tint,var(--brand-1))_45%,var(--line))] " +
  "hover:bg-[color-mix(in_srgb,var(--tint,var(--brand-1))_10%,transparent)]";

/** Square glass button — the theme switch and the back-to-top control. */
export const ICON_BTN =
  "grid size-[42px] place-items-center rounded-[14px] border border-line bg-glass text-ink-soft shadow-xs " +
  "transition-[transform,color,border-color,background-color] duration-[400ms] ease-spring " +
  "hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-1)_40%,var(--line))] hover:text-brand-1 " +
  "[&_svg]:size-[19px]";
