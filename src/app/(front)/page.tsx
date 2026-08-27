import type { Metadata } from "next";

import { About } from "@/components/front/About";
import { Contact } from "@/components/front/Contact";
import { Experience } from "@/components/front/Experience";
import { Hero } from "@/components/front/Hero";
import { Skills } from "@/components/front/Skills";
import { Work } from "@/components/front/Work";
import { APP_MEDIA, APP_ROOT } from "@/lib/mobile";
import { OPEN_GRAPH } from "@/lib/site";

// Title, description, icons and the share card are inherited from the root
// layout. Only the tags that name *this* route belong here — the layout has
// no pathname, so declaring them there would have every other route claim
// to be the home page.
export const metadata: Metadata = {
  // This page is the indexed one; `media` names the phone screen that shows
  // the same content, which points its canonical back here.
  alternates: { canonical: "/", media: { [APP_MEDIA]: APP_ROOT } },
  openGraph: { ...OPEN_GRAPH, url: "/" },
};

/*
 * The whole site, in the order it reads.
 *
 * Each child owns the section id the nav points at, so this list is also
 * the scroll order: SECTIONS in src/lib/sections.ts names the same six
 * anchors and must stay in step with it.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
