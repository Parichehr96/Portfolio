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
        {/* Background illustration — slides down from top at 1.6s (0.4s).
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
            animationDelay: "1.6s",
            animationDuration: "0.4s",
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
          {/* "Parichehr" — display name (slides down at 0s for 0.4s) */}
          <p
            className="anim-fade-down font-normal text-[#1F2753] text-center shrink-0"
            style={{
              fontSize: 240,
              lineHeight: "260px",
              letterSpacing: "16px",
              minWidth: "100%",
              width: "min-content",
              animationDelay: "0s",
              animationDuration: "0.4s",
            }}
          >
            Parichehr
          </p>

          {/* "Talebzadeh" / "Product Designer" — top row of the "other texts"
              cohort. Each child animates independently (TL → TR), so the
              container itself has no animation. */}
          <div
            className="w-full flex items-start justify-center text-[#1F2753] flex-1 min-h-px"
            style={{
              fontWeight: 300,
              fontSize: 24,
              lineHeight: "36px",
              letterSpacing: "5px",
            }}
          >
            <p
              className="anim-fade-down flex-1 min-w-0"
              style={{ animationDelay: "0.4s", animationDuration: "0.3s" }}
            >
              Talebzadeh
            </p>
            <p
              className="anim-fade-down whitespace-nowrap shrink-0"
              style={{ animationDelay: "0.7s", animationDuration: "0.3s" }}
            >
              Product Designer
            </p>
          </div>

          {/* bio + 2026 — bottom row of the "other texts" cohort (BL → BR). */}
          <div
            className="w-full flex items-end justify-center text-[#1F2753] shrink-0"
            style={{ fontWeight: 300 }}
          >
            <p
              className="anim-fade-down shrink-0"
              style={{
                fontSize: 16,
                lineHeight: "28px",
                width: 316,
                animationDelay: "1.0s",
                animationDuration: "0.3s",
              }}
            >
              designing digital products, containing interaction, experience,
              interface, design system, and content, within various product
              team for modern businesses.
            </p>
            <p
              className="anim-fade-down flex-1 min-w-0 text-right"
              style={{
                fontSize: 20,
                lineHeight: "36px",
                letterSpacing: "5px",
                animationDelay: "1.3s",
                animationDuration: "0.3s",
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
