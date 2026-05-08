"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FloatingNav from "./FloatingNav";
import { IsMobileContext, MOBILE_BREAKPOINT } from "./useIsMobile";

const DESIGN_W = 1512;
const DESIGN_H = 982;

// Mobile design canvas (Figma mobile artboards). The whole mobile UI is
// laid out at this fixed size and scaled to fit the viewport, just like
// the desktop canvas — the result is pixel-perfect on every phone, and
// every element on every page is guaranteed to be on screen at once.
export const DESIGN_W_MOBILE = 390;
export const DESIGN_H_MOBILE = 844;

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
   fading) animate naturally between tabs.

   Below the mobile breakpoint, the shell switches to a 390×844 mobile
   canvas — same scale-to-fit pattern, just a different design size. The
   mobile FloatingNav is rendered inside this canvas at left=4 / bottom=32
   (figma 312:1674) so it scales together with the rest of the layout. */
export default function ScaledShell({
  children,
  initialIsMobile = false,
}: {
  children: React.ReactNode;
  /** Server-side hint from the User-Agent header. When true, the very
   *  first HTML the client receives is already rendered with the
   *  mobile layout — phones never see a desktop flash. The client
   *  effect then refines this with the actual viewport width. */
  initialIsMobile?: boolean;
}) {
  // Initial state matches what SSR rendered — no hydration mismatch. The
  // layout effect immediately recalculates on the client before paint.
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const [mobileScale, setMobileScale] = useState(1);
  const pathname = usePathname();

  // Case-study routes (e.g. /work/wow-global-solutions) are long-form
  // scrollable documents that intentionally break out of the 1512×982
  // canvas. Pass them through unscaled, with no FloatingNav — the back
  // button on the case-study page handles return navigation.
  const isCaseStudy = /^\/work\/[^/]+/.test(pathname);

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

      // Combine server-side UA hint with actual viewport width: a phone
      // shows mobile even if it's reporting a wide viewport (some
      // browsers default to 980 px in desktop-mode), and a desktop
      // browser still flips to mobile when its window is narrowed
      // below the breakpoint (responsive testing).
      const mobile = initialIsMobile || w < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      if (mobile) {
        // Scale the mobile canvas to whichever axis is the tighter fit
        // — usually width on tall phones, height on landscape.
        setMobileScale(
          Math.min(w / DESIGN_W_MOBILE, h / DESIGN_H_MOBILE)
        );
        return;
      }

      const baseFit = Math.min(w / DESIGN_W, h / DESIGN_H);
      const tabletAdjust =
        w <= TABLET_BREAKPOINT ? TABLET_SCALE_MULTIPLIER : 1;
      setScale(baseFit * tabletAdjust);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [initialIsMobile]);

  if (isCaseStudy) {
    return (
      <IsMobileContext.Provider value={isMobile}>
        <div
          className="bg-white"
          style={{ fontFamily: "var(--font-solway), serif" }}
        >
          {children}
        </div>
      </IsMobileContext.Provider>
    );
  }

  if (isMobile) {
    return (
      <IsMobileContext.Provider value={isMobile}>
        <div className="fixed inset-0 overflow-hidden bg-white">
          <div
            className="absolute"
            style={{
              width: DESIGN_W_MOBILE,
              height: DESIGN_H_MOBILE,
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${mobileScale})`,
              transformOrigin: "center center",
              fontFamily: "var(--font-solway), serif",
            }}
          >
            {children}

            {/* FloatingNav inside the canvas at the figma position
                (left=4 so it sits 4 px from each edge of the 390-wide
                canvas, bottom=32 mirroring the desktop spacing). z-20
                so it stays in front of any illustration that extends
                behind it. */}
            <div
              className="absolute"
              style={{ left: 4, bottom: 32, zIndex: 20 }}
            >
              <FloatingNav startDelay={navStartDelay} />
            </div>
          </div>
        </div>
      </IsMobileContext.Provider>
    );
  }

  return (
    <IsMobileContext.Provider value={isMobile}>
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
    </IsMobileContext.Provider>
  );
}
