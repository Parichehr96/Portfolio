"use client";

import Link from "next/link";
import { useIsMobile } from "./_components/useIsMobile";
import { useViewTransitionRouter } from "./_lib/useViewTransitionRouter";
import { fs } from "./_lib/typography";

/* === FIGMA DESIGN TOKENS (Home) ===
   Desktop (node 288:1718): rendered inside ScaledShell which scales the
   1512 × 982 design canvas. All Solway, Navy #1F2753.
   Mobile  (node 312:1661): rendered unscaled inside the mobile shell —
   pt-24 pb-20 px-16, gap-24, illustration absolute behind content at
   bottom-centre, FloatingNav above it (managed by ScaledShell).

   Mount-time animation: every visible text/CTA carries
   `className="anim-bubbly-grow"` with an inline `--stage` (0 → N) so
   they pop in top-left → bottom-right with a 250 ms stagger,
   completing in ~2 s total. The illustration uses `viewTransitionName`
   so it morphs to the next page's illustration where the View
   Transitions API is supported.

   Primary "Me?" cream pill links to /about (sole CTA on the page).
============================================================= */

const STAGE = (n: number) =>
  ({ "--stage": n }) as React.CSSProperties;

/* Bio paragraph reused on both breakpoints. Weights match Figma:
   Light shell, Medium "digital products", Regular for each
   discipline. */
function BioParagraph() {
  return (
    <>
      I design{" "}
      <span style={{ fontWeight: 500 }}>digital products</span>, containing{" "}
      <span style={{ fontWeight: 400 }}>interaction</span>,{" "}
      <span style={{ fontWeight: 400 }}>experience</span>,{" "}
      <span style={{ fontWeight: 400 }}>interface</span>,{" "}
      <span style={{ fontWeight: 400 }}>design system</span>, and{" "}
      <span style={{ fontWeight: 400 }}>content</span>, within various
      product team for modern businesses.
    </>
  );
}

function HomeDesktop() {
  const { handleClick } = useViewTransitionRouter();
  const handleAboutClick = handleClick("/about");

  return (
    <>
      {/* Background illustration — `viewTransitionName` makes this the
          matching layer that physically morphs to /about's illustration.
          No bubbly grow here so the morph reads cleanly. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          marginLeft: -434,
          top: 114,
          width: 868,
          height: 868,
          viewTransitionName: "hero-illustration",
          opacity: "var(--hero-illustration-opacity)",
        }}
      >
        <img
          src="/assets/illustration.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[160px] px-[120px] gap-[20px]">
        <div
          className="w-full flex flex-col items-start gap-[20px] flex-1 min-h-px"
          style={{ color: "var(--color-text-primary)" }}
        >
          {/* "Parichehr" — top-left, stage 0. Per Figma 488:4617 /
              497:3737: 240/190 tracking-4px (the previous 16px
              tracking + 260 px leading were carried over from an
              older artboard). The right-side theme + scale buttons
              now live in ScaledShell so they persist across
              navigation; the page no longer needs to reserve space
              for them. */}
          <p
            className="font-normal w-full anim-bubbly-grow"
            style={{
              fontSize: fs(240),
              lineHeight: "190px",
              letterSpacing: "4px",
              transformOrigin: "left center",
              ...STAGE(0),
            }}
          >
            Parichehr
          </p>

          {/* Profile info row (Figma 511:8022). Inline group:
              "Talebzadeh · Product Designer", all Solway Light 20/36
              tracking-2px, separated by a Regular 22/28 dot. */}
          <div className="w-full flex items-center gap-[12px] whitespace-nowrap">
            <p
              className="shrink-0 anim-bubbly-grow"
              style={{
                fontWeight: 300,
                fontSize: fs(20),
                lineHeight: "36px",
                letterSpacing: "2px",
                transformOrigin: "left center",
                ...STAGE(1),
              }}
            >
              Talebzadeh
            </p>
            <p
              className="shrink-0 anim-bubbly-grow"
              style={{
                fontWeight: 400,
                fontSize: fs(22),
                lineHeight: "28px",
                transformOrigin: "center center",
                ...STAGE(1.5),
              }}
              aria-hidden
            >
              ·
            </p>
            <p
              className="shrink-0 anim-bubbly-grow"
              style={{
                fontWeight: 300,
                fontSize: fs(20),
                lineHeight: "36px",
                letterSpacing: "2px",
                transformOrigin: "left center",
                ...STAGE(2),
              }}
            >
              Product Designer
            </p>
          </div>
        </div>

        {/* Bio Container — bottom row, items-end. LEFT: 303-wide
            column with bio paragraph + "Know Me?" underlined link.
            RIGHT (flex-1): tagline at bottom-right. */}
        <div
          className="w-full flex items-end justify-center shrink-0"
          style={{ color: "var(--color-text-primary)" }}
        >
          {/* Left column — bio + Know Me? link */}
          <div
            className="flex flex-col items-start justify-center gap-[20px] shrink-0"
            style={{ width: 303, fontWeight: 300 }}
          >
            {/* Bio — stage 3 */}
            <p
              className="w-full anim-bubbly-grow"
              style={{
                fontSize: fs(16),
                lineHeight: "24px",
                transformOrigin: "left center",
                ...STAGE(3),
              }}
            >
              <BioParagraph />
            </p>
            {/* "Know Me?" link — Figma 497:3545. Underlined Solway
                Regular 16/24, no pill background; left-aligned to sit
                under the bio paragraph rather than centered. Stage 4. */}
            <Link
              href="/about"
              onClick={handleAboutClick}
              className="text-left anim-bubbly-grow cursor-pointer hover:opacity-70 transition-opacity duration-200"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-solway), serif",
                fontWeight: 400,
                fontSize: fs(16),
                lineHeight: "24px",
                letterSpacing: "0.15px",
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                paddingTop: 4,
                paddingBottom: 4,
                transformOrigin: "left center",
                ...STAGE(4),
              }}
              aria-label="Know Me? — learn more about me"
            >
              Know Me?
            </Link>
          </div>

          {/* Right column — pushed to the right by flex-1, content
              bottom-aligned and right-aligned. */}
          <div className="flex-1 min-w-0 self-stretch flex flex-row items-end">
            <div className="flex-1 min-w-0 h-full flex flex-col items-end justify-end">
              {/* Complexity tagline — stage 5 (bottom-right). Uses
                  `--color-text-tagline` so it stays navy on light and
                  switches to cream-lighter (#FEFBF5) on dark per
                  Figma 488:4630. */}
              <p
                className="anim-bubbly-grow"
                style={{
                  fontWeight: 300,
                  fontSize: fs(16),
                  lineHeight: "24px",
                  width: 251,
                  textAlign: "right",
                  color: "var(--color-text-tagline)",
                  transformOrigin: "right center",
                  ...STAGE(5),
                }}
              >
                Complexity is inevitable, Confusion is optional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* === Mobile layout (Figma 312:1661) ===
   Width: 100% of viewport, content padded 16 px. Vertical stack with
   24 px gap. Illustration absolutely positioned at bottom-centre as
   background; foreground text/CTAs sit above it. The FloatingNav is
   rendered by ScaledShell at fixed bottom-centre.

   Type scales:
     - "Parichehr"            Solway Regular 60/64 tracking-8
     - "Talebzadeh" + role    Solway Light 14/24 tracking-2
     - Quote                  Solway Light 14/18
     - Bio paragraph          Solway Light 14/20 (Regular for emphasis)
     - "Me?" CTA              Solway Regular 14/20 cream pill */
