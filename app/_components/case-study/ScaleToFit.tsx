"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* Wraps a fixed-width Figma composition and scales it to fit the
   parent's actual width. Used by case-study layout blocks whose
   internal content is absolutely-positioned at native pixel
   coordinates (PhaseImageBlock, SystemBlock, SystemSummaryBlock) —
   reflowing them to a real responsive layout would mean redesigning
   the composition, so we render them at native size and CSS-transform
   them down on narrow viewports.

   The wrapper element occupies `nativeWidth × nativeHeight` in the
   layout, then ResizeObserver-driven measurement adjusts a transform
   scale on the inner element. Result: pixel-perfect Figma rendering
   at any width, with the parent column flowing as if the block were
   responsive.

   For very wide parents (> nativeWidth) we cap scale at 1 — the
   composition was designed at its native size and shouldn't grow
   beyond it. */
export default function ScaleToFit({
  nativeWidth,
  nativeHeight,
  children,
  maxScale = 1,
}: {
  nativeWidth: number;
  nativeHeight: number;
  children: ReactNode;
  maxScale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const useIso =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIso(() => {
    if (!ref.current) return;
    const el = ref.current;
    const measure = () => {
      const w = el.clientWidth;
      if (w === 0) return;
      setScale(Math.min(maxScale, w / nativeWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [nativeWidth, maxScale]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: nativeHeight * scale,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: nativeWidth,
          height: nativeHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
