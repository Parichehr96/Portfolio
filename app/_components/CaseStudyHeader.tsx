"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIsMobile } from "./useIsMobile";
import { fs } from "../_lib/typography";

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

// Hero image dimensions, matching Figma 313:2774 / 313:3257 / 313:3185
// (596 × 408). Six detail items at 48px each + five 24px gaps total
// exactly 408, so the items column aligns flush top/bottom with the
// hero next to it.
const IMAGE_WIDTH = 596;
const IMAGE_HEIGHT = 408;

// Outer card insets: at MC1 the cream "Main Content" frame (Figma
// 313:3197) sits 48 px below the viewport top and 120 px in from each
// side, with all four corners rounded. As the user scrolls those
// margins lerp to 0 and the card morphs into the MC2 compact bar that
// hugs the viewport edge with only its bottom corners rounded.
const MC1_TOP_MARGIN = 48;
const MC1_HORIZONTAL_MARGIN = 120;
const CARD_CORNER = 24;

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
  /** Object-fit for the hero image. Default `contain` preserves the
   *  natural aspect ratio (used by case studies whose main image has
   *  baked-in framing). `cover` fills the 596×409 frame edge-to-edge,
   *  letting the image align top/bottom with the detail-items column —
   *  appropriate for hero illustrations whose subject is centred. */
  heroImageObjectFit?: "contain" | "cover";
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
          fontSize: fs(14),
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
          fontSize: fs(16),
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
          fontSize: fs(14),
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
    fontSize: fs(14),
    lineHeight: "20px",
    letterSpacing: "0.25px",
    textDecorationLine: "underline",
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

/* Public component — picks the mobile or desktop variant. Hooks
   inside each variant only run when that variant renders, so the
   desktop scroll/resize handlers don't fire on phones. */
export default function CaseStudyHeader(props: CaseStudyHeaderProps) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <CaseStudyHeaderMobile {...props} />
  ) : (
    <CaseStudyHeaderDesktop {...props} />
  );
}

function CaseStudyHeaderDesktop({
  title,
  subtitle,
  subtitleCompact,
  detailItems,
  heroImageSrc,
  heroImageAlt,
  heroImageObjectFit = "contain",
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

    // rAF-throttled scroll: scroll events fire on every frame at 60–
    // 144 Hz; pushing scrollY into React state on each one triggers a
    // re-render per frame. We coalesce to one update per animation
    // frame so React work doesn't pile up if the browser is busy.
    let frame = 0;
    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrollY(window.scrollY);
      });
    };

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
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const progress = clamp01(scrollY / vh);
  // Outer-card geometry. At MC1 the card is inset (top 48, sides 120)
  // with all four corners rounded; at MC2 it hugs the viewport edge
  // with only its bottom corners rounded. cardBottom (in viewport
  // coordinates) keeps the same `vh + MC2 − scrollY` curve as before
  // so the body offset (`calc(100vh + 120px)`) still meets the card
  // seamlessly at every scroll position.
  const cardTop = lerp(MC1_TOP_MARGIN, 0, progress);
  const cardSide = lerp(MC1_HORIZONTAL_MARGIN, 0, progress);
  const cardHeight = Math.max(
    MC2_HEIGHT,
    vh + MC2_HEIGHT - scrollY - cardTop
  );
  const cornerTop = lerp(CARD_CORNER, 0, progress);
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
        top: cardTop,
        left: cardSide,
        right: cardSide,
        height: cardHeight,
        zIndex: 50,
        backgroundColor: CREAM,
        borderTopLeftRadius: cornerTop,
        borderTopRightRadius: cornerTop,
        borderBottomLeftRadius: CARD_CORNER,
        borderBottomRightRadius: CARD_CORNER,
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
              fontSize: fs(44),
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
              fontSize: fs(22),
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
            fontSize: fs(titleSize),
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
            fontSize: fs(subtitleSize),
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
            className="shrink-0 relative overflow-hidden"
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              opacity: imageOpacity,
              borderRadius: heroImageObjectFit === "cover" ? 16 : 0,
            }}
          >
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              sizes="596px"
              className="pointer-events-none"
              style={{ objectFit: heroImageObjectFit }}
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

