"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* === FIGMA DESIGN TOKENS (Work, node 300:2201) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Bio Section header (gap-12, w=1272):
     - "I've worked in multiple industries..." Solway Regular 44/52
       tracking-2 navy
     - "Saas, B2B, ERP, Startup, Crypto, etc." Solway Regular 20/24 navy
   Bio Container (h=665, gap-40, pb-80):
     - Project preview frame on the LEFT (h-full aspect-square,
       viewTransitionName matches the home/about/contact hero)
     - Text and Experiences Container on the RIGHT (flex-1, gap-40):
       · "My Experiences" Solway Medium 20/26
       · 8 experience rows. The selected row gets a navy bg with white
         text; the navy highlight slides between rows with a bubbly
         cubic-bezier easing on hover. The selected row also drives
         which project preview shows in the left frame.
       · GET IN TOUCH? CTA wired to /contact via document.startView-
         Transition (same path the floating nav uses).
   Floating nav: rendered by ScaledShell (Work active = position 2).
============================================================= */

type Experience = {
  name: string;
  short: string;
  date: string;
  /** Optional per-project preview image. Falls back to profile-image
   *  while the user hasn't supplied real previews yet. */
  preview?: string;
};

const EXPERIENCES: Experience[] = [
  { name: "ONTON", short: "PomeGroup", date: "May 2024 - June 2025" },
  { name: "Challenquiz", short: "PomeGroup", date: "Nov 2023 - May 2024" },
  { name: "Ezam Part", short: "Ezam", date: "Nov 2022 - June 2023" },
  { name: "WOW Global Solution", short: "RDSysCo", date: "May 2021 - Sep 2022" },
  { name: "Golestan", short: "-", date: "Jan 2021 - June 2022" },
  { name: "Filala", short: "Poytek", date: "Apr 2021 - Nov 2021" },
  { name: "IOT", short: "Poytek", date: "Apr 2021 - Nov 2021" },
  { name: "Living Maples", short: "Golearn", date: "Oct 2020 - Apr 2021" },
];

const SPACE_GROTESK = "var(--font-space-grotesk), sans-serif";
const SOLWAY = "var(--font-solway), serif";

// Spring/overshoot easing for the navy highlight slide between rows.
const HIGHLIGHT_TRANSITION =
  "top 600ms cubic-bezier(0.34, 1.56, 0.64, 1), height 600ms cubic-bezier(0.34, 1.56, 0.64, 1)";
const COLOR_TRANSITION = "color 400ms ease";

const FALLBACK_PREVIEW = "/assets/profile-image.png";

function LinkExternalIcon({ light }: { light: boolean }) {
  return (
    <span className="relative shrink-0 inline-block w-[24px] h-[24px]">
      <img
        src={
          light
            ? "/assets/icon-link-external-white.svg"
            : "/assets/icon-link-external.svg"
        }
        alt=""
        className="absolute inset-0 w-full h-full block transition-opacity duration-300"
      />
    </span>
  );
}

function ExperienceRow({
  item,
  selected,
}: {
  item: Experience;
  selected: boolean;
}) {
  const nameColor = selected ? "#FFFFFF" : "#1B2249";
  const shortColor = selected ? "#DDE0F1" : "#7E7F85";
  const dotsColor = selected ? "#DDE0F1" : "#7E7F85";
  const dateColor = selected ? "#FFFFFF" : "#1B2249";

  return (
    <div className="w-full flex items-center gap-[8px]">
      <div className="flex-1 min-w-0 flex items-center gap-[8px]">
        <p
          className="whitespace-nowrap shrink-0"
          style={{
            fontFamily: SPACE_GROTESK,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            color: nameColor,
            transition: COLOR_TRANSITION,
          }}
        >
          {item.name}
        </p>
        <p
          className="whitespace-nowrap shrink-0"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 300,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            color: shortColor,
            transition: COLOR_TRANSITION,
          }}
        >
          {item.short}
        </p>
        <LinkExternalIcon light={selected} />
      </div>
      <span
        className="overflow-hidden whitespace-nowrap shrink min-w-0"
        style={{
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "0.15px",
          maxWidth: 360,
          color: dotsColor,
          transition: COLOR_TRANSITION,
        }}
        aria-hidden
      >
        {".".repeat(80)}
      </span>
      <p
        className="whitespace-nowrap shrink-0"
        style={{
          fontFamily: SPACE_GROTESK,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "0.15px",
          color: dateColor,
          transition: COLOR_TRANSITION,
        }}
      >
        {item.date}
      </p>
    </div>
  );
}

