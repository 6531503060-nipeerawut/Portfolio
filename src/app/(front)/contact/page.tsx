import type { Metadata } from "next";

import { Contact } from "@/components/front/Contact";
import { OPEN_GRAPH, SHARE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: SHARE_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { ...OPEN_GRAPH, url: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-[clamp(5rem,10vh,7rem)]">
      <Contact />
    </div>
  );
}
