import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Sends every request to the build made for the device asking.
 *
 * The site is two front ends, not one responsive front end: `/` and its
 * neighbours are a desktop document, `/m/*` is a phone app with one screen
 * per navigation entry. Neither can be reached by resizing the other, so
 * something has to decide, and it has to decide before anything renders —
 * a client-side redirect would paint the wrong site first and cost a second
 * load to leave it.
 *
 * This file is the only thing that decides. There is deliberately no switch
 * anywhere in the interface: an escape hatch turns an answer the visitor
 * never had to think about into a question, and puts it on the one screen
 * size where the other layout is the wrong one. A phone gets the app; a
 * desktop gets the document; nothing asks.
 */

const APP_ROOT = "/m";

/**
 * Desktop path to the screen that carries the same content.
 *
 * Only the four routes that exist on both sides are listed. Everything else
 * — the console, the résumé, the assets — is shared and left alone.
 */
const TO_APP: Record<string, string> = {
  "/": "/m",
  "/about": "/m/about",
  "/contact": "/m/contact",
  "/user": "/m/user",
};

/**
 * And back the other way. The four screens with no desktop route of their
 * own land on their section of the single page, which is where that
 * content lives over there.
 */
const TO_WEB: Record<string, string> = {
  "/m": "/",
  "/m/about": "/about",
  "/m/skills": "/#skills",
  "/m/experience": "/#experience",
  "/m/work": "/#work",
  "/m/contact": "/contact",
  "/m/user": "/user",
};

/**
 * A phone, as opposed to a tablet or a desktop.
 *
 * `device.type` is undefined for desktop browsers and "tablet" for an
 * iPad, both of which want the document rather than the app — an iPad has
 * more room than a laptop in portrait, and iPadOS reports a desktop
 * user-agent anyway.
 */
function isPhone(request: NextRequest): boolean {
  return userAgent(request).device.type === "mobile";
}

/**
 * Declares that this answer depended on the user agent.
 *
 * Every URL below answers two different ways: `/` is a 200 for a desktop and
 * a 307 for a phone, `/m` the other way round. Nothing says so unless we say
 * it, and a cache that has not been told is entitled to reuse whichever copy
 * it happens to hold — which is exactly the failure this fixes. Open `/m`
 * once on a phone, come back to the same URL on a laptop, and the browser
 * serves its stored copy of the app without ever asking the server, so the
 * redirect never gets a chance to run. In production the same omission lets
 * a CDN edge hand one visitor's build to the next.
 *
 * Appended rather than set: Next puts its own router fields in `Vary`, and
 * replacing them would break client-side navigation.
 */
function varyOnDevice<T extends NextResponse>(response: T): T {
  response.headers.append("Vary", "User-Agent");
  return response;
}

export function proxy(request: NextRequest) {
  /* A trailing slash would otherwise miss both tables and fall through to
     whichever build the URL happens to name. Next normalises it a step
     later, so this only has to hold until then — but "later" is not a thing
     to depend on when the cost of being wrong is serving the wrong site. */
  const pathname = request.nextUrl.pathname.replace(/(.)\/+$/, "$1");
  const onApp = pathname === APP_ROOT || pathname.startsWith(`${APP_ROOT}/`);

  const target = isPhone(request)
    ? (onApp ? undefined : TO_APP[pathname])
    : (onApp ? TO_WEB[pathname] : undefined);

  // Already on the right side.
  if (!target) return varyOnDevice(NextResponse.next());

  /* The query string is dropped with the move: none of these routes read
     one, and the destination is a different document either way. */
  const response = NextResponse.redirect(new URL(target, request.nextUrl));

  /* A 307 is not cacheable by default, but "by default" is doing a lot of
     work for a decision that must be re-made per visitor. */
  response.headers.set("Cache-Control", "no-store");

  return varyOnDevice(response);
}

/*
 * Only the routes that have two sides, plus everything under /m. Written
 * out rather than expressed as a negative lookahead so the console, the
 * assets and the résumé never enter this file at all.
 */
export const config = {
  matcher: ["/", "/about", "/contact", "/user", "/m", "/m/:path*"],
};
