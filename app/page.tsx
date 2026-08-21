import type { Metadata } from "next";

import { About } from "@/app/_components/about";
import { Ambient } from "@/app/_components/ambient";
import { Contact } from "@/app/_components/contact";
import { Experience } from "@/app/_components/experience";
import { Hero } from "@/app/_components/hero";
import { IconSprite } from "@/app/_components/icon-sprite";
import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { Skills } from "@/app/_components/skills";
import { Work } from "@/app/_components/work";
import { OPEN_GRAPH } from "@/app/_lib/site";

// Title, description, icons and the share card are inherited from the root
// layout. Only the two tags that name *this* route belong here — the layout
// has no pathname, so declaring them there would have every other route claim
// to be the home page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...OPEN_GRAPH, url: "/" },
};

/*
 * Prerendered, then rebuilt daily.
 *
 * The page has no per-visitor content, so it should be a static file a CDN can
 * hold. The one value that goes stale is the copyright year, and a deployment
 * can easily outlive the year it was built in — a daily revalidation refreshes
 * it without giving up the cache. Rendering per request, which is what reading
 * the year used to cost, made every visit uncacheable for the sake of four
 * digits.
 */
export const revalidate = 86400;

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <Ambient />
      <IconSprite />
      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Contact />
      </main>

      <SiteFooter year={year} />
    </>
  );
}
