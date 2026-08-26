import { ICON_BTN, SHELL } from "@/lib/styles";

export function Footer({ year }: { year: number }) {
  return (
    <>
      <footer className="relative border-t border-line bg-glass py-10">
        <div
          className={`${SHELL} flex flex-wrap items-center justify-between gap-4
            max-[640px]:flex-col max-[640px]:text-center`}
        >
          <p className="text-[.87rem] text-ink-muted">
            &copy; {year} Peerawut Nipakornpan. All rights reserved.
          </p>
          <p className="font-mono text-[.76rem] text-ink-faint">
            Designed &amp; built with <span className="text-brand-4">&#9829;</span> using Next.js
          </p>
        </div>
      </footer>

      {/* Invisible rather than removed, so the fade can run both ways;
          main.js adds .is-visible once the page has scrolled far enough. */}
      <button
        className={`${ICON_BTN} invisible fixed right-[clamp(1rem,3vw,1.75rem)] bottom-[clamp(1rem,3vw,1.75rem)] print:hidden
          z-[1000] size-[46px] translate-y-[14px] scale-[.85] rounded-full opacity-0
          transition-[opacity,transform,translate,scale,rotate,visibility] duration-[400ms] ease-spring [transition-delay:0s,0s,400ms]
          [&.is-visible]:visible [&.is-visible]:translate-y-0 [&.is-visible]:scale-100
          [&.is-visible]:opacity-100 [&.is-visible]:[transition-delay:0s,0s,0s]`}
        id="toTop"
        type="button"
        aria-label="Back to top"
      >
        <svg className="arr-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-arrow-up" /></svg>
      </button>

      {/* main.js appends toasts here; the classes each one needs are on the
          element it builds, in setupToasts. */}
      <div
        className="pointer-events-none fixed bottom-[clamp(1.25rem,4vw,2.25rem)] left-1/2 z-[1300]
          flex -translate-x-1/2 flex-col items-center gap-2"
        id="toastStack"
        role="status"
        aria-live="polite"
      />
    </>
  );
}
