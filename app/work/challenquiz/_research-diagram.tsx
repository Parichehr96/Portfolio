"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* === Research user-journey diagram (Figma 336:7727) =====================
   SVG-quality reconstruction. Renders the menu hierarchy + bullet
   annotations + arrow vectors at the design's native 1272 × 800 canvas
   and scales to fit the container width. The arrows are real SVG; the
   phone screenshots are 1080×2400 PNGs displayed at 169×377 (downscaled
   = sharp). No PNG screenshot of the composite — vectors stay vector,
   so the diagram is crisp at any zoom level.
======================================================================= */

const NAVY = "#1F2753";
const NAVY_DARK = "#1B2249";
const NAVY_LIGHT = "#28315F";
const GRAY_NAVY = "#5A5D70";
const SOLWAY = "var(--font-solway), serif";

const A = "/assets/challenquiz/research"; // asset prefix

// Filled navy-light boxes that label menu items the user did discover.
type Box = { label: string; left: number; top: number; w: number };
const FILLED_BOXES: Box[] = [
  { label: "Menu", left: 795.95, top: 12.15, w: 136.35 },
  { label: "Wallet", left: 526.1, top: 152.05, w: 136.35 },
  { label: "Play", left: 668.45, top: 154.05, w: 136.35 },
  { label: "Transactions", left: 810.8, top: 154.05, w: 136.35 },
  { label: "Leaderboard", left: 953.15, top: 154.05, w: 136.35 },
  { label: "Game", left: 1095.5, top: 154.05, w: 136.35 },
  { label: "Categories", left: 668.45, top: 100.8, w: 136.35 },
  { label: "Coins", left: 526.1, top: 204.45, w: 136.35 },
  { label: "History", left: 1095.5, top: 212.8, w: 136.35 },
  { label: "Refferal", left: 132.3, top: 214.45, w: 136.35 },
  { label: "Scores", left: 310.5, top: 214.45, w: 136.35 },
  { label: "Add Coins", left: 466.85, top: 274.85, w: 136.35 },
  { label: "Deposite", left: 609.2, top: 274.85, w: 136.35 },
  { label: "Withdraw", left: 751.55, top: 274.85, w: 136.35 },
  { label: "Telegram", left: 39, top: 274.85, w: 136.35 },
  { label: "Website", left: 185.25, top: 274.85, w: 136.35 },
];

// Outlined boxes that label states the user *failed* to recognise.
type OutlineBox = {
  label: string;
  left: number;
  top: number;
  w?: number;
  paddingX?: number;
};
const OUTLINED_BOXES: OutlineBox[] = [
  { label: "Selects a game", left: 925, top: 225, w: 136.35 },
  { label: "Waiting for opponents", left: 906, top: 301, paddingX: 8 },
  { label: "Game begins", left: 741, top: 354, w: 124 },
  { label: "Results", left: 444, top: 354, w: 124 },
];

// Bullet annotations clustered near the three failure points.
type Bullets = {
  left: number;
  top: number;
  w: number;
  items: string[];
};
const BULLET_GROUPS: Bullets[] = [
  {
    left: 238,
    top: 356,
    w: 196,
    items: [
      "No notification after game is finished (everyone played)",
      "User should check the result in History section!",
    ],
  },
  {
    left: 571,
    top: 388,
    w: 171,
    items: [
      "No clarity on the answers being right or wrong",
      "Timer is not noticeable\nNo knowledge of other opponent’s status",
    ],
  },
  {
    left: 993,
    top: 346,
    w: 240,
    items: [
      "No notification when everyone joins (Misses the game sometimes)",
      "User should press “Start game” again (Confusing part)",
    ],
  },
];

// Per-arrow geometry mirroring Figma's wrapper structure: the outer
// div is `flex items-center justify-center` with a fixed bounding box,
// the inner div applies the rotation, and the SVG image fills its own
// natural rect inside.
type Arrow = {
  src: string;
  // Outer wrapper bounding box
  left: number;
  top: number;
  w: number; // outer width (often 0 for "rotate-90" arrows so the rotation pivots correctly)
  h: number; // outer height
  // Rotation in degrees applied to the inner block
  rotate: number;
  // Inner rect dimensions (the arrow's natural width/height before rotation)
  innerW: number;
  innerH: number;
  // Inset offsets that some arrows carry to align stroke+arrowhead.
  insetTop?: number;
  insetRight?: number;
  insetBottom?: number;
  insetLeft?: number;
};

