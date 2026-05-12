"use client";

import Link from "next/link";
import { useIsMobile } from "./_components/useIsMobile";
import { useViewTransitionRouter } from "./_lib/useViewTransitionRouter";

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
        }}
      >
        <img
          src="/assets/illustration.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[160px] px-[120px] gap-[20px]">
        <div className="w-full flex flex-col items-start gap-[20px] flex-1 min-h-px text-[#1F2753]">
          {/* "Parichehr" — top-left, stage 0 */}
          <p
            className="font-normal w-full anim-bubbly-grow"
            style={{
              fontSize: 240,
              lineHeight: "260px",
              letterSpacing: "16px",
              transformOrigin: "left center",
              ...STAGE(0),
            }}
          >
            Parichehr
          </p>

          <div
            className="w-full flex items-start justify-center flex-1 min-h-px"
            style={{
              fontWeight: 300,
              fontSize: 24,
              lineHeight: "36px",
              letterSpacing: "5px",
            }}
          >
            {/* "Talebzadeh" — stage 1 */}
            <p
              className="flex-1 min-w-0 anim-bubbly-grow"
              style={{ transformOrigin: "left center", ...STAGE(1) }}
            >
              Talebzadeh
            </p>
            {/* "Product Designer" — stage 2 (top-right) */}
            <p
              className="whitespace-nowrap shrink-0 anim-bubbly-grow"
              style={{ transformOrigin: "right center", ...STAGE(2) }}
            >
              Product Designer
            </p>
          </div>
        </div>

        {/* Bio Container — bottom row, items-end. LEFT: 303-wide
            column with bio paragraph + "Me?" cream pill. RIGHT
            (flex-1): tagline at bottom-right. */}
        <div className="w-full flex items-end justify-center text-[#1F2753] shrink-0">
          {/* Left column — bio + Me? CTA */}
          <div
            className="flex flex-col items-start justify-center gap-[40px] shrink-0"
            style={{ width: 303, fontWeight: 300 }}
          >
            {/* Bio — stage 3 */}
            <p
              className="w-full anim-bubbly-grow"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                transformOrigin: "left center",
                ...STAGE(3),
              }}
            >
              <BioParagraph />
            </p>
            {/* "Me?" primary CTA — cream pill, links to /about. Stage 4. */}
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
                fontSize: 16,
                lineHeight: "24px",
                letterSpacing: "0.15px",
                textAlign: "center",
                transformOrigin: "left center",
                ...STAGE(4),
              }}
              aria-label="Me? — learn more about me"
            >
              Me?
            </Link>
          </div>

          {/* Right column — pushed to the right by flex-1, content
              bottom-aligned and right-aligned. */}
          <div className="flex-1 min-w-0 self-stretch flex flex-row items-end">
            <div className="flex-1 min-w-0 h-full flex flex-col items-end justify-end">
              {/* Complexity tagline — stage 5 (bottom-right). */}
              <p
                className="anim-bubbly-grow"
                style={{
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: "24px",
                  width: 251,
                  textAlign: "right",
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
        <div className="w-full flex flex-col items-start gap-[16px] text-[#1F2753] shrink-0">
          <p
            className="w-full font-normal anim-bubbly-grow"
            style={{
              fontSize: 60,
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
              fontSize: 14,
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
          className="w-full flex flex-col items-stretch gap-[24px] text-[#1F2753] shrink-0"
          style={{ fontWeight: 300 }}
        >
          {/* Complexity tagline — stage 3 (compact line height per
              Figma 312:1709). */}
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: 14,
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
              fontSize: 14,
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
              fontSize: 14,
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