/* Mobile case-study header — sized per Figma 446:8137.

   MC1 (Figma 446:8139): cream card in *normal document flow*, 20 px
   below the page top and 16 px in from each side, 12 px internal
   padding, all four corners rounded 24 px. As the user scrolls the
   card moves up the page naturally; body sections follow it directly
   in document flow so they're "right after" the card and rise into
   view as the card scrolls past.

   MC2: a 56 px compact bar pinned to the viewport top, full-width
   with only the bottom corners rounded and 16 px horizontal padding.
   Emerges via *scroll-driven* slide + fade — `translateY` and
   `opacity` are tied directly to scroll progress (not a CSS one-shot
   animation), and the morph is front-loaded so MC2 is fully formed
   right around the moment MC1's header scrolls past the viewport
   top. Visually MC2 takes over from MC1's own header as MC1
   continues to scroll past beneath it.
   ---------------------------------------------------------------- */

const MOBILE_PAGE_PADDING = 16;
const MOBILE_MC1_TOP = 20;
const MOBILE_MC2_HEIGHT = 56;
const MOBILE_CARD_CORNER = 24;
const MOBILE_CARD_PADDING = 12;

function MobileDetailItem({ label, value }: CaseStudyDetailItem) {
  return (
    <div className="w-full flex flex-col" style={{ gap: 4 }}>
      <p
        className="w-full"
        style={{
          color: NAVY,
          fontFamily: SOLWAY,
          fontWeight: 700,
          fontSize: fs(12),
          lineHeight: "16px",
          letterSpacing: "0.5px",
          margin: 0,
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
          fontSize: fs(12),
          lineHeight: "16px",
          letterSpacing: "0.5px",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function MobileCTAButton({
  href,
  iconSrc,
  label,
  variant,
  internal,
  uppercase,
}: CaseStudyCTA) {
  const baseClass =
    "w-full inline-flex items-center justify-center gap-[12px] px-[16px] py-[12px] rounded-[120px] transition-colors duration-200 cursor-pointer";
  const variantClass =
    variant === "primary"
      ? "bg-white hover:bg-[#EDEAE4]"
      : "bg-transparent border-[2.6px] border-solid border-white hover:bg-white/30";
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
          fontSize: fs(12),
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
      <a href={href} className={`${baseClass} ${variantClass}`}>
        {inner}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} ${variantClass}`}
    >
      {inner}
    </a>
  );
}

function CaseStudyHeaderMobile({
  title,
  subtitle,
  detailItems,
  heroImageSrc,
  heroImageAlt,
  heroImageObjectFit = "contain",
  ctas,
  backHref = "/work",
}: CaseStudyHeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(800);
  const [cardBlock, setCardBlock] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(96);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    const headerEl = headerRef.current;
    if (!cardEl || !headerEl) return;

    let frame = 0;
    const measure = () => {
      setHeaderHeight(headerEl.offsetHeight);
      setCardBlock(cardEl.offsetTop + cardEl.offsetHeight);
      setVh(window.innerHeight);
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrollY(window.scrollY);
      });
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(measure);
    ro.observe(cardEl);
    ro.observe(headerEl);
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  // Delay the morph until MC1's bottom (= the CTAs) is fully in
  // viewport — that's when "MC1 should scroll until the CTAs are
  // visible then starts to transform into MC2". On small phones MC1
  // is taller than vh so the user has to scroll down to see CTAs;
  // on tall phones (vh > cardBlock) CTAs are visible immediately and
  // morphStart is clamped to 0.
  const morphStart =
    cardBlock > 0 ? Math.max(0, cardBlock - vh) : 0;
  const morphDistance = Math.max(1, MOBILE_MC1_TOP + headerHeight);
  const progress = clamp01((scrollY - morphStart) / morphDistance);
  // Cross-fade MC1's own header against the emerging MC2 bar so the
  // back button + title don't visually appear in two places at once
  // (the user explicitly asked for "MC2 shouldn't appear on the MC1,
  // it should emerge from MC1"). As MC2 fades in, MC1's header fades
  // out at the same rate.
  const mc1HeaderOpacity = 1 - progress;

  return (
    <>
      {/* MC2 compact bar — emerges via scroll-driven slide + fade as
          MC1's own header scrolls up past the viewport top. The bar
          is z-indexed above MC1, so it visually replaces MC1's header
          while the rest of MC1 (hero, details, CTAs) continues to
          scroll past beneath it. */}
      <div
        aria-hidden={progress < 0.5}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: MOBILE_MC2_HEIGHT,
          backgroundColor: CREAM,
          borderBottomLeftRadius: MOBILE_CARD_CORNER,
          borderBottomRightRadius: MOBILE_CARD_CORNER,
          padding: `0 ${MOBILE_PAGE_PADDING}px`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 50,
          transform: `translateY(${-MOBILE_MC2_HEIGHT * (1 - progress)}px)`,
          opacity: progress,
          boxShadow:
            progress > 0.5 ? "0 2px 8px rgba(31,39,83,0.08)" : "none",
          pointerEvents: progress > 0.5 ? "auto" : "none",
        }}
      >
        <BackButton href={backHref} />
        <p
          className="flex-1 min-w-0"
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: fs(16),
            lineHeight: "20px",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "left",
          }}
        >
          {title}
        </p>
        <div
          aria-hidden
          style={{
            width: BACK_BUTTON_SIZE,
            height: BACK_BUTTON_SIZE,
            opacity: 0,
          }}
        />
      </div>

      {/* MC1 — full cream card in normal document flow per Figma
          446:8139. Sits 20 px below the page top, 16 px in from each
          side, 12 px internal padding, all four corners rounded
          24 px. Scrolls naturally with the page; body sections sit
          immediately beneath it in the document. */}
      <div
        ref={cardRef}
        style={{
          margin: `${MOBILE_MC1_TOP}px ${MOBILE_PAGE_PADDING}px 0`,
          padding: MOBILE_CARD_PADDING,
          backgroundColor: CREAM,
          borderRadius: MOBILE_CARD_CORNER,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Header — back row + subtitle. Measured via headerRef so we
            know exactly when it scrolls past the viewport top. Fades
            out as MC2 emerges so the title and back button don't
            visually appear twice during the transition. */}
        <div
          ref={headerRef}
          className="w-full flex flex-col"
          style={{
            gap: 8,
            opacity: mc1HeaderOpacity,
            pointerEvents: mc1HeaderOpacity > 0.01 ? "auto" : "none",
          }}
        >
          <div
            className="w-full flex items-center"
            style={{ gap: 12, height: BACK_BUTTON_SIZE }}
          >
            <BackButton href={backHref} />
            <p
              className="flex-1 min-w-0"
              style={{
                color: NAVY,
                fontFamily: SOLWAY,
                fontWeight: 400,
                fontSize: fs(22),
                lineHeight: "28px",
                margin: 0,
                textAlign: "center",
              }}
            >
              {title}
            </p>
            <div
              aria-hidden
              style={{
                width: BACK_BUTTON_SIZE,
                height: BACK_BUTTON_SIZE,
                opacity: 0,
              }}
            />
          </div>
          <p
            className="w-full"
            style={{
              color: NAVY,
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: fs(12),
              lineHeight: "16px",
              letterSpacing: "0.4px",
              textAlign: "center",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Hero image + two-column detail grid (Figma 446:8146/8147). */}
        <div className="w-full flex flex-col" style={{ gap: 20 }}>
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}`,
              borderRadius: 16,
            }}
          >
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 596px"
              className="pointer-events-none"
              style={{ objectFit: heroImageObjectFit }}
            />
          </div>
          <div
            className="grid grid-cols-2 w-full"
            style={{ rowGap: 12, columnGap: 8 }}
          >
            {detailItems.map((item) => (
              <MobileDetailItem
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>

        {/* CTA stack — full-width pills, 16 px gap per Figma 446:8155. */}
        <div className="w-full flex flex-col" style={{ gap: 16 }}>
          {ctas.map((cta) => (
            <MobileCTAButton key={cta.label} {...cta} />
          ))}
        </div>
      </div>
    </>
  );
}
