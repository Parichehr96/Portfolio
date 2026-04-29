"use client";

import { useEffect, useState } from "react";

/* Module-level flag, persistent for the lifetime of the JS environment.
   On hard refresh / new tab, the JS module reloads → flag = false →
   first component to call the hook returns true (animations play).
   On soft navigation (Next.js Link), the JS module stays loaded → flag
   stays true → subsequent mounts return false (no animations). */
let hasAnimatedThisSession = false;

/** Returns true on the very first render in this JS-environment session,
 *  and false on every subsequent mount.
 *  Use this to gate one-shot entrance animations so they don't replay
 *  when the user navigates between pages. */
export function useShouldAnimate(): boolean {
  // The lazy initializer runs once per component mount, synchronously,
  // before any effects fire. So all animated components mounted in the
  // same first render see hasAnimatedThisSession === false.
  const [shouldAnimate] = useState(() => !hasAnimatedThisSession);

  useEffect(() => {
    hasAnimatedThisSession = true;
  }, []);

  return shouldAnimate;
}