function HomeMobile() {
  const { handleClick } = useViewTransitionRouter();
  const handleAboutClick = handleClick("/about");

  return (
    <>
      {/* Illustration — bottom-centred. z-10 puts it in front of the
          page text where they overlap (per request) while still
          letting the FloatingNav (rendered by ScaledShell at z-20)
          sit above it. Fades in as stage 6, after the 6 text/CTA
          elements (stages 0–5) finish their bubbly entrance. */}
      <div
        className="absolute pointer-events-none anim-fade-stage"
        style={{
          left: "50%",
          bottom: 0,
          width: 541,
          height: 541,
          transform: "translateX(-50%)",
          viewTransitionName: "hero-illustration",
          zIndex: 10,
          ...STAGE(6),
        }}
      >
        <img
          src="/assets/illustration.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      <div
        className="absolute inset-0 flex flex-col items-stretch pt-[24px] pb-[120px] px-[16px] gap-[24px]"
        style={{ zIndex: 0 }}
      >
        {/* Bio Section header (Parichehr + name/role row). */}
        <div className="w-full flex flex-col items-start gap-[16px] text-[var(--color-text-primary)] shrink-0">
          <p
            className="w-full font-normal anim-bubbly-grow"
            style={{
              fontSize: fs(60),
              lineHeight: "64px",
              letterSpacing: "8px",
              transformOrigin: "left center",
              ...STAGE(0),
            }}
          >
            Parichehr
          </p>
          <div
            className="w-full flex items-start"
            style={{
              fontWeight: 300,
              fontSize: fs(14),
              lineHeight: "24px",
              letterSpacing: "2px",
            }}
          >
            <p
              className="flex-1 min-w-0 anim-bubbly-grow"
              style={{ transformOrigin: "left center", ...STAGE(1) }}
            >
              Talebzadeh
            </p>
            <p
              className="whitespace-nowrap shrink-0 anim-bubbly-grow"
              style={{ transformOrigin: "right center", ...STAGE(2) }}
            >
              Product Designer
            </p>
          </div>
        </div>

        {/* Bio Container — quote, bio paragraph, then "Me?" primary
            CTA. Order matches Figma 312:1669 (with the EN /
            brightness placeholder row removed). */}
        <div
          className="w-full flex flex-col items-stretch gap-[24px] text-[var(--color-text-primary)] shrink-0"
          style={{ fontWeight: 300 }}
        >
          {/* Complexity tagline — stage 3 (compact line height per
              Figma 312:1709). */}
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: fs(14),
              lineHeight: "18px",
              transformOrigin: "left center",
              ...STAGE(3),
            }}
          >
            Complexity is inevitable, Confusion is optional.
          </p>

          {/* Bio paragraph — stage 4. */}
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: fs(14),
              lineHeight: "20px",
              transformOrigin: "left center",
              ...STAGE(4),
            }}
          >
            <BioParagraph />
          </p>

          {/* "Me?" primary CTA — cream pill, links to /about. Stage 5. */}
          <Link
            href="/about"
            onClick={handleAboutClick}
            className="w-full flex items-center justify-center rounded-[122px] anim-bubbly-grow bg-[#F9F5EB] hover:bg-[#EDEAE4] transition-colors duration-200"
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              color: "#1B2249",
              fontFamily: "var(--font-solway), serif",
              fontWeight: 400,
              fontSize: fs(14),
              lineHeight: "20px",
              letterSpacing: "0.1px",
              textAlign: "center",
              transformOrigin: "left center",
              ...STAGE(5),
            }}
            aria-label="Me? — learn more about me"
          >
            Me?
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const isMobile = useIsMobile();
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
