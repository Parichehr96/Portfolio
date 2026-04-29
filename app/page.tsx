"use client";

import { useEffect, useState } from "react";
import FloatingNav from "./_components/FloatingNav";

/* === FIGMA DESIGN TOKENS (Home, node 288:1718) ===
   Frame: 1512 × 982, bg #FFFFFF
   Outer: pt-80 pb-160 px-120, flex-col items-center gap-20
   Type: all Solway, Navy #1F2753
     - "Parichehr"        Solway Regular  240 / 260  tracking-16
     - "Talebzadeh"
       "Product Designer" Solway Light    24 / 36    tracking-5
     - bio                Solway Light    16 / 28
     - "2026"             Solway Light    20 / 36    tracking-5
   Illustration: 868 × 868 absolute, top-114, left-1/2, -translateX-1/2
   Floating nav: absolute, top-854, left-565, 382 × 88
============================================================= */

const DESIGN_W = 1512;
const DESIGN_H = 982;

const SOLWAY_REGULAR = "var(--font-solway), serif";

export default function Home() {
  // Scale the 1512×982 design to fit any desktop viewport without scrolling.
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const apply = () => {
      const s = Math.min(
        window.innerWidth / DESIGN_W,
        window.innerHeight / DESIGN_H,
      );
      setScale(s);
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
          fontFamily: SOLWAY_REGULAR,
        }}
      >
        {/* Background illustration — slides down from top at 1.0s.
            Centering uses negative margin (not translateX) so it doesn't
            collide with the keyframe's transform property. */}
        <div
          className="anim-fade-down absolute pointer-events-none"
          style={{
            left: "50%",
            marginLeft: -434,
            top: 114,
            width: 868,
            height: 868,
            animationDelay: "1.0s",
          }}
        >
          <img
            src="/assets/illustration.png"
            alt=""
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Layout content */}
        <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[160px] px-[120px] gap-[20px]">
          {/* "Parichehr" — display name (slides down from above at 0s) */}
          <p
            className="anim-fade-down font-normal text-[#1F2753] text-center shrink-0"
            style={{
              fontSize: 240,
              lineHeight: "260px",
              letterSpacing: "16px",
              minWidth: "100%",
              width: "min-content",
              animationDelay: "0s",
            }}
          >
            Parichehr
          </p>

          {/* "Talebzadeh" — "Product Designer" — fills middle space.
              Part of the "other texts" group, slides down at 0.5s. */}
          <div
            className="anim-fade-down w-full flex items-start justify-center text-[#1F2753] flex-1 min-h-px"
            style={{
              fontWeight: 300,
              fontSize: 24,
              lineHeight: "36px",
              letterSpacing: "5px",
              animationDelay: "0.5s",
            }}
          >
            <p className="flex-1 min-w-0">Talebzadeh</p>
            <p className="whitespace-nowrap shrink-0">Product Designer</p>
          </div>

          {/* Bio + 2026 — also part of the "other texts" group, 0.5s */}
          <div
            className="anim-fade-down w-full flex items-end justify-center text-[#1F2753] shrink-0"
            style={{ fontWeight: 300, animationDelay: "0.5s" }}
          >
            <p
              className="shrink-0"
              style={{
                fontSize: 16,
                lineHeight: "28px",
                width: 316,
              }}
            >
              designing digital products, containing interaction, experience,
              interface, design system, and content, within various product
              team for modern businesses.
            </p>
            <p
              className="flex-1 min-w-0 text-right"
              style={{
                fontSize: 20,
                lineHeight: "36px",
                letterSpacing: "5px",
              }}
            >
              2026
            </p>
          </div>
        </div>

        {/* Floating nav */}
        <div className="absolute" style={{ left: 565, top: 854 }}>
          <FloatingNav />
        </div>
      </div>
    </div>
  );
}
