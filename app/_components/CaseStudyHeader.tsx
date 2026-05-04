"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* === FINALIZED CASE-STUDY HEADER (MainCard) ============================
   Single morphing card used at the top of every case-study page. The
   structure is finalized — only texts, CTAs and the hero image vary
   between case studies (see app/work/<slug>/page.tsx for examples).

   At scrollY=0 the card fills exactly one viewport (MC1: cream rounded-
   24, centered title 44/64 + subtitle 22/28, role-detail items column
   on the left, hero image on the right at 596×409, four-or-fewer CTA
   pills at the bottom). As the user scrolls, the card height shrinks
   to MC2_HEIGHT (120) over one viewport of scroll, the title/subtitle
   reform to MC2 sizes (24/32 + 11/16 with parens) and the four pills
   crossfade out while inline underlined links crossfade in.

   Body content sits below by `calc(100vh + MC2_HEIGHT)` so it always
   meets the card cleanly with no gap or overlap.
======================================================================= */

const SOLWAY = "var(--font-solway), serif";
const NAVY = "#1F2753";
const CREAM = "#F9F5EB";
const GRAY_NAVY = "#5A5D70";

// Approximate natural height of MC1's content (Figma 313:2747 — header
// + image+details + CTA row + paddings). Used as the "design" reference
// when scaling expanded content to fit shorter viewports.
const DESIGN_VH = 877;
// Compact bar (MC2 — Figma 333:3203) total height: border-4 + py-32 +
// content(title 32 + subtitle 16 = 48) + py-32 + border-4 = 120.
export const MC2_HEIGHT = 120;

// Hero image fixed dimensions from Figma 313:2774: 596 × 409. Whole
// image is visible at natural aspect; sits flush right next to the
// flex-1 detail items column.
const IMAGE_WIDTH = 596;
const IMAGE_HEIGHT = 409;

const MC1_PADDING_X = 40;
const MC2_PADDING_X = 120;
const MC1_PADDING_Y = 40;
const MC2_PADDING_Y = 32;

const BACK_BUTTON_SIZE = 28;
const BACK_GAP = 12;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}
function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

export type CaseStudyDetailItem = { label: string; value: string };
export type CaseStudyCTA = {
  href: string;
  iconSrc: string;
  label: string;
  variant: "primary" | "secondary";
  /** Same-tab navigation when true; opens in new tab when false. */
  internal?: boolean;
  uppercase?: boolean;
};

export type CaseStudyHeaderProps = {
  title: string;
  subtitle: string;
  /** Subtitle text rendered in MC2 — usually wraps the MC1 subtitle in
   *  parens. Defaults to `(${subtitle})` if omitted. */
  subtitleCompact?: string;
  detailItems: CaseStudyDetailItem[];
  heroImageSrc: string;
  heroImageAlt: string;
  ctas: CaseStudyCTA[];
  /** Optional Back-to-/work label override for screen readers. */
  backHref?: string;
};

function ChevronLeft({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      aria-hidden="true"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke={NAVY}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackButton({ href = "/work" }: { href?: string }) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <a
      href={href}
      onClick={stop}
      aria-label="Back to work"
      className="shrink-0 inline-flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
      style={{ width: BACK_BUTTON_SIZE, height: BACK_BUTTON_SIZE }}
    >
      <ChevronLeft />
    </a>
  );
}