const ARROWS: Arrow[] = [
  // Vertical arrow Menu→Categories
  { src: `${A}/arrow-4.svg`,  left: 864.05, top: 52.2,   w: 0,       h: 101.85, rotate: 90,    innerW: 101.85, innerH: 0, insetTop: -6.08, insetBottom: -6.08, insetLeft: 0, insetRight: -0.81 },
  // Vertical arrow into "Selects a game"
  { src: `${A}/arrow-19.svg`, left: 1005,   top: 265,    w: 0,       h: 35,     rotate: 90,    innerW: 35,     innerH: 0, insetTop: -6.08, insetBottom: -6.08, insetLeft: 0, insetRight: -2.36 },
  // Horizontal back-arrow from screenshot toolbar to "Game begins"
  { src: `${A}/arrow-21.svg`, left: 571,    top: 374,    w: 170,     h: 0,      rotate: 180,   innerW: 170,    innerH: 0, insetTop: -6.08, insetBottom: -6.08, insetLeft: 0, insetRight: -0.49 },
  // Horizontal arrows under the phone screenshots row
  { src: `${A}/arrow-22.svg`, left: 580,    top: 621,    w: 161,     h: 0,      rotate: 180,   innerW: 161,    innerH: 0, insetTop: -6.08, insetBottom: -6.08, insetLeft: 0, insetRight: -0.51 },
  { src: `${A}/arrow-23.svg`, left: 918,    top: 621,    w: 85,      h: 0,      rotate: 180,   innerW: 85,     innerH: 0, insetTop: -6.08, insetBottom: -6.08, insetLeft: 0, insetRight: -0.97 },
  // Tiny vertical arrow into History
  { src: `${A}/arrow-16.svg`, left: 1159,   top: 194,    w: 0,       h: 20,     rotate: 90,    innerW: 20,     innerH: 0, insetTop: -6.08, insetBottom: -6.08, insetLeft: 0, insetRight: -4.13 },
  // Diagonal hierarchy arrows (rotate ~32deg) — Menu → top row
  { src: `${A}/arrow-5.svg`,  left: 841.78, top: 14.63,  w: 207.892, h: 174.845, rotate: 32.16, innerW: 191.357, innerH: 86.223 },
  { src: `${A}/arrow-6.svg`,  left: 841.78, top: -45.19, w: 339.932, h: 294.032, rotate: 32.16, innerW: 302.903, innerH: 156.879 },
  { src: `${A}/arrow-7.svg`,  left: 701.29, top: 1.56,   w: 175.166, h: 189.218, rotate: 32.16, innerW: 109.782, innerH: 154.487 },
  { src: `${A}/arrow-8.svg`,  left: 556.31, top: -64,    w: 320.152, h: 319.521, rotate: 32.16, innerW: 232.965, innerH: 230.957 },
  { src: `${A}/arrow-9.svg`,  left: 206.84, top: 24.17,  w: 386.921, h: 355.058, rotate: 32.16, innerW: 319.743, innerH: 218.377 },
  { src: `${A}/arrow-14.svg`, left: 85.03,  top: 215.78, w: 100.558, h: 97.464,  rotate: 32.16, innerW: 76.729, innerH: 66.886 },
  { src: `${A}/arrow-15.svg`, left: 176.58, top: 233.21, w: 71.311,  h: 61.912,  rotate: 32.16, innerW: 63.261, innerH: 33.358 },
  { src: `${A}/arrow-10.svg`, left: 383.91, top: 105.08, w: 209.401, h: 195.389, rotate: 32.16, innerW: 169.074, innerH: 124.499 },
  { src: `${A}/arrow-17.svg`, left: 586.08, top: 193.5,  w: 9.464,   h: 10.501,  rotate: 32.16, innerW: 5.589,  innerH: 8.89 },
  { src: `${A}/arrow-11.svg`, left: 510.36, top: 214.04, w: 90.13,   h: 90.799,  rotate: 32.16, innerW: 64.545, innerH: 66.673 },
  { src: `${A}/arrow-20.svg`, left: 865,    top: 293.8,  w: 138.318, h: 134.225, rotate: 32.16, innerW: 105.341, innerH: 92.32 },
  { src: `${A}/arrow-12.svg`, left: 587.09, top: 220.45, w: 90.198,  h: 77.503,  rotate: 32.16, innerW: 81.007, innerH: 40.617 },
  { src: `${A}/arrow-13.svg`, left: 587.09, top: 158.1,  w: 228.347, h: 202.062, rotate: 32.16, innerW: 197.887, innerH: 114.266 },
  { src: `${A}/arrow-18.svg`, left: 784,    top: 108,    w: 228.347, h: 202.062, rotate: 32.16, innerW: 197.887, innerH: 114.266 },
];

