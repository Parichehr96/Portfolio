"use client";

import { createContext, useContext } from "react";

/* === Mobile detection ===
   Two signals are combined:
     1. Server-side User-Agent parse (Next.js `userAgent` helper) —
        runs on every request, so phones get the mobile layout in the
        very first HTML they receive (no desktop flash, no hydration
        mismatch).
     2. Client-side viewport width (`window.innerWidth`) — handles
        responsive testing in DevTools and devices that report a
        desktop UA (e.g. desktop-mode browsing) but actually have a
        narrow viewport.

   The shell merges both into a single `isMobile` boolean and shares
   it with every page through the `IsMobileContext`. Page components
   call `useIsMobile()` to read the current value. */

// Standard mobile breakpoint (Tailwind `md`). Below this width on the
// client we render the mobile layout regardless of UA.
export const MOBILE_BREAKPOINT = 768;

export const IsMobileContext = createContext<boolean>(false);

export function useIsMobile(): boolean {
  return useContext(IsMobileContext);
}