function DetailItem({ label, value }: CaseStudyDetailItem) {
  return (
    <div className="w-full flex flex-col items-start gap-[4px]">
      <p
        className="w-full"
        style={{
          color: NAVY,
          fontFamily: SOLWAY,
          fontWeight: 700,
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: "0.1px",
        }}
      >
        {label}
      </p>
      <p
        className="w-full"
        style={{
          color: NAVY,
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "0.15px",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function CTAButton({
  href,
  iconSrc,
  label,
  variant,
  internal,
  uppercase,
}: CaseStudyCTA) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const baseClass =
    "flex-1 min-w-0 inline-flex items-center justify-center gap-[12px] p-[16px] rounded-[120px] transition-colors duration-200 cursor-pointer";
  const variantClass =
    variant === "primary"
      ? "bg-white hover:bg-[#EDEAE4]"
      : "bg-transparent border-[2.6px] border-solid border-white hover:bg-white";
  const inner = (
    <>
      <span
        className="relative shrink-0 inline-block"
        style={{ width: 24, height: 24 }}
      >
        <img
          src={iconSrc}
          alt=""
          className="absolute inset-0 w-full h-full block"
        />
      </span>
      <span
        className="whitespace-nowrap"
        style={{
          color: NAVY,
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
  if (internal) {
    return (
      <a href={href} onClick={stop} className={`${baseClass} ${variantClass}`}>
        {inner}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={stop}
      className={`${baseClass} ${variantClass}`}
    >
      {inner}
    </a>
  );
}

function CompactDivider() {
  return (
    <span
      aria-hidden
      className="self-stretch shrink-0"
      style={{ width: 1, backgroundColor: NAVY }}
    />
  );
}

function CompactLink({
  href,
  label,
  internal,
}: {
  href: string;
  label: string;
  internal?: boolean;
}) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const className =
    "inline-flex items-center justify-center px-[16px] rounded-[120px] cursor-pointer hover:opacity-70 transition-opacity duration-200 whitespace-nowrap shrink-0";
  const style: React.CSSProperties = {
    color: NAVY,
    fontFamily: SOLWAY,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.25px",
    textDecoration: "underline",
    textDecorationStyle: "solid",
    whiteSpace: "nowrap",
  };
  if (internal) {
    return (
      <a href={href} onClick={stop} className={className} style={style}>
        {label}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={stop}
      className={className}
      style={style}
    >
      {label}
    </a>
  );
}

export default function CaseStudyHeader({
  title,
  subtitle,
  subtitleCompact,
  detailItems,
  heroImageSrc,
  heroImageAlt,
  ctas,
  backHref = "/work",
}: CaseStudyHeaderProps) {
  const subtitleMC2 = subtitleCompact ?? `(${subtitle})`;

  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(900);
  const [cardWidth, setCardWidth] = useState(1512);
  const [stackWidth, setStackWidth] = useState(600);

  const cardRef = useRef<HTMLDivElement>(null);
  const stackMeasureRef = useRef<HTMLDivElement>(null);

  const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsoLayoutEffect(() => {
    const measure = () => {
      if (cardRef.current) setCardWidth(cardRef.current.clientWidth);
      if (stackMeasureRef.current)
        setStackWidth(stackMeasureRef.current.scrollWidth);
    };
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => {
      setVh(window.innerHeight);
      setScrollY(window.scrollY);
      measure();
    };
    measure();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const progress = clamp01(scrollY / vh);
  const cardHeight = Math.max(MC2_HEIGHT, vh + MC2_HEIGHT - scrollY);
  const expandedScale = Math.min(
    1,
    (vh - MC2_HEIGHT) / (DESIGN_VH - MC2_HEIGHT)
  );

  const titleSize = lerp(44, 24, progress);
  const titleLineHeight = lerp(64, 32, progress);
  const subtitleSize = lerp(22, 11, progress);
  const subtitleLineHeight = lerp(28, 16, progress);
  const subtitleColor = progress > 0.5 ? GRAY_NAVY : NAVY;

  const paddingX = lerp(MC1_PADDING_X, MC2_PADDING_X, progress);
  const paddingTop = lerp(MC1_PADDING_Y, MC2_PADDING_Y, progress);

  const stackLeftMC1 = (cardWidth - stackWidth) / 2;
  const stackLeftMC2 = MC2_PADDING_X + BACK_BUTTON_SIZE + BACK_GAP;
  const stackLeft = lerp(stackLeftMC1, stackLeftMC2, progress);
  const stackTop = paddingTop;
  const stackGap = lerp(8, 0, progress);
  const stackTextAlign: React.CSSProperties["textAlign"] =
    progress < 0.5 ? "center" : "left";

  const backButtonTop =
    stackTop +
    (titleLineHeight + subtitleLineHeight * progress) / 2 -
    BACK_BUTTON_SIZE / 2;

  const expandedOpacity = clamp01(1 - progress * 1.6);
  const imageOpacity = clamp01(1 - progress * 1.4);
  const linksOpacity = clamp01((progress - 0.3) / 0.7);

  const handleCardClick = () => {
    if (typeof window === "undefined") return;
    if (progress < 0.5) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: cardHeight,
        zIndex: 50,
        backgroundColor: CREAM,
        borderBottomLeftRadius: 24 * progress,
        borderBottomRightRadius: 24 * progress,
        overflow: "hidden",
        cursor: progress > 0.5 ? "pointer" : "default",
      }}
    >
      {/* Hidden measurer — renders the title-stack at MC1 sizes once
          so we can pixel-position the live element without waiting for
          runtime layout. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -99999,
          top: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <div ref={stackMeasureRef} style={{ display: "inline-block" }}>
          <p
            style={{
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: 44,
              lineHeight: "64px",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: 22,
              lineHeight: "28px",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Back button — vertically centred against the title row at MC1
          and against the title+subtitle stack at MC2. */}
      <div
        style={{
          position: "absolute",
          left: paddingX,
          top: backButtonTop,
        }}
      >
        <BackButton href={backHref} />
      </div>

      {/* Title-stack — absolute, position morphs centered → left. Title
          and subtitle stacked with gap-8 (MC1) → 0 (MC2). */}
      <div
        style={{
          position: "absolute",
          left: stackLeft,
          top: stackTop,
          width: stackWidth,
          display: "flex",
          flexDirection: "column",
          gap: stackGap,
          textAlign: stackTextAlign,
        }}
      >
        <p
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: titleSize,
            lineHeight: `${titleLineHeight}px`,
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          style={{
            color: subtitleColor,
            fontFamily: SOLWAY,
            fontWeight: progress > 0.5 ? 500 : 400,
            fontSize: subtitleSize,
            lineHeight: `${subtitleLineHeight}px`,
            letterSpacing: `${lerp(0, 0.5, progress)}px`,
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          {progress > 0.5 ? subtitleMC2 : subtitle}
        </p>
      </div>

      {/* Right-side cluster (MC2) — inline links separated by 1px-wide
          self-stretch navy dividers. No flex gap; the dividers and each
          link's px-16 padding define the spacing. */}
      <div
        style={{
          position: "absolute",
          right: paddingX,
          top: backButtonTop,
          height: BACK_BUTTON_SIZE,
          display: "flex",
          alignItems: "center",
          gap: 0,
          flexWrap: "nowrap",
          opacity: linksOpacity,
          pointerEvents: progress > 0.5 ? "auto" : "none",
        }}
      >
        {ctas.map((cta, i) => (
          <span key={cta.label} className="contents">
            {i > 0 && <CompactDivider />}
            <CompactLink
              href={cta.href}
              label={cta.label}
              internal={cta.internal}
            />
          </span>
        ))}
      </div>

      {/* Expanded section (image + details + CTA pills). Sits below the
          MC1 header; clipped by the card's overflow:hidden as it shrinks. */}
      <div
        style={{
          position: "absolute",
          // Below MC1 header (back/title/subtitle) → MC2_HEIGHT.
          // MC1 header height = title 64 + gap 8 + subtitle 28 = 100,
          // plus card padding-top 40, plus 64 gap to image+details row.
          top: lerp(MC1_PADDING_Y + 64 + 8 + 28 + 64, MC2_HEIGHT, progress),
          left: 0,
          right: 0,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingBottom: MC1_PADDING_Y,
          transform: `scale(${expandedScale})`,
          transformOrigin: "top center",
          opacity: expandedOpacity,
          pointerEvents: progress > 0.5 ? "none" : "auto",
        }}
      >
        <div
          className="w-full flex items-center"
          style={{
            gap: 40,
            paddingLeft: 12,
            marginBottom: 64,
            height: IMAGE_HEIGHT,
          }}
        >
          <div
            className="flex-1 min-w-0 flex flex-col justify-between"
            style={{ height: "100%" }}
          >
            {detailItems.map((item) => (
              <DetailItem
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
          <div
            className="shrink-0 relative"
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              opacity: imageOpacity,
            }}
          >
            <img
              src={heroImageSrc}
              alt={heroImageAlt}
              className="absolute inset-0 w-full h-full object-contain block pointer-events-none"
            />
          </div>
        </div>
        <div className="w-full flex items-start gap-[20px]">
          {ctas.map((cta) => (
            <CTAButton key={cta.label} {...cta} />
          ))}
        </div>
      </div>
    </div>
  );
}
