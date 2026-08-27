import { GITHUB_LOGIN } from "@/lib/content";

/**
 * Read the profile from the GitHub API.
 *
 * Unauthenticated requests are rate limited per IP, so this is cached with
 * the route's own daily revalidation rather than fetched per visit, and a
 * failure returns a reason instead of throwing: a rate-limited API should
 * not take the page down with it.
 *
 * Shared by both profile routes — the desktop page and the app screen show
 * the same account and must not be able to disagree about how it is read.
 */
export async function loadUser(): Promise<UserResult> {
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