const SCREENSHOTS = [
  { src: `${A}/telegram-results.png`, alt: "Results screen", left: 401, top: 432, w: 170, h: 377 },
  { src: `${A}/telegram-game-begins.png`, alt: "Game begins screen", left: 742, top: 432, w: 169, h: 377 },
  { src: `${A}/telegram-waiting.png`, alt: "Waiting for opponents screen", left: 1003, top: 432, w: 169, h: 377 },
];

export default function ResearchDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Use isomorphic effect so we sync before paint on the client.
  const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsoLayoutEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      setScale(ref.current.clientWidth / 1272);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: 800 * scale,
        overflow: "hidden",
        backgroundColor: "#FEFBF5",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1272,
          height: 800,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {/* Filled navy-light menu boxes */}
        {FILLED_BOXES.map((b) => (
          <div
            key={b.label}
            style={{
              position: "absolute",
              left: b.left,
              top: b.top,
              width: b.w,
              height: 40.05,
              backgroundColor: NAVY_LIGHT,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 1.5,
            }}
          >
            <p
              style={{
                color: "#F5F5F5",
                fontFamily: SOLWAY,
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                letterSpacing: "0.1px",
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              {b.label}
            </p>
          </div>
        ))}

        {/* Outlined navy-light boxes (no fill) for failure-state nodes */}
        {OUTLINED_BOXES.map((b) => (
          <div
            key={b.label}
            style={{
              position: "absolute",
              left: b.left,
              top: b.top,
              width: b.w,
              height: 40.05,
              border: `1px solid ${NAVY_LIGHT}`,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: b.paddingX ?? 1.5,
              paddingRight: b.paddingX ?? 1.5,
              paddingTop: 1.5,
              paddingBottom: 1.5,
            }}
          >
            <p
              style={{
                color: NAVY_DARK,
                fontFamily: SOLWAY,
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                letterSpacing: "0.1px",
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              {b.label}
            </p>
          </div>
        ))}

        {/* Floating caption: "No information of the process" */}
        <p
          style={{
            position: "absolute",
            left: 1018,
            top: 275,
            color: GRAY_NAVY,
            fontFamily: SOLWAY,
            fontWeight: 500,
            fontSize: 11,
            lineHeight: "16px",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          No information of the process
        </p>

        {/* Bullet annotation lists */}
        {BULLET_GROUPS.map((g, i) => (
          <ul
            key={i}
            style={{
              position: "absolute",
              left: g.left,
              top: g.top,
              width: g.w,
              listStyle: "disc",
              paddingLeft: 16.5,
              color: GRAY_NAVY,
              fontFamily: SOLWAY,
              fontWeight: 500,
              fontSize: 11,
              lineHeight: "16px",
              letterSpacing: "0.5px",
              margin: 0,
            }}
          >
            {g.items.map((it, j) => (
              <li key={j} style={{ marginBottom: j < g.items.length - 1 ? 0 : 0 }}>
                <span style={{ whiteSpace: "pre-line" }}>{it}</span>
              </li>
            ))}
          </ul>
        ))}

        {/* SVG arrows with rotation wrappers (matches Figma 336:799x). */}
        {ARROWS.map((a, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: a.left,
              top: a.top,
              width: a.w,
              height: a.h,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                flex: "none",
                transform: `rotate(${a.rotate}deg)`,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: a.innerW,
                  height: a.innerH,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: a.insetTop ?? 0,
                    right: a.insetRight ?? 0,
                    bottom: a.insetBottom ?? 0,
                    left: a.insetLeft ?? 0,
                  }}
                >
                  <img
                    src={a.src}
                    alt=""
                    aria-hidden="true"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      maxWidth: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Phone screenshots — high-res 1080×2400 PNGs at 169×377 = sharp */}
        {SCREENSHOTS.map((s) => (
          <div
            key={s.alt}
            style={{
              position: "absolute",
              left: s.left,
              top: s.top,
              width: s.w,
              height: s.h,
            }}
          >
            <img
              src={s.src}
              alt={s.alt}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
