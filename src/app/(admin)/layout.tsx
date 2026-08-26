import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { SHELL } from "@/lib/styles";

/**
 * Admin chrome.
 *
 * Deliberately not the public navbar: this side of the site has a different
 * job, and sharing the marketing header would invite the two to drift into
 * each other. It is also kept out of search results — an admin surface has
 * no reason to be indexed.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-canvas-deep">
      <header className="border-b border-line bg-glass">
        <div className={`${SHELL} flex items-center justify-between gap-4 py-4`}>
          <Link className="inline-flex items-center gap-3" href="/admin">
            <span
              className="grid size-9 place-items-center rounded-[11px] bg-[image:var(--gradient-brand)] text-white"
              aria-hidden="true"
            >
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"
                className="size-[72%]" focusable="false">
                <path d="M5.9 26.3C5.9 21.2 8.4 15.6 11.8 13.97A5.2 5.2 0 1 1 20.2 13.97C23.6 15.6 26.1 21.2 26.1 26.3" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[.95rem] font-bold tracking-[-.02em] text-ink">Admin</span>
              <span className="font-mono text-[.6rem] tracking-[.16em] uppercase text-ink-faint">
                Portfolio console
              </span>
            </span>
          </Link>

          <Link
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2
              font-display text-[.82rem] font-semibold text-ink-soft transition-colors duration-300
              ease-brand hover:text-brand-1"
            href="/"
          >
            View the site
          </Link>
        </div>
      </header>

      <main className={`${SHELL} py-10`}>{children}</main>
    </div>
  );
}
