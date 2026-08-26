import type { Metadata } from "next";

import { About } from "@/components/front/About";
import { OPEN_GRAPH, SHARE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: SHARE_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { ...OPEN_GRAPH, url: "/about" },
};

export default function AboutPage() {
  // pt-* clears the fixed navbar, which no longer has a full-height hero
  // sitting under it on this route.
  return (
    <div className="pt-[clamp(5rem,10vh,7rem)]">
      <About />
    </div>
  );
}
