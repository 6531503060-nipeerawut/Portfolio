import { APP_ROOT } from '@/constants/navigation';
import { TO_APP, TO_WEB } from '@/constants/routes';

/**
 * Which build a request should be answered with, as a pure function.
 *
 * The decision itself is here rather than in `proxy.ts` so that it can be run
 * without a request object: `npm run check:proxy` puts a table of paths and
 * device answers through it on every `npm run check`, which is the only way a
 * routing rule that is wrong in one direction gets caught. A proxy that sends
 * a phone to the desktop copy of exactly one page fails silently forever
 * otherwise — nothing errors, the wrong page simply renders.
 */

/**
 * A trailing slash would otherwise miss both tables and fall through to
 * whichever build the URL happens to name. Next normalises it a step later, so
 * this only has to hold until then — but "later" is not a thing to depend on
 * when the cost of being wrong is serving the wrong site.
 */
export function normalisePath(pathname: string): string {
  return pathname.replace(/(.)\/+$/, '$1');
}

/** True when the path is the app root or something underneath it. */
export function isAppPath(pathname: string): boolean {
  return pathname === APP_ROOT || pathname.startsWith(`${APP_ROOT}/`);
}

/**
 * Where this request should end up, or `null` when it is already in the right
 * place. `pathname` is taken raw; normalising it is part of the decision.
 */
export function resolveDeviceTarget(pathname: string, isPhone: boolean): string | null {
  const path = normalisePath(pathname);
  const onApp = isAppPath(path);

  if (isPhone) return onApp ? null : (TO_APP[path] ?? null);
  return onApp ? (TO_WEB[path] ?? null) : null;
}
