/**
 * The shape of a GitHub account as the /user route consumes it.
 *
 * Declared globally rather than exported: it describes an external payload
 * that several files read, and an ambient type keeps them from importing a
 * contract none of them owns. Every field is the subset actually rendered —
 * the API returns far more, and narrowing here is what stops the rest of it
 * leaking into the UI.
 */
declare global {
  interface User {
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
  }

  /**
   * What the page hands the view. `error` carries the reason the profile
   * could not be read, so the component can say so instead of rendering an
   * empty card.
   */
  type UserResult = { user: User; error: null } | { user: null; error: string };
}

export {};
