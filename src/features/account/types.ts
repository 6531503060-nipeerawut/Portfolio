/**
 * The shape of a GitHub account as this feature consumes it.
 *
 * Every field is the subset actually rendered — the API returns far more, and
 * narrowing here is what stops the rest of it leaking into the UI.
 *
 * It used to be an ambient global (`src/types/user.d.ts`). Declaring it here
 * instead means the two screens have to say where the contract comes from, and
 * the name `User` can no longer be shadowed by, or mistaken for, something the
 * DOM already defines.
 */
export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

/**
 * What the API layer hands a screen.
 *
 * `error` carries the reason the profile could not be read, so the component
 * can say so instead of rendering an empty card.
 */
export type GitHubUserResult = { user: GitHubUser; error: null } | { user: null; error: string };
