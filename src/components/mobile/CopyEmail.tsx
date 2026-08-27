"use client";

import { useEffect, useRef, useState } from "react";

import { EMAIL } from "@/lib/content";
import { APP_BTN_PRIMARY, APP_PANEL } from "@/lib/mobile";

type State = "idle" | "copied" | "failed";

/**
 * The address, and a button the width of the screen to take a copy of it.
 *
 * The desktop version is a pill with the button tucked inside it, which is
 * a shape that only works when there is room to the right of a 24-character
 * address. There is not, so here the two are stacked and the button gets
 * the full width — the one control on the screen most likely to be pressed
 * should not be the smallest thing on it.
 */
export function CopyEmail() {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A press while the last one is still showing would otherwise be cleared
  // by the older timer.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function settle(next: State) {
    if (timer.current) clearTimeout(timer.current);
    setState(next);
    timer.current = setTimeout(() => {
      timer.current = null;
      setState("idle");
    }, 2200);
  }

  async function copy() {
    /* `navigator.clipboard` is undefined outside a secure context, and its
       promise rejects when the page is not the active document. Neither is
       worth an unhandled rejection: the address is on screen either way,
       and the label says so. */
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("unavailable");
      await navigator.clipboard.writeText(EMAIL);
      settle("copied");
    } catch {
      settle("failed");
    }
  }

  return (
    <div className={APP_PANEL}>
      <span className="mb-[.7rem] flex items-center gap-[.5rem] font-mono text-[.66rem] tracking-[.16em] uppercase text-ink-faint">
        <svg
          className="size-[15px] text-brand-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <use href="#i-mail" />
        </svg>
        Email
      </span>

      {/* Selectable, so a visitor whose clipboard is blocked can still take
          the address by hand. */}
      <p className="mb-[1rem] font-mono text-[clamp(.88rem,4.2vw,1.02rem)] break-all text-ink select-all">
        {EMAIL}
      </p>

      <button className={APP_BTN_PRIMARY} type="button" onClick={copy}>
        {state === "copied" ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <use href="#i-check" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <use href="#i-copy" />
          </svg>
        )}
        {state === "copied" ? "Copied" : state === "failed" ? "Copy it by hand" : "Copy address"}
      </button>

      {/* Announced rather than only coloured, and it is the same element in
          every state so a screen reader is not told the button vanished. */}
      <p className="mt-[.6rem] min-h-[1.1rem] text-center text-[.76rem] text-ink-faint" role="status">
        {state === "copied"
          ? "Address copied to the clipboard."
          : state === "failed"
            ? "The clipboard is unavailable here — tap and hold the address above."
            : ""}
      </p>
    </div>
  );
}
