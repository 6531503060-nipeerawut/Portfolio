import { SECTIONS, sectionHref } from "@/lib/sections";

/**
 * Site navigation: a fixed bar at the top on every width, plus — below
 * 981px — a floating tab bar along the bottom instead of the desktop rail.
 *
 * The tab bar replaced a burger and a full-screen drawer. On a phone the
 * drawer cost two taps to reach any section and covered the page while it
 * was open, so nothing you were navigating away from stayed visible. A tab
 * bar is one tap, never covers content, sits where a thumb already rests,
 * and is the pattern every native app on the device already uses.
 *
 * The bare class names — `nav`, `nav__link`, `tab__link`, `is-stuck`,
 * `is-active` — carry no styling of their own. They are the selectors
 * main.js queries and the state classes it toggles; the appearance of each
 * state is expressed here as a Tailwind variant on the element that owns it.
 *
 * Both rails render the same six sections and both are driven by the same
 * scroll spy, which slides a pill under whichever entry is current. The
 * geometry of that pill is measured from the DOM in main.js — nothing here
 * declares a position for it, only how it travels between them.
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
    <>
      {/* Transparent over the hero on a desktop, where the bar only earns a
          ground once the page has moved under it; solid from the first pixel
          below 981px, where there is no room to float a bar over anything and
          every section passes beneath it.

          No backdrop blur on that mobile ground: at 97% opaque it has nothing
          left to blur, and a full-width blurred layer under a page that is
          being flicked is the most expensive thing on the screen. The tab bar
          keeps its own — it is a tenth of the area and it is what makes the
          bar read as floating above the page rather than welded to it. */}
      <header
        className="nav fixed inset-x-0 top-0 z-[1100] border-b border-transparent print:hidden
          pt-[calc(.85rem+env(safe-area-inset-top,0px))] pb-[.85rem]
          transition-[padding,background-color,box-shadow,border-color] duration-[450ms] ease-brand
          [&.is-stuck]:border-b-line [&.is-stuck]:bg-nav
          [&.is-stuck]:pt-[calc(.5rem+env(safe-area-inset-top,0px))] [&.is-stuck]:pb-2
          [&.is-stuck]:shadow-[0_10px_34px_-22px_rgb(10_15_31/.5)] [&.is-stuck]:backdrop-blur-[14px]
          max-[980px]:border-b-line max-[980px]:bg-nav
          max-[980px]:pt-[calc(.6rem+env(safe-area-inset-top,0px))] max-[980px]:pb-[.6rem]
          max-[980px]:[&.is-stuck]:pt-[calc(.6rem+env(safe-area-inset-top,0px))]
          max-[980px]:[&.is-stuck]:pb-[.6rem]"
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
                max-[980px]:size-[38px] max-[980px]:rounded-[12px]"
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

            {/* The role line is what goes when the bar narrows: on a phone the
                tab bar already says what the site is about, and a second line
                of 10px type under the name only crowds it. */}
            <span className="flex min-w-0 flex-col leading-[1.15]">
              <span className="truncate text-[.98rem] max-[980px]:text-[.92rem]">
                Peerawut Nipakornpan
              </span>
              <span
                className="font-mono text-[.62rem] tracking-[.16em] uppercase text-ink-faint
                  max-[980px]:hidden"
              >
                Junior Full-Stack Developer
              </span>
            </span>
          </a>

          <nav
            className="relative flex items-center gap-[.15rem] rounded-full border border-line bg-glass
              p-[.3rem] shadow-xs max-[980px]:hidden"
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
                  text-ink-muted transition-colors duration-[350ms] ease-brand hover:text-ink
                  [&.is-active]:font-semibold [&.is-active]:text-white
                  max-[1080px]:px-[.8rem] max-[1080px]:text-[.84rem]"
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
              max-[980px]:size-10 max-[980px]:rounded-[12px]"
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

      {/* Shown by the same query that hides the desktop rail, not by its
          complement: two breakpoints written a pixel apart are two chances to
          get the boundary wrong, and at the wrong width both bars appear.

          Floating rather than edge to edge, and clear of the home indicator.
          --tabbar-* live in globals.css because three other things depend on
          this geometry: the room the page reserves at its foot, where the
          back-to-top button sits, and where toasts stack. */}
      <nav
        className="tabbar fixed inset-x-[var(--tabbar-x)] bottom-[var(--tabbar-gap)] z-[1100] print:hidden
          hidden h-[var(--tabbar-h)] grid-cols-6 items-center gap-[2px] px-[6px]
          rounded-[22px] border border-line bg-nav shadow-lg [isolation:isolate]
          [backdrop-filter:blur(22px)_saturate(150%)]
          [-webkit-backdrop-filter:blur(22px)_saturate(150%)]
          max-[980px]:grid max-[350px]:gap-0 max-[350px]:px-[4px]"
        id="tabbar"
        aria-label="Section navigation"
      >
        {/* Measured and moved by main.js, exactly like the desktop pill. */}
        <span
          className="pointer-events-none absolute inset-y-[8px] left-0 -z-[1] rounded-[15px] opacity-0
            border border-[color-mix(in_srgb,var(--brand-1)_28%,transparent)]
            bg-[color-mix(in_srgb,var(--brand-1)_15%,transparent)]
            [&.is-ready]:transition-[transform,translate,scale,rotate,width,opacity]
            [&.is-ready]:duration-[420ms] [&.is-ready]:ease-spring
            [will-change:transform,width]"
          id="tabPill"
          aria-hidden="true"
        />
        {SECTIONS.map((section) => (
          <a
            className="tab__link relative flex min-w-0 flex-col items-center justify-center gap-[3px]
              rounded-[15px] py-[6px] font-display text-[9px] font-bold tracking-[-.01em]
              text-ink-faint [-webkit-tap-highlight-color:transparent]
              transition-[color,transform,translate,scale,rotate] duration-[220ms] ease-brand
              active:scale-[.92] [&.is-active]:text-brand-1
              [&_svg]:size-[19px] [&_svg]:transition-transform [&_svg]:duration-[280ms] [&_svg]:ease-spring
              [&.is-active_svg]:-translate-y-px [&.is-active_svg]:scale-110"
            href={sectionHref(section.id)}
            key={section.id}
            data-section={section.id}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href={`#${section.icon}`} />
            </svg>
            <span className="max-w-full truncate">{section.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
