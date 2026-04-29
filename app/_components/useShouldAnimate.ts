"use client";

import { useEffect, useState } from "react";

/* Module-level flags persist for the lifetime of the JS environment.
   Hard refresh / new tab => modules reload => flags reset.
   Soft Link navigation => modules stay loaded => flags persist. */

let hasAnimatedThisSession = false;
let initialPathname: string | null = null;
let homeHasRendered = false;

/** True on the first call of this session, false on every subsequent call.
 *  Used by FloatingNav (which mounts once in the persistent layout) to play
 *  its entrance animation on the very first hit, never again. */
export function useShouldAnimate(): boolean {
  const [shouldAnimate] = useState(() => !hasAnimatedThisSession);

  useEffect(() => {
    hasAnimatedThisSession = true;
  }, []);

  return shouldAnimate;
}

/** True only when:
 *    - the home page has not yet been rendered in this session, AND
 *    - the user opened the site directly on `/` (i.e. `/` was the
 *      first URL the browser loaded for this JS environment).
 *  This means the home loading sequence plays only on the very first
 *  hard load of `/` or on a hard refresh of `/`, never on a soft Link
 *  navigation back to home from another route. */
export function useShouldAnimateHome(): boolean {
  const [should] = useState(() => {
    if (typeof window === "undefined") return false;
    if (initialPathname === null) {
      initialPathname = window.location.pathname;
    }
    return !homeHasRendered && initialPathname === "/";
  });

  useEffect(() => {
    homeHasRendered = true;
  }, []);

  return should;
}
