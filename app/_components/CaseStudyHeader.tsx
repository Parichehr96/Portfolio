"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIsMobile } from "./useIsMobile";

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

/* Mobile case-study header — no desktop morph. Static stacked layout
   (back / title / subtitle / hero / details / CTAs) in normal flow;
   when the user scrolls past it, a sticky compact bar (back + title)
   slides in from the top.

   This intentionally diverges from the desktop morphing card because
   the desktop card's content (six detail items + 596×409 hero + four
   CTAs) won't fit a phone viewport without ugly clipping. The mobile
   version is a more conventional case-study header and works on every
   phone size.
   ---------------------------------------------------------------- */

const MOBILE_PAGE_PADDING = 16;
const MOBILE_STICKY_HEIGHT = 56;

function MobileCTAButton({
  href,
  iconSrc,
  label,
  variant,
  internal,
  uppercase,
}: CaseStudyCTA) {
  const baseClass =
    "w-full inline-flex items-center justify-center gap-[12px] py-[14px] px-[16px] rounded-[120px] transition-colors duration-200 cursor-pointer";
  const variantClass =
    variant === "primary"
      ? "bg-white hover:bg-[#EDEAE4]"
      : "bg-transparent border-[2px] border-solid border-white hover:bg-white/30";
  const inner = (
    <>
      <span
        className="relative shrink-0 inline-block"
        style={{ width: 20, height: 20 }}
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
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    // Reveal the sticky compact bar when the user has scrolled past
    // ~80% of the static header. We compute the threshold once on
    // mount and on resize; rAF-throttle the scroll handler so we
    // don't churn React on every frame.
    let threshold = 0;
    let frame = 0;

    const measure = () => {
      threshold = Math.max(0, headerEl.offsetHeight * 0.8);
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > threshold);
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
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Sticky compact bar — slides in once the user scrolls past
          most of the static header. */}
      <div
        aria-hidden={!scrolled}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: MOBILE_STICKY_HEIGHT,
          backgroundColor: CREAM,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          padding: `0 ${MOBILE_PAGE_PADDING}px`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 50,
          transform: scrolled ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 220ms ease-out",
          boxShadow: scrolled ? "0 2px 8px rgba(31,39,83,0.08)" : "none",
          pointerEvents: scrolled ? "auto" : "none",
        }}
      >
        <BackButton href={backHref} />
        <p
          className="flex-1 min-w-0"
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </p>
      </div>

      {/* Static header — normal flow, full-width stack. */}
      <header
        ref={headerRef}
        style={{
          backgroundColor: CREAM,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          padding: `${MOBILE_PAGE_PADDING}px ${MOBILE_PAGE_PADDING}px 32px`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Back row */}
        <div style={{ paddingTop: 8 }}>
          <BackButton href={backHref} />
        </div>

        {/* Title + subtitle */}
        <div className="flex flex-col gap-[8px]">
          <h1
            style={{
              color: NAVY,
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: 28,
              lineHeight: "36px",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: NAVY,
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "22px",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Hero image — full-width, aspect ratio preserved. */}
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

        {/* Detail items — vertical stack */}
        <div className="flex flex-col gap-[16px] w-full">
          {detailItems.map((item) => (
            <DetailItem
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>

        {/* CTAs — stacked full-width pills */}
        <div className="flex flex-col gap-[12px] w-full">
          {ctas.map((cta) => (
            <MobileCTAButton key={cta.label} {...cta} />
          ))}
        </div>
      </header>
    </>
  );
}
