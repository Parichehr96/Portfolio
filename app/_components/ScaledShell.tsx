"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FloatingNav from "./FloatingNav";

const DESIGN_W = 1512;
const DESIGN_H = 982;

/* The shell scales a 1512×982 design canvas to any desktop viewport
   while keeping aspect ratio, and hosts the FloatingNav so it persists
   across page navigations. Because the nav doesn't unmount on route
   change, its active-state transitions (navy pill sliding, icons cross-
   fading) animate naturally between tabs. */
export default function ScaledShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    return Math.min(
      window.innerWidth / DESIGN_W,
      window.innerHeight / DESIGN_H,
    );
  });
  const pathname = usePathname();

  // Frozen at first mount: home gets a 2 s prelude that lets its load
  // sequence finish before the nav pops in; any other initial route
  // gets a snappy 0.6 s entry. Subsequent navigations keep this delay
  // (it's already past at that point).
  const [navStartDelay] = useState(() => (pathname === "/" ? 2.0 : 0.6));

  useEffect(() => {
    const apply = () => {
      setScale(
        Math.min(
          window.innerWidth / DESIGN_W,
          window.innerHeight / DESIGN_H,
        ),
      );
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
