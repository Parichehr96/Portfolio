"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FloatingNav from "./FloatingNav";

const DESIGN_W = 1512;
const DESIGN_H = 982;

// Viewports at or below this width are treated as tablets and scaled an
// extra 0.9× on top of the natural fit, so the layout has a touch more
// breathing room on iPad-class devices.
const TABLET_BREAKPOINT = 1024;
const TABLET_SCALE_MULTIPLIER = 0.9;

// useLayoutEffect runs synchronously after DOM mutations and before the
// browser paints, so the very first frame the user sees is already at the
// correct scale — no "scale=1" flash on slow machines. On the server we
// fall back to useEffect to suppress React's SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* The shell scales a 1512×982 design canvas to any desktop viewport
   while preserving aspect ratio, and hosts the FloatingNav so it persists
   across page navigations. Because the nav doesn't unmount on route
   change, its active-state transitions (navy pill sliding, icons cross-
   fading) animate naturally between tabs. */
export default function ScaledShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initial state matches what SSR rendered — no hydration mismatch. The
  // layout effect immediately recalculates on the client before paint.
  const [scale, setScale] = useState(1);
  const pathname = usePathname();

  // Case-study routes (e.g. /work/wow-global-solutions) are long-form
  // scrollable documents that intentionally break out of the 1512×982
  // canvas. Pass them through unscaled, with no FloatingNav — the back
  // button on the case-study page handles return navigation.
  const isCaseStudy = /^\/work\/[^/]+/.test(pathname);
  if (isCaseStudy) {
    return (
      <div
        className="bg-white"
        style={{ fontFamily: "var(--font-solway), serif" }}
      >
        {children}
      </div>
    );
  }

  // Frozen at first mount: home gets a 1.7 s prelude that lets its load
  // sequence (Parichehr + 5 texts + illustration) finish before the nav
  // pops in; any other initial route gets a snappy 0.6 s entry. Subsequent
  // navigations keep this delay (it's already past at that point).
  const [navStartDelay] = useState(() => (pathname === "/" ? 1.7 : 0.6));

  useIsomorphicLayoutEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Guard against transient zero-dimension states (e.g. window
      // restored from minimized) which would collapse content to scale 0.
      if (w === 0 || h === 0) return;
      const baseFit = Math.min(w / DESIGN_W, h / DESIGN_H);
      const tabletAdjust =
        w <= TABLET_BREAKPOINT ? TABLET_SCALE_MULTIPLIER : 1;
      setScale(baseFit * tabletAdjust);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      <div
        className="absolute"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          fontFamily: "var(--font-solway), serif",
        }}
      >
        {children}

        {/* Persistent floating nav at the canvas-relative position */}
        <div className="absolute" style={{ left: 565, top: 854 }}>
          <FloatingNav startDelay={navStartDelay} />
        </div>
      </div>
    </div>
  );
}
