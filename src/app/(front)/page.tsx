import type { Metadata } from "next";

import { Experience } from "@/components/front/Experience";
import { Hero } from "@/components/front/Hero";
import { Skills } from "@/components/front/Skills";
import { Work } from "@/components/front/Work";
import { OPEN_GRAPH } from "@/lib/site";

// Title, description, icons and the share card are inherited from the root
// layout. Only the two tags that name *this* route belong here — the layout
// has no pathname, so declaring them there would have every other route
// claim to be the home page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...OPEN_GRAPH, url: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Work />
    </>
  );
}
