import type { Metadata } from "next";

import { User } from "@/app/(front)/user/User";
import { EYEBROW, GRAD, H2, SECTION, SECTION_HEAD, SHELL } from "@/lib/styles";
import { OPEN_GRAPH } from "@/lib/site";

const GITHUB_LOGIN = "6531503060-nipeerawut";

export const metadata: Metadata = {
  title: "Profile",
  description: "The GitHub account behind the commits listed across this portfolio.",
  alternates: { canonical: "/user" },
  // Reachable by anyone given the link, but not something to compete with
  // the home page in search results.
  robots: { index: false, follow: true },
  openGraph: { ...OPEN_GRAPH, url: "/user" },
};

/**
 * Read the profile from the GitHub API.
 *
 * Unauthenticated requests are rate limited per IP, so this is cached with
 * the route's own daily revalidation rather than fetched per visit, and a
 * failure returns a reason instead of throwing: a rate-limited API should
 * not take the page down with it.
 */
async function loadUser(): Promise<UserResult> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_LOGIN}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return { user: null, error: `GitHub replied ${response.status}` };
    }

    return { user: (await response.json()) as User, error: null };
  } catch {
    return { user: null, error: "the request could not be completed" };
  }
}

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
