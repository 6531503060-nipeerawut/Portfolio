import type { Metadata } from "next";
import type { CSSProperties } from "react";

/**
 * What the browser tab shows. Short on purpose: a tab is a handful of
 * characters wide, and the full name and role are already the first thing
 * on the page itself.
 */
export const TAB_TITLE = "PN · Portfolio";

/**
 * What a shared link shows. This one has room to be descriptive — it is
 * read on a card in someone else's feed, with no page around it to supply
 * the context a tab title can take for granted.
 */
export const TITLE = "Peerawut Nipakornpan — Junior Full-Stack Developer";

export const DESCRIPTION =
  "Peerawut Nipakornpan is a junior full-stack developer at Gendee.ai working across Angular, Ionic, Deno edge functions and PostgreSQL — shipping course, billing, notification and B2B systems into production.";

export const SHARE_DESCRIPTION =
  "Junior full-stack developer at Gendee.ai. I design the schema, write the API, and build the screens that use them.";

export const AUTHOR = "Peerawut Nipakornpan";

/**
 * Absolute origin used to resolve Open Graph and canonical URLs.
 *
 * Reading it from the request would make every route dynamic and uncacheable
 * for the sake of three meta tags, so it is resolved once at build time
 * instead. Vercel exports the production domain during the build; set
 * NEXT_PUBLIC_SITE_URL to override it (a custom domain, or another host).
 */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

// The resume lives in /public; keeping the path in one place means the file
// can be renamed without hunting through the markup. The <a download> tags
// carry no filename of their own, so this basename is also what lands in
// the visitor's downloads folder.
export const RESUME_HREF = "/Resume_PeerawutNi.pdf";

export const PROFILE_IMAGE = "/images/portrait.jpg";
export const PROFILE_IMAGE_ALT = "Portrait of Peerawut Nipakornpan";

/**
 * The share card, shared by the layout (site-wide default) and the home page
 * (which adds its own og:url).
 *
 * It has to be spread in whole rather than extended: Next replaces the
 * openGraph object outright when a route declares one, so a page that set only
 * `url` would drop the image and the type along with it.
 */
export const OPEN_GRAPH = {
  type: "website",
  title: TITLE,
  description: SHARE_DESCRIPTION,
  images: [{ url: PROFILE_IMAGE, alt: PROFILE_IMAGE_ALT }],
} satisfies Metadata["openGraph"];

/**
 * Twitter reads the og:* block when these are absent, but Next fills the gap
 * itself from the *page* description — the long one written for search results
 * rather than for a card — so they are stated outright.
 */
export const TWITTER = {
  card: "summary_large_image",
  title: TITLE,
  description: SHARE_DESCRIPTION,
  images: [{ url: PROFILE_IMAGE, alt: PROFILE_IMAGE_ALT }],
} satisfies Metadata["twitter"];

/**
 * The stylesheet drives stagger delays, drawer indices and per-item brand
 * tints from custom properties set on the element. React writes `--*` keys
 * through untouched; the cast exists only because CSSProperties has no index
 * signature for them.
 */
export function cssVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

/** Stagger delay for the nth item of a list, as the `--d` custom property. */
export function stagger(index: number, step: number): CSSProperties {
  return cssVars({ "--d": `${index * step}ms` });
}
