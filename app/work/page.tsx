"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* === FIGMA DESIGN TOKENS (Work, node 300:2201) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Bio Section header (gap-12, w=1272):
     - "I've worked in multiple industries..." Solway Regular 44/52 navy
     - "Saas, B2B, ERP, Startup, Crypto, etc."  Solway Regular 20/24 navy
   Bio Container (h=665, gap-40, pb-80):
     - Project preview frame on the LEFT (h-full aspect-square,
       viewTransitionName matches the home/about/contact hero)
     - Text and Experiences Container on the RIGHT (flex-1, gap-32):
       · "My Experiences" Solway Medium 20/26
       · 8 experience rows. The selected row gets a navy pill (with white
         text, no dashed leader); the navy highlight slides between rows
         with a bubbly cubic-bezier easing on hover. Non-selected rows
         show a 1 px dashed line filling the space between the icon and
         the date — rendered as a CSS repeating-linear-gradient so it
         auto-stretches to any viewport width.
       · Primary "GET IN TOUCH" → /contact (Cream bg)
       · Secondary "MY CV" (Cream Dark border) — no destination yet.
   Floating nav: rendered by ScaledShell (Work active = position 2).
============================================================= */

type Experience = {
  name: string;
  short: string;
  date: string;
  /** Optional per-project preview image. Falls back to profile-image
   *  while the user hasn't supplied real previews yet. */
  preview?: string;
  /** When set, the experience name links to a case-study route. The
   *  whole row stays a hover target for the highlight; only the name
   *  cluster is clickable so the surrounding date/dashed leader don't
   *  steal the click. */
  caseStudy?: string;
};

