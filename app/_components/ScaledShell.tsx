"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FloatingNav from "./FloatingNav";
import TopRightButtons from "./TopRightButtons";
import { IsMobileContext, MOBILE_BREAKPOINT } from "./useIsMobile";
import { useShouldAnimate } from "./useShouldAnimate";

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

  // True only on the very first paint of the session. Used to gate the
  // first-time entrance animation for the persistent overlays —
  // navigation between main pages keeps shouldAnimate=false so the
  // FloatingNav and TopRightButtons stay completely static.
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Guard against transient zero-dimension states (e.g. window
      // restored from minimized) which would collapse content to scale 0.
      if (w === 0 || h === 0) return;

      // Pure width-based breakpoint — `initialIsMobile` is only used
      // as a SSR hint so phones don't flash the desktop layout before
      // hydration. Once the client mounts, the actual viewport width
      // is the only signal, so a desktop browser at any window size
      // ≥ 768 px shows the desktop canvas (and any browser narrower
      // than that — phones, narrowed desktop windows, DevTools mobile
      // emulators — shows the mobile canvas).
      const mobile = w < MOBILE_BREAKPOINT;
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
  }, []);

  if (isCaseStudy) {
    return (
      <IsMobileContext.Provider value={isMobile}>
        <div
          style={{
            fontFamily: "var(--font-solway), serif",
            backgroundColor: "var(--color-bg-page)",
          }}
        >
          {children}
        </div>
      </IsMobileContext.Provider>
    );
  }

  // First-session entrance for both persistent overlays (FloatingNav
  // already gates its own pop-in via shouldAnimate; we mirror it here
  // for the top-right buttons so they fade in once on the very first
  // page of the session, then stay completely static across all
  // subsequent navigations between Home/About/Work/Contact).
  const topRightAnimClass = shouldAnimate ? "anim-fade-down" : "";
  const topRightAnimStyle: React.CSSProperties = shouldAnimate
    ? { animationDelay: `${navStartDelay}s`, animationDuration: "0.4s" }
    : {};

  if (isMobile) {
    return (
      <IsMobileContext.Provider value={isMobile}>
        <div
          className="fixed inset-0 overflow-hidden"
          style={{ backgroundColor: "var(--color-bg-page)" }}
        >
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

            {/* Persistent top-right secondary buttons (theme + scale
                picker). Mounted in the shell so they survive route
                changes — no remount, no animation replay between
                pages, and the scale dropdown can stay open across a
                navigation. The `viewTransitionName` excludes this
                wrapper from the root cross-fade so the live DOM
                stays painted across the navigation; without it,
                the View Transitions API would fade the buttons out
                with the rest of the page. */}
            <div
              className={`absolute ${topRightAnimClass}`}
              style={{
                top: 24,
                right: 16,
                zIndex: 30,
                viewTransitionName: "persistent-top-right",
                ...topRightAnimStyle,
              }}
            >
              <TopRightButtons />
            </div>

            {/* FloatingNav inside the canvas at the figma position
                (left=4 so it sits 4 px from each edge of the 390-wide
                canvas, bottom=32 mirroring the desktop spacing). z-20
                so it stays in front of any illustration that extends
                behind it. Same view-transition-name trick as the
                top-right buttons keeps it visible across navigation. */}
            <div
              className="absolute"
              style={{
                left: 4,
                bottom: 32,
                zIndex: 20,
                viewTransitionName: "persistent-nav",
              }}
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
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ backgroundColor: "var(--color-bg-page)" }}
      >
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

          {/* Persistent top-right secondary buttons — same role as
              FloatingNav: lives in the shell so navigating between
              Home/About/Work/Contact never unmounts them. Position
              matches the design's pt-80/px-120 padding (top=80,
              right=120, button column 48-wide). z-30 sits above any
              page content / hover overlays. The `viewTransitionName`
              breaks this wrapper out of the root snapshot group so
              the View Transitions API doesn't cross-fade it on
              navigation — paired with the `animation-duration: 0s`
              rule in globals.css, the matched-layer transition
              completes instantly and the live React component
              continues rendering throughout. */}
          <div
            className={`absolute ${topRightAnimClass}`}
            style={{
              top: 80,
              right: 120,
              zIndex: 30,
              viewTransitionName: "persistent-top-right",
              ...topRightAnimStyle,
            }}
          >
            <TopRightButtons />
          </div>

          {/* Persistent floating nav at the canvas-relative position.
              Same view-transition-name treatment as the top-right
              buttons so the nav backdrop / icons / active pill stay
              painted across the route change instead of cross-fading
              out with the rest of the page. */}
          <div
            className="absolute"
            style={{
              left: 565,
              top: 854,
              viewTransitionName: "persistent-nav",
            }}
          >
            <FloatingNav startDelay={navStartDelay} />
          </div>
        </div>
      </div>
    </IsMobileContext.Provider>
  );
}
