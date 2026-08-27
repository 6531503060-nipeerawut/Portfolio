import { SECTIONS, sectionHref } from "@/lib/sections";

/**
 * The desktop navigation: one fixed bar, transparent over the hero and
 * grounded once the page has moved under it.
 *
 * There is no tab bar here any more. This site used to grow one below
 * 981px — an app bar, a floating bottom rail, safe-area insets — which
 * meant a phone was served a document wearing an app's clothes: six tabs
 * that scrolled instead of navigating, sections a screen tall stacked into
 * one endless page, and hover effects nothing could trigger. The app is now
 * its own build under `(mobile)`, with a screen per entry and a tab bar
 * that actually navigates, and this file is free to be what it always was:
 * navigation for a pointer and a wide screen.
 *
 * The rail therefore stays visible at every width rather than handing over
 * to something else — it only tightens. Below 560px it is dropped, because
 * six labels and a wordmark cannot share that line honestly; the page is a
 * single document, so everything is still one scroll away, and the footer
 * offers the app to anyone who wants it.
 *
 * The bare class names — `nav`, `nav__link`, `is-stuck`, `is-active` —
 * carry no styling of their own. They are the selectors main.js queries and
 * the state classes it toggles; the appearance of each state is expressed
 * here as a Tailwind variant on the element that owns it.
 *
 * The scroll spy slides a pill under whichever entry is current. The
 * geometry of that pill is measured from the DOM in main.js — nothing here
 * declares a position for it, only how it travels between them. Which is
 * also why the rail may never wrap or scroll: the measurement is a single
 * x offset, and both would put the pill under the wrong link.
 *
 * Every link is a plain anchor rather than next/link. These all point at a
 * section of the page already on screen, and main.js owns that move: it
 * calls preventDefault, scrolls smoothly, shifts focus to the heading and
 * rewrites the hash. Routing them through the client router instead would
 * hand the same click to two systems and cost a re-render to arrive where
 * the scroll was already going.
 */
export function Navbar() {
  return (
    <header
      className="nav fixed inset-x-0 top-0 z-[1100] border-b border-transparent print:hidden
        pt-[calc(.85rem+env(safe-area-inset-top,0px))] pb-[.85rem]
        transition-[padding,background-color,box-shadow,border-color] duration-[450ms] ease-brand
        [&.is-stuck]:border-b-line [&.is-stuck]:bg-nav
        [&.is-stuck]:pt-[calc(.5rem+env(safe-area-inset-top,0px))] [&.is-stuck]:pb-2
        [&.is-stuck]:shadow-[0_10px_34px_-22px_rgb(10_15_31/.5)] [&.is-stuck]:backdrop-blur-[14px]"
      id="nav"
    >
      <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-4 px-gutter">
        <a
          className="group inline-flex min-w-0 items-center gap-[.7rem] font-display font-bold tracking-[-.02em]"
          href={sectionHref("home")}
          aria-label="Peerawut Nipakornpan — back to top"
        >
          {/* The mark is the portrait from the GitHub profile reduced to a
              bust and a pair of round glasses — see public/images/logo.svg,
              which carries the same two paths, as does favicon.svg. The
              lenses are holes rather than dots, so the gradient behind them
              is what fills them in. Decorative here: the link above already
              names itself. */}
          <span
            className="grid size-10 flex-none place-items-center rounded-[13px] bg-[image:var(--gradient-brand)]
              [background-size:200%_200%] text-white shadow-brand
              transition-[transform,translate,scale,rotate,background-position] duration-500 ease-spring
              group-hover:rotate-[-8deg] group-hover:scale-[1.07] group-hover:bg-right
              group-active:scale-95
              max-[780px]:size-9 max-[780px]:rounded-[12px]"
            aria-hidden="true"
          >
            <svg
              className="size-[86%]"
              viewBox="0 0 32 32"
              fill="currentColor"
              fillRule="evenodd"
              focusable="false"
            >
              <path d="M16 5.6a5.9 5.9 0 1 1 0 11.8 5.9 5.9 0 0 1 0-11.8Zm-2.65 3.9a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1Zm5.3 0a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1Zm-3.25 1.65h1.2v.8h-1.2Z" />
              <path d="M4.2 32c0-7.3 5.2-12.4 11.8-12.4S27.8 24.7 27.8 32Z" />
            </svg>
          </span>

          {/* The wordmark is what goes first when the bar narrows: the rail
              beside it is navigation, and this is decoration the mark
              already carries. */}
          <span className="flex min-w-0 flex-col leading-[1.15] max-[820px]:hidden">
            <span className="truncate text-[.98rem]">Peerawut Nipakornpan</span>
            <span
              className="font-mono text-[.62rem] tracking-[.16em] uppercase text-ink-faint
                max-[1080px]:hidden"
            >
              Junior Full-Stack Developer
            </span>
          </span>
        </a>

        <nav
          className="relative flex items-center gap-[.15rem] rounded-full border border-line bg-glass
            p-[.3rem] shadow-xs max-[560px]:hidden"
          id="navLinks"
          aria-label="Section navigation"
        >
          {/* main.js writes width and transform onto this from the
              measured position of the active link, so the only thing
              declared here is how it moves between them. */}
          <span
            className="absolute top-[.3rem] left-0 h-[calc(100%-.6rem)] rounded-full opacity-0
              bg-[image:var(--gradient-brand)]
              shadow-[0_8px_22px_-8px_color-mix(in_srgb,var(--brand-1)_80%,transparent)]
              [&.is-ready]:transition-[transform,translate,scale,rotate,width,opacity]
              [&.is-ready]:duration-[520ms] [&.is-ready]:ease-spring
              [will-change:transform,width]"
            id="navPill"
            aria-hidden="true"
          />
          {SECTIONS.map((section) => (
            <a
              className="nav__link relative z-[1] rounded-full px-[1.05rem] py-2 text-[.88rem] font-medium
                whitespace-nowrap text-ink-muted transition-colors duration-[350ms] ease-brand hover:text-ink
                [&.is-active]:font-semibold [&.is-active]:text-white
                max-[1080px]:px-[.8rem] max-[1080px]:text-[.84rem]
                max-[880px]:px-[.6rem] max-[880px]:text-[.8rem]"
              href={sectionHref(section.id)}
              key={section.id}
              data-section={section.id}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <button
          className="theme-toggle grid size-[42px] flex-none place-items-center rounded-[14px] border
            border-line bg-glass text-ink-soft shadow-xs
            transition-[transform,translate,scale,rotate,color,border-color,background-color] duration-[400ms] ease-spring
            hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-1)_40%,var(--line))]
            hover:text-brand-1 active:scale-95
            max-[780px]:size-10 max-[780px]:rounded-[12px]"
          id="themeToggle"
          type="button"
          aria-label="Switch colour theme"
        >
          <span className="relative grid size-[19px] place-items-center">
            <svg
              className="absolute size-[19px] rotate-0 scale-100 opacity-100
                transition-[opacity,transform,translate,scale,rotate] duration-[400ms] ease-spring
                dark:rotate-[70deg] dark:scale-[.4] dark:opacity-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href="#i-sun" />
            </svg>
            <svg
              className="absolute size-[19px] rotate-[-70deg] scale-[.4] opacity-0
                transition-[opacity,transform,translate,scale,rotate] duration-[400ms] ease-spring
                dark:rotate-0 dark:scale-100 dark:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href="#i-moon" />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
}
