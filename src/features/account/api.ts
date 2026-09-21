import { GITHUB_LOGIN } from '@/constants/content';
import { getJson } from '@/lib/api-client';
import type { GitHubUser, GitHubUserResult } from './types';

/**
 * The one place this feature reaches the network (R5).
 *
 * Both profile routes go through it — the document's `/user` and the app's
 * `/m/user` — so the two cannot end up reading the same account in different
 * ways, which is the whole reason the call does not live in either of them.
 */

/** A day. Unauthenticated GitHub requests are rate limited per IP, so the
 *  profile is read once per build window rather than once per visit. */
const REVALIDATE_SECONDS = 86_400;

export async function loadUser(): Promise<GitHubUserResult> {
  const { data, error } = await getJson<GitHubUser>(
    `https://api.github.com/users/${GITHUB_LOGIN}`,
    {
      revalidate: REVALIDATE_SECONDS,
      headers: { Accept: 'application/vnd.github+json' },
    },
  );

  // Re-worded here rather than in the client: "GitHub replied 403" names the
  // service the visitor would have to go and check.
  if (!data) return { user: null, error: error.replace('the server', 'GitHub') };

  return { user: data, error: null };
}
