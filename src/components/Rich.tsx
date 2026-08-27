import { Fragment } from "react";

import type { RichText } from "@/lib/content";

/**
 * Renders a sentence that carries emphasis.
 *
 * The copy in `lib/content.ts` is shared by the desktop document and the
 * phone app, so it cannot contain markup — the two style a lifted word
 * differently. It carries the fragments instead, and this turns them back
 * into elements using whichever classes the caller passes.
 *
 * Both slots default to nothing, which renders the emphasis as a plain
 * `<strong>` / `<mark>`.
 */
export function Rich({
  parts,
  strongClass = "",
  markClass = "",
}: {
  parts: RichText;
  strongClass?: string;
  markClass?: string;
}) {
  return (
    <>
      {parts.map((part, index) => {
        // Text children of an array need a key of their own, and a string
        // cannot carry one.
        if (typeof part === "string") return <Fragment key={index}>{part}</Fragment>;

        return "strong" in part ? (
          <strong className={strongClass} key={index}>
            {part.strong}
          </strong>
        ) : (
          <mark className={markClass} key={index}>
            {part.mark}
          </mark>
        );
      })}
    </>
  );
}
