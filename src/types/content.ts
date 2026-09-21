/**
 * The shapes the site's copy is written in.
 *
 * Both front ends read the same entries from `constants/content.ts` and render
 * them differently, so the contract between the words and the two sets of
 * components is declared here rather than inside either of them. Nothing in
 * this file imports React or names a Tailwind class.
 *
 * `icon` and `logo` values are sprite ids from `components/ui/IconSprite`,
 * without the leading `#`. `tint` values are CSS colours, usually a brand
 * token.
 */

/* ── Emphasis inside a sentence ───────────────────────────────────── */

/**
 * A paragraph that needs a word or two lifted out of it.
 *
 * Plain strings are text; the two wrappers mark the fragments that carry
 * emphasis. `components/ui/Rich.tsx` turns the parts back into elements, so
 * the same sentence can be a `<strong>` on the desktop and something flatter
 * on a phone without the copy being written twice.
 */
export type RichPart = string | { readonly strong: string } | { readonly mark: string };
export type RichText = readonly RichPart[];

/* ── Section headings ─────────────────────────────────────────────── */

/**
 * The statement above each section, split around the words that carry the
 * brand gradient: `before` + accent + `after`.
 */
export type Heading = {
  readonly before: string;
  readonly accent: string;
  readonly after: string;
  readonly blurb: string;
};

/* ── Skills ───────────────────────────────────────────────────────── */

export type SkillItem = {
  readonly name: string;
  readonly href: string;
  /** Sprite id of the vendor logo. */
  readonly logo: string;
  /** Vendor colour used on the light palette. */
  readonly brand: string;
  /** The same colour lifted for contrast on the dark palette. */
  readonly brandOnDark: string;
};

export type SkillGroup = {
  readonly title: string;
  readonly meta: string;
  /** Brand token the card tints itself with. */
  readonly tint: string;
  readonly icon: string;
  readonly items: readonly SkillItem[];
};

/* ── Experience ───────────────────────────────────────────────────── */

export type Role = {
  readonly title: string;
  readonly org: string;
  readonly orgIcon: string;
  /** One pill each. The internship carries a label as well as its dates. */
  readonly when: readonly string[];
  /** Only the current role breathes, on both platforms. */
  readonly current: boolean;
  readonly summary: RichText;
  readonly highlights: readonly string[];
  readonly tags: readonly string[];
};

/* ── Work ─────────────────────────────────────────────────────────── */

export type Project = {
  readonly title: string;
  /** Organisation and category line under the title. */
  readonly org: string;
  readonly blurb: string;
  readonly tags: readonly string[];
  readonly icon: string;
  /** Cycled so no two neighbours share one. */
  readonly tint: string;
  /**
   * Corner badge. Given a `href` it renders as a link out; otherwise it is a
   * plain label.
   */
  readonly badge: { readonly text: string; readonly href?: string; readonly ariaLabel?: string };
};

/* ── Contact ──────────────────────────────────────────────────────── */

export type Channel = {
  readonly label: string;
  readonly handle: string;
  readonly href: string;
  readonly icon: string;
  readonly tint: string;
  /** The résumé is a file, not a destination — it needs the other arrow. */
  readonly download?: boolean;
};