export default function Work() {
  const router = useRouter();
  // Index of the experience currently being previewed. Hover drives this;
  // the very first row (ONTON) is selected on mount per Figma.
  const [selectedIdx, setSelectedIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // top + height (in the items-container's local box, scale-independent
  // via offsetTop / offsetHeight) of the navy highlight pill.
  const [highlight, setHighlight] = useState<{
    top: number;
    height: number;
  } | null>(null);

  const updateHighlight = () => {
    const item = itemRefs.current[selectedIdx];
    if (!item) return;
    setHighlight({
      top: item.offsetTop,
      height: item.offsetHeight,
    });
  };

  // Recompute on selected change AND on mount, before the browser paints
  // so the highlight starts in the right place with no flash.
  useLayoutEffect(() => {
    updateHighlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIdx]);

  // Recompute on viewport resize — the ScaledShell transforms the parent,
  // but offsetTop / offsetHeight are scale-independent so this only matters
  // if line-wrapping changes the row heights.
  useEffect(() => {
    const onResize = () => updateHighlight();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIdx]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
    const startVT = (
      document as unknown as {
        startViewTransition?: (cb: () => void) => unknown;
      }
    ).startViewTransition;
    if (typeof startVT !== "function") return;
    e.preventDefault();
    startVT.call(document, () => {
      router.push("/contact");
    });
  };

  const currentPreview = EXPERIENCES[selectedIdx]?.preview ?? FALLBACK_PREVIEW;

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[40px] px-[120px] gap-[80px]">
        {/* Bio Section header — "Saas, B2B..." replaces the previous greeting */}
        <div
          className="w-full flex flex-col items-start gap-[12px] text-[#1F2753]"
          style={{ letterSpacing: "2px" }}
        >
          <p
            className="w-full"
            style={{ fontSize: 44, lineHeight: "52px" }}
          >
            I&rsquo;ve worked in multiple industries...
          </p>
          <p
            className="w-full"
            style={{ fontSize: 20, lineHeight: "24px" }}
          >
            Saas, B2B, ERP, Startup, Crypto, etc.
          </p>
        </div>

        {/* Bio Container — preview frame on the left, experience list on the right */}
        <div
          className="w-full flex items-start"
          style={{
            height: 665,
            paddingBottom: 80,
            gap: 40,
          }}
        >
          {/* Project preview frame. The currently-selected experience drives
              which preview is shown; image swap fades in with a 400 ms
              opacity transition keyed by selectedIdx. */}
          <div
            className="h-full aspect-square shrink-0 relative overflow-hidden"
            style={{ viewTransitionName: "hero-illustration" }}
          >
            <img
              key={selectedIdx}
              src={currentPreview}
              alt=""
              className="absolute inset-0 w-full h-full object-cover block anim-fade"
              style={{ animationDuration: "400ms" }}
            />
          </div>

          {/* Text and Experiences Container */}
          <div className="flex-1 min-w-0 flex flex-col items-start gap-[40px]">
            <p
              className="w-full text-[#5A5D70]"
              style={{
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "26px",
                letterSpacing: "0.5px",
              }}
            >
              My Experiences
            </p>

            {/* Experience list with bubbly animated highlight.
                All rows have p-[8px] always (consistent layout). The
                selected row's navy pill is rendered as a single absolute
                element that animates top + height with spring easing as
                the user hovers between rows. */}
            <div
              ref={containerRef}
              className="relative w-full flex flex-col items-start gap-[16px] rounded-[24px]"
            >
              {/* Animated highlight */}
              {highlight && (
                <div
                  className="absolute left-0 right-0 bg-[#1F2753] rounded-[8px] pointer-events-none"
                  style={{
                    top: highlight.top,
                    height: highlight.height,
                    transition: HIGHLIGHT_TRANSITION,
                  }}
                />
              )}

              {EXPERIENCES.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="relative w-full p-[8px] cursor-default"
                  onMouseEnter={() => setSelectedIdx(i)}
                  onFocus={() => setSelectedIdx(i)}
                >
                  <ExperienceRow item={item} selected={selectedIdx === i} />
                </div>
              ))}
            </div>

            {/* GET IN TOUCH? — links to /contact via the same view-transition */}
            <Link
              href="/contact"
              onClick={handleContactClick}
              className="w-full text-[#1F2753] shrink-0 block"
              style={{
                fontFamily: SOLWAY,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: "28px",
                textDecoration: "underline",
                textDecorationStyle: "solid",
              }}
            >
              GET IN TOUCH?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
