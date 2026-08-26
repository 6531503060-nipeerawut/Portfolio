import type { Metadata } from "next";

import { Contact } from "@/components/front/Contact";
import { OPEN_GRAPH, SHARE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: SHARE_DESCRIPTION,
  alternates: { canonical: "/contact" },
  // These two sections are also on the home page, which is where the nav
  // points and where visitors actually read them. The route stays for a
  // direct link, but it should not compete with the home page in search.
  robots: { index: false, follow: true },
  openGraph: { ...OPEN_GRAPH, url: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-[clamp(5rem,10vh,7rem)]">
      <Contact />
    </div>
  );
}
