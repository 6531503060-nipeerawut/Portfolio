import { SECTIONS, drawerNumber } from "@/lib/sections";
import { cssVars } from "@/lib/site";

/**
 * Fixed navbar, sliding pill, theme switch and the mobile drawer.
 *
 * The bare class names — `nav`, `nav__link`, `is-stuck`, `is-active`,
 * `drawer`, `is-open`, `theme-toggle` — carry no styling of their own.
 * They are the selectors main.js queries and the state classes it toggles;
 * the appearance of each state is expressed here as a Tailwind variant on
 * the element that owns it.
 *
 * Every link here is a plain anchor rather than next/link. These all point
 * at a section of the page already on screen, and main.js owns that move:
 * it calls preventDefault, scrolls smoothly, shifts focus to the heading
 * and rewrites the hash. Routing them through the client router instead
 * would hand the same click to two systems and cost a re-render to arrive
 * where the scroll was already going.
 */
export function Navbar() {
  return (
    <>
      <header
        className="nav fixed inset-x-0 top-0 z-[1100] border-b border-transparent py-[.85rem] print:hidden
          transition-[padding,background-color,box-shadow,border-color] duration-[450ms] ease-brand
          [&.is-stuck]:border-b-line [&.is-stuck]:bg-glass [&.is-stuck]:py-2
          [&.is-stuck]:shadow-[0_10px_34px_-22px_rgb(10_15_31/.45)] [&.is-stuck]:backdrop-blur-[12px]"
        id="nav"
      >
        <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-4 px-gutter">
          <a
            className="group inline-flex items-center gap-[.7rem] font-display font-bold tracking-[-.02em]"
            href="/#home"
            aria-label="Peerawut Nipakornpan — back to top"
          >
            {/* The mark is one unbroken line — see public/images/logo.svg,
                which carries the same path, as does favicon.svg. It is
                decorative here: the link above already names itself. */}
            <span
              className="grid size-10 place-items-center rounded-[13px] bg-[image:var(--gradient-brand)]
                [background-size:200%_200%] text-white shadow-brand
                transition-[transform,translate,scale,rotate,background-position] duration-500 ease-spring
                group-hover:rotate-[-8deg] group-hover:scale-[1.07] group-hover:bg-right
                max-[640px]:size-11 max-[640px]:rounded-[14px]
                touch-narrow:size-11 touch-narrow:rounded-[14px]"
              aria-hidden="true"
            >
              <svg
                className="size-[72%]"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                focusable="false"
              >
                <path d="M5.9 26.3C5.9 21.2 8.4 15.6 11.8 13.97A5.2 5.2 0 1 1 20.2 13.97C23.6 15.6 26.1 21.2 26.1 26.3" />
              </svg>
            </span>

            <span className="flex flex-col leading-[1.15] max-[980px]:hidden">
              <span className="text-[.98rem]">Peerawut Nipakornpan</span>
              <span className="font-mono text-[.62rem] tracking-[.16em] uppercase text-ink-faint">
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
                transition-[transform,translate,scale,rotate,width,opacity] duration-500 ease-brand
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
                href={section.href}
                key={section.id}
                data-section={section.id}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-[.6rem]">
            <button
              className="theme-toggle grid size-[42px] place-items-center rounded-[14px] border border-line
                bg-glass text-ink-soft shadow-xs
                transition-[transform,translate,scale,rotate,color,border-color,background-color] duration-[400ms] ease-spring
                hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-1)_40%,var(--line))]
                hover:text-brand-1"
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

            <button
              className="group relative hidden size-[42px] rounded-[14px] border border-line bg-glass
                shadow-xs touch:size-11 max-[980px]:block"
              id="burger"
              type="button"
              aria-expanded="false"
              aria-controls="drawer"
              aria-label="Open menu"
            >
              <span
                className="absolute top-[15px] left-1/2 -ml-[8.5px] h-[1.8px] w-[17px] rounded-sm bg-ink
                  transition-[transform,translate,scale,rotate,opacity,width] duration-[450ms] ease-spring
                  group-aria-expanded:translate-y-[5.2px] group-aria-expanded:rotate-45"
              />
              <span
                className="absolute top-[20.2px] left-1/2 -ml-[8.5px] h-[1.8px] w-[12px] rounded-sm bg-ink
                  transition-[transform,translate,scale,rotate,opacity,width] duration-[450ms] ease-spring
                  group-aria-expanded:scale-x-0 group-aria-expanded:opacity-0"
              />
              <span
                className="absolute top-[25.4px] left-1/2 -ml-[8.5px] h-[1.8px] w-[17px] rounded-sm bg-ink
                  transition-[transform,translate,scale,rotate,opacity,width] duration-[450ms] ease-spring
                  group-aria-expanded:-translate-y-[5.2px] group-aria-expanded:-rotate-45"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Invisible rather than removed: main.js animates the opacity and
          then flips visibility a beat later, which is what lets the links
          stagger in and still be untabbable while the overlay is closed. */}
      <div
        className="drawer group invisible fixed inset-0 z-[1090] grid items-center justify-items-stretch print:hidden
          px-gutter pt-20 pb-8 opacity-0 backdrop-blur-[16px]
          bg-[color-mix(in_srgb,var(--bg)_88%,transparent)]
          transition-[opacity,visibility] duration-[450ms] ease-brand [transition-delay:0s,450ms]
          [&.is-open]:visible [&.is-open]:opacity-100 [&.is-open]:[transition-delay:0s,0s]"
        id="drawer"
        aria-hidden="true"
      >
        <nav
          className="mx-auto flex w-[min(420px,100%)] flex-col gap-[.35rem]"
          aria-label="Mobile navigation"
        >
          {SECTIONS.map((section, index) => (
            <a
              className="drawer__link flex translate-y-[18px] items-baseline gap-4 rounded-brand border
                border-transparent px-5 py-4 font-display text-[1.6rem] font-bold tracking-[-.03em]
                max-[640px]:px-4 max-[640px]:py-[.85rem] max-[640px]:text-[1.35rem]
                text-ink opacity-0
                transition-[transform,translate,scale,rotate,opacity,background-color,border-color,color] duration-500 ease-brand
                hover:border-line hover:bg-glass hover:text-brand-1
                [&.is-active]:border-line [&.is-active]:bg-glass [&.is-active]:text-brand-1
                group-[.is-open]:translate-y-0 group-[.is-open]:opacity-100
                group-[.is-open]:[transition-delay:calc(90ms+var(--i)*65ms)]"
              href={section.href}
              key={section.id}
              data-section={section.id}
              style={cssVars({ "--i": String(index) })}
            >
              <span className="font-mono text-[.78rem] font-medium text-ink-faint">
                {drawerNumber(index)}
              </span>
              <span>
                {section.label}
                <span className="mt-[.15rem] block font-body text-[.82rem] font-normal tracking-normal text-ink-muted">
                  {section.blurb}
                </span>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