const EXPERIENCES: Experience[] = [
  { name: "ONTON", short: "PomeGroup", date: "May 2024 - June 2025" },
  {
    name: "Challenquiz",
    short: "PomeGroup",
    date: "Nov 2023 - May 2024",
    caseStudy: "/work/challenquiz",
  },
  { name: "Ezam Part", short: "Ezam", date: "Nov 2022 - June 2023" },
  {
    name: "WOW Global Solution",
    short: "RDSysCo",
    date: "May 2021 - Sep 2022",
    caseStudy: "/work/wow-global-solutions",
  },
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

// Dashed leader pattern: 4 px dash, 4 px gap, repeats horizontally to fill
// any width. Background-image-based so the same span renders crisply on
// any viewport / scale without re-counting characters.
const DASH_GRADIENT =
  "repeating-linear-gradient(to right, #7E7F85 0, #7E7F85 4px, transparent 4px, transparent 8px)";

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
  const dateColor = selected ? "#FFFFFF" : "#1B2249";

  return (
    <div className="w-full flex items-end gap-[12px]">
      {/* Cluster — flex-1 so it eats the row width up to the date. The
          dashed leader inside is also flex-1 so it stretches to whatever
          space is left after name + short + icon. */}
      <div className="flex-1 min-w-0 flex items-end gap-[4px]">
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
        {/* Dashed leader. Always rendered, but fades to opacity 0 on
            the selected row so the navy pill behind reads as a clean
            highlight. The CSS gradient auto-stretches to fill any
            width — responsive across desktop and tablet viewports. */}
        <span
          className="flex-1 min-w-0 self-end"
          style={{
            height: 1,
            backgroundImage: DASH_GRADIENT,
            backgroundRepeat: "repeat-x",
            backgroundSize: "100% 1px",
            marginBottom: 4,
            opacity: selected ? 0 : 1,
            transition: "opacity 400ms ease",
          }}
          aria-hidden
        />
      </div>
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

/* Wrapper for a single experience row. When the experience has a
   case-study destination, the row is rendered as a real <a> anchor —
   native HTML navigation is the most robust path: it works without
   React event handlers, survives any pointer-events / transform / event-
   delegation oddity in the scaled shell, and falls back to a plain
   page load if the JS bundle fails to hydrate. */
function ExperienceRowItem({
  itemRef,
  item,
  selected,
  onSelect,
  stage,
}: {
  itemRef: (el: HTMLDivElement | null) => void;
  item: Experience;
  selected: boolean;
  onSelect: () => void;
  stage: number;
}) {
  const inner = <ExperienceRow item={item} selected={selected} />;
  // anim-bubbly-grow goes on the same element that itemRef points at
  // so the navy highlight pill (which reads item.offsetTop /
  // offsetHeight) sees the right layout position. Wrapping this in an
  // extra div with `transform` would reset offsetParent to that
  // wrapper and break the highlight slide.
  const baseClass =
    "relative block w-full p-[8px] no-underline anim-bubbly-grow";
  const stageStyle: React.CSSProperties = {
    transformOrigin: "left center",
    ["--stage" as string]: stage,
  };
  if (item.caseStudy) {
    return (
      <a
        ref={(el: HTMLAnchorElement | null) =>
          itemRef(el as unknown as HTMLDivElement)
        }
        href={item.caseStudy}
        className={baseClass}
        style={{ cursor: "pointer", color: "inherit", ...stageStyle }}
        onMouseEnter={onSelect}
        onFocus={onSelect}
        aria-label={`${item.name} — open case study`}
      >
        {inner}
      </a>
    );
  }
  return (
    <div
      ref={itemRef}
      className={baseClass}
      style={{ cursor: "default", ...stageStyle }}
      onMouseEnter={onSelect}
      onFocus={onSelect}
    >
      {inner}
    </div>
  );
}

/* === Primary / Secondary CTA buttons ===
   Same shape and visual rules as the About page CTAs (rounded-120, px-16
   py-12, 24×24 icon + Solway Regular 14/18 navy text).
   - href omitted → renders as a non-clickable span (placeholder until a
     destination is provided).
   - href present → renders as a Link whose onClick wraps router.push in
     document.startViewTransition for the shared hero-illustration morph. */
function CTAButton({
  href,
  iconSrc,
  label,
  variant,
  uppercase = false,
}: {
  href?: string;
  iconSrc: string;
  label: string;
  variant: "primary" | "secondary";
  uppercase?: boolean;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href || typeof window === "undefined") return;
    const startVT = (
      document as unknown as {
        startViewTransition?: (cb: () => void) => unknown;
      }
    ).startViewTransition;
    if (typeof startVT !== "function") return;
    e.preventDefault();
    startVT.call(document, () => {
      router.push(href);
    });
  };

  const baseClass =
    "flex-1 min-w-0 flex items-center justify-center gap-[12px] px-[16px] py-[12px] rounded-[120px] transition-colors duration-200";
  const variantClass =
    variant === "primary"
      ? "bg-[#F9F5EB] hover:bg-[#EDEAE4] cursor-pointer"
      : "bg-white border-2 border-solid border-[#EDEAE4] hover:bg-[#F9F5EB] cursor-pointer";

  const inner = (
    <>
      <span className="relative shrink-0 inline-block w-[24px] h-[24px]">
        <img
          src={iconSrc}
          alt=""
          className="absolute inset-0 w-full h-full block"
        />
      </span>
      <span
        className="text-[#1F2753] whitespace-nowrap"
        style={{
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "18px",
          textTransform: uppercase ? "uppercase" : undefined,
        }}
      >
        {label}
      </span>
    </>
  );

  if (!href) {
    return <span className={`${baseClass} ${variantClass}`}>{inner}</span>;
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseClass} ${variantClass}`}
    >
      {inner}
    </Link>
  );
}

export default function Work() {
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

  const currentPreview = EXPERIENCES[selectedIdx]?.preview ?? FALLBACK_PREVIEW;

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[40px] px-[120px] gap-[80px]">
        {/* Bio Section header — stage 0 + 1 (top-left) */}
        <div
          className="w-full flex flex-col items-start gap-[12px] text-[#1F2753]"
          style={{ letterSpacing: "2px" }}
        >
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: 44,
              lineHeight: "52px",
              transformOrigin: "left center",
              ["--stage" as string]: 0,
            }}
          >
            I&rsquo;ve worked in multiple industries...
          </p>
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: 20,
              lineHeight: "24px",
              transformOrigin: "left center",
              ["--stage" as string]: 1,
            }}
          >
            Saas, B2B, ERP, Startup, Crypto, etc.
          </p>
        </div>

        {/* Bio Container — preview frame on the left is the matching
            layer; right column staggers individually. */}
        <div
          className="w-full flex items-start"
          style={{
            height: 665,
            paddingBottom: 80,
            gap: 40,
          }}
        >
          {/* Project preview frame (matching layer — no bubbly). */}
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
          <div className="flex-1 min-w-0 flex flex-col items-start gap-[32px]">
            {/* "My Experiences" label — stage 2 */}
            <p
              className="w-full text-[#5A5D70] anim-bubbly-grow"
              style={{
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "26px",
                letterSpacing: "0.5px",
                transformOrigin: "left center",
                ["--stage" as string]: 2,
              }}
            >
              My Experiences
            </p>

            {/* Experience list — each row sub-stages 3.0..3.7 so the
                eight rows pop in one-by-one, top to bottom. */}
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
                <ExperienceRowItem
                  key={`${item.name}-${i}`}
                  itemRef={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  item={item}
                  selected={selectedIdx === i}
                  onSelect={() => setSelectedIdx(i)}
                  stage={3 + i * 0.5}
                />
              ))}
            </div>

            {/* CTAs — each button stages individually as the last two. */}
            <div className="w-full flex items-start gap-[20px] shrink-0">
              <span
                className="anim-bubbly-grow flex-1 flex"
                style={{ ["--stage" as string]: 8 }}
              >
                <CTAButton
                  href="/contact"
                  iconSrc="/assets/icon-cta-chat.svg"
                  label="Get in touch"
                variant="primary"
                  uppercase
                />
              </span>
              <span
                className="anim-bubbly-grow flex-1 flex"
                style={{ ["--stage" as string]: 9 }}
              >
                <CTAButton
                  iconSrc="/assets/icon-cta-cv.svg"
                  label="MY CV"
                  variant="secondary"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
