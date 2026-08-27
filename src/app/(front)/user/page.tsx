import type { Metadata } from "next";

import { User } from "@/app/(front)/user/User";
import { loadUser } from "@/lib/github";
import { APP_MEDIA } from "@/lib/mobile";
import { EYEBROW, GRAD, H2, SECTION, SECTION_HEAD, SHELL } from "@/lib/styles";
import { OPEN_GRAPH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Profile",
  description: "The GitHub account behind the commits listed across this portfolio.",
  alternates: { canonical: "/user", media: { [APP_MEDIA]: "/m/user" } },
  // Reachable by anyone given the link, but not something to compete with
  // the home page in search results.
  robots: { index: false, follow: true },
  openGraph: { ...OPEN_GRAPH, url: "/user" },
};

export default async function UserPage() {
  const result = await loadUser();

  return (
    <div className="pt-[clamp(5rem,10vh,7rem)]">
      <section className={SECTION} id="user">
        <div className={SHELL}>
          <div className={`${SECTION_HEAD} mx-auto text-center`}>
            {/* Not a <SectionEyebrow>: those are numbered from the
                registry of home-page sections, and this route is not one
                of them. The counter would have nothing honest to print. */}
            <span className={EYEBROW}>
              <span className="text-brand-1">&#47;&#47;</span>
              {" GitHub"}
            </span>
            <h2 className={H2}>
              The account behind the <span className={GRAD}>commits</span>.
            </h2>
            <p>Read live from GitHub, so the counts here are whatever they are today.</p>
          </div>

          <div className="mx-auto max-w-[46rem]">
            <User {...result} />
          </div>
        </div>
      </section>
    </div>
  );
}
