"use client";

import { useEffect, useState } from "react";

/* Module-level flags persist for the lifetime of the JS environment.
   Hard refresh / new tab => modules reload => flags reset.
   Soft Link navigation => modules stay loaded => flags persist. */

let hasAnimatedThisSession = false;
let homeHasRendered = false;

/* Captured once when this module first loads on the client. We do this
   at module scope (NOT inside a hook) so that even if the user lands
   directly on /about, the captured value is "/about" — and a later
   soft Link navigation to / correctly skips the home loading sequence.
   On SSR the value stays null; the SSR branch of useShouldAnimateHome
   short-circuits anyway (SSR for home only happens on the / route). */
let initialPathname: string | null =
  typeof window !== "undefined" ? window.location.pathname : null;

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

/** True only when the home page should play its sequenced load animation:
 *    • on a hard-load / refresh of `/` (handled via the SSR branch — the
 *      server only renders home for that URL, so SSR=true is safe), OR
 *    • on a soft mount of home where home has not rendered yet AND the
 *      browser's initial URL was `/`.
 *  Returns false when the user soft-navigates to / from another route
 *  (e.g. /about → /), or when home has already played its sequence once
 *  in this session.
 *
 *  Important: the SSR branch returns `true` so the server-rendered HTML
 *  ships with the `anim-fade-down` classes already attached. React
 *  preserves the SSR state through hydration, which means the animation
 *  classes are present on the very first paint and CSS animations
 *  actually play. (Returning `false` here previously is why the bio /
 *  other texts / image weren't animating on load.) */
export function useShouldAnimateHome(): boolean {
  const [should] = useState(() => {
    if (typeof window === "undefined") {
      // SSR — Next.js only invokes this hook when /'s page is being
      // rendered server-side, so animations should apply.
      return true;
    }
    return !homeHasRendered && initialPathname === "/";
  });

  useEffect(() => {
    homeHasRendered = true;
  }, []);

  return should;
}
