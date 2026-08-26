import Link from "next/link";

import { BTN_PRIMARY, GRAD, H1 } from "@/lib/styles";

/**
 * Rendered by the root layout, so it has none of the front-end chrome and
 * cannot point `<use>` at the icon sprite. The arrow is inlined instead.
 */
export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center bg-canvas px-gutter text-center">
      <div>
        <span
          className="font-mono text-[.74rem] tracking-[.14em] uppercase text-ink-faint"
        >
          Error 404
        </span>
        <h1 className={`${H1} mt-3`}>
          This page <span className={GRAD}>does not exist</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-[34rem] text-ink-muted">
          The link may be out of date, or the address mistyped. Everything on the site is reachable from the
          home page.
        </p>
        <Link className={`${BTN_PRIMARY} mt-8`} href="/">
          Back to the home page
          <svg className="arr-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
