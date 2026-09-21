/**
 * The only module in this project allowed to speak HTTP (R3).
 *
 * There is one remote call on the whole site — the GitHub profile — which is
 * exactly why this file exists rather than that call being an inline `fetch`
 * in the feature that needs it. The policy around a request is not the
 * feature's business: how long a response may be cached, what counts as a
 * failure, and what a failure turns into are decisions that have to be the
 * same for the second caller as for the first, and a second caller always
 * arrives.
 *
 * ESLint enforces this. `fetch`, `window.fetch`, `globalThis.fetch` and
 * `XMLHttpRequest` are errors everywhere except in this file — see
 * eslint.config.mjs, which carries the exemption by path.
 *
 * Unlike the sibling front ends this is not axios: nothing here needs
 * interceptors, a base URL or a token, and a dependency that exists to hold
 * three lines of configuration is a dependency to explain later.
 */

/**
 * A request that is allowed to fail.
 *
 * Every caller has to look at `error` before reading `data`, which is the
 * point: this site renders on the server, and an exception from a third-party
 * API would otherwise take a whole route down with it.
 */
export type ApiResult<T> = { data: T; error: null } | { data: null; error: string };

export type ApiRequest = {
  /** Seconds the response may be reused for. Passed to Next's data cache. */
  revalidate: number;
  headers?: Record<string, string>;
};

/**
 * Reads JSON from an absolute URL.
 *
 * The status line is turned into a sentence rather than an Error because that
 * sentence is rendered: "GitHub replied 403" is what a visitor sees when the
 * unauthenticated rate limit has been reached, and it is more use to them than
 * a blank card.
 */
export async function getJson<T>(url: string, request: ApiRequest): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      headers: request.headers,
      next: { revalidate: request.revalidate },
    });

    if (!response.ok) {
      return { data: null, error: `the server replied ${response.status}` };
    }

    return { data: (await response.json()) as T, error: null };
  } catch {
    // Offline, DNS, TLS, a timeout — none of which the caller can tell apart
    // or act on differently, so they are one answer.
    return { data: null, error: 'the request could not be completed' };
  }
}
