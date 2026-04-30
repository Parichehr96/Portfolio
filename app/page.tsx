"use client";

import { useShouldAnimateHome } from "./_components/useShouldAnimate";

/* === FIGMA DESIGN TOKENS (Home, node 288:1718) ===
   Frame: 1512 × 982 — content rendered inside ScaledShell which
   handles the scale-to-fit transform.
   Type: all Solway, Navy #1F2753
     - "Parichehr"        Solway Regular  240 / 260  tracking-16
     - "Talebzadeh"
       "Product Designer" Solway Light    24 / 36    tracking-5
     - bio                Solway Light    16 / 28
     - "2026"             Solway Light    20 / 36    tracking-5
   Illustration: 868 × 868 absolute, top-114, left-1/2, -translateX-1/2
   FloatingNav: rendered by ScaledShell at left=565 top=854.
============================================================= */

export default function Home() {
  // Sequenced entrance only when the user opened or hard-refreshed `/`.
  // Any other entry to home (soft Link nav from /about, etc.) skips it.
  const shouldAnimate = useShouldAnimateHome();

  return (
    <>
      {/* Background illustration — slides down from top at 1.1 s on home's
          load sequence. `viewTransitionName` makes this image the source
          for the cross-page morph when navigating to /about (and back). */}
      <div
        className={
          "absolute pointer-events-none " +
          (shouldAnimate ? "anim-fade-down" : "")
        }
        style={{
          left: "50%",
          marginLeft: -434,
          top: 114,
          width: 868,
          height: 868,
          viewTransitionName: "hero-illustration",
          ...(shouldAnimate
            ? { animationDelay: "1.1s", animationDuration: "0.4s" }
            : {}),
        }}
      >
        <img
          src="/assets/illustration.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Layout content — fills the 1512 × 982 design canvas */}
      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[160px] px-[120px] gap-[20px]">
        {/* "Parichehr" — display name (slides down at 0s for 0.3s) */}
        <p
          className={
            "font-normal text-[#1F2753] text-center shrink-0 " +
            (shouldAnimate ? "anim-fade-down" : "")
          }
          style={{
            fontSize: 240,
            lineHeight: "260px",
            letterSpacing: "16px",
            minWidth: "100%",
            width: "min-content",
            ...(shouldAnimate
              ? { animationDelay: "0s", animationDuration: "0.3s" }
              : {}),
          }}
        >
          Parichehr
        </p>

        {/* "Talebzadeh" / "Product Designer" — top row of the "other texts"
            cohort. Each child animates independently (TL → TR), 0.2s each. */}
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
            className={
              "flex-1 min-w-0 " + (shouldAnimate ? "anim-fade-down" : "")
            }
            style={
              shouldAnimate
                ? { animationDelay: "0.3s", animationDuration: "0.2s" }
                : undefined
            }
          >
            Talebzadeh
          </p>
          <p
            className={
              "whitespace-nowrap shrink-0 " +
              (shouldAnimate ? "anim-fade-down" : "")
            }
            style={
              shouldAnimate
                ? { animationDelay: "0.5s", animationDuration: "0.2s" }
                : undefined
            }
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
            className={"shrink-0 " + (shouldAnimate ? "anim-fade-down" : "")}
            style={{
              fontSize: 16,
              lineHeight: "28px",
              width: 316,
              ...(shouldAnimate
                ? { animationDelay: "0.7s", animationDuration: "0.2s" }
                : {}),
            }}
          >
            designing digital products, containing interaction, experience,
            interface, design system, and content, within various product
            team for modern businesses.
          </p>
          <p
            className={
              "flex-1 min-w-0 text-right " +
              (shouldAnimate ? "anim-fade-down" : "")
            }
            style={{
              fontSize: 20,
              lineHeight: "36px",
              letterSpacing: "5px",
              ...(shouldAnimate
                ? { animationDelay: "0.9s", animationDuration: "0.2s" }
                : {}),
            }}
          >
            2026
          </p>
        </div>
      </div>
    </>
  );
}
