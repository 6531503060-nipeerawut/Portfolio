import { ACCOUNT_APP_HREF, ACCOUNT_HREF, APP_ROOT } from '@/constants/navigation';

/**
 * The map between the two front ends.
 *
 * The site is two front ends, not one responsive front end: `/` and its
 * neighbours are a desktop document, `/m/*` is a phone app with one screen per
 * navigation entry. Neither can be reached by resizing the other, so something
 * has to decide which a visitor gets — that is `lib/device-route.ts`, and this
 * is the table it reads.
 *
 * ⚠️ Adding a route that exists on both sides means adding it here, in both
 *    directions, and to the `matcher` literal at the foot of `src/proxy.ts`.
 *    `npm run check:proxy` fails the build when the three disagree, because
 *    the failure is otherwise silent: a phone simply lands on the desktop
 *    copy of that one page and nothing says so.
 *
 * 📌 The matcher cannot be imported from here. Next reads `config.matcher` by
 *    parsing the middleware file at build time, so it has to be a literal
 *    array sitting in `proxy.ts` — hence the check rather than one constant.
 */

/** Desktop path → the screen that carries the same content. */
export const TO_APP: Record<string, string> = {
  '/': APP_ROOT,
  '/about': `${APP_ROOT}/about`,
  '/contact': `${APP_ROOT}/contact`,
  [ACCOUNT_HREF]: ACCOUNT_APP_HREF,
};

/**
 * And back the other way.
 *
 * The four screens with no desktop route of their own land on their section of
 * the single page, which is where that content lives over there.
 */
export const TO_WEB: Record<string, string> = {
  [APP_ROOT]: '/',
  [`${APP_ROOT}/about`]: '/about',
  [`${APP_ROOT}/skills`]: '/#skills',
  [`${APP_ROOT}/experience`]: '/#experience',
  [`${APP_ROOT}/work`]: '/#work',
  [`${APP_ROOT}/contact`]: '/contact',
  [ACCOUNT_APP_HREF]: ACCOUNT_HREF,
};
