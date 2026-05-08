"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void) => unknown;
};

/* Wraps Next.js's router.push in document.startViewTransition so the
   shared `viewTransitionName: hero-illustration` element morphs across
   the four main routes. Falls back to a plain push (and lets the
   default <a> navigation happen) on browsers without the API. */
export function useViewTransitionRouter() {
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      if (typeof window === "undefined") return;
      const startVT = (document as DocumentWithVT).startViewTransition;
      if (typeof startVT !== "function") {
        router.push(href);
        return;
      }
      startVT.call(document, () => router.push(href));
    },
    [router],
  );

  /** Click handler that intercepts a Link/anchor click and runs the
   *  navigation inside startViewTransition. Returns a no-op outside
   *  the browser. */
  const handleClick = useCallback(
    (href: string) =>
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (typeof window === "undefined") return;
        const startVT = (document as DocumentWithVT).startViewTransition;
        if (typeof startVT !== "function") return;
        e.preventDefault();
        startVT.call(document, () => router.push(href));
      },
    [router],
  );

  return { navigate, handleClick };
}
