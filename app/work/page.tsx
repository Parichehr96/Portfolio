"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CTAButton from "../_components/CTAButton";
import LinkExternalIcon from "../_components/LinkExternalIcon";
import { useIsMobile } from "../_components/useIsMobile";
import {
  EXPERIENCES,
  FALLBACK_PREVIEW,
  type Experience,
} from "../_data/experiences";

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

function WorkDesktop() {
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

  const currentExperience = EXPERIENCES[selectedIdx];
  const currentPreview = currentExperience?.preview ?? FALLBACK_PREVIEW;

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
            layer; right column staggers individually. Height + pb match
            Figma 300:2208 so the CTAs at the bottom of the right column
            land just above the FloatingNav (top:854) and never get
            covered by it. */}
        <div
          className="w-full flex items-start justify-center overflow-hidden"
          style={{
            height: 606,
            paddingBottom: 16,
            gap: 40,
          }}
        >
          {/* Project preview column — image on top + name/company/industry
              line + description (Figma 302:2375). The frame's
              `viewTransitionName: work-preview` fades cleanly between
              /work and the other main pages. The metadata + description
              swap with the currently-hovered experience via React state. */}
          <div className="h-full aspect-square shrink-0 flex flex-col gap-[12px] py-[8px] overflow-hidden">
            <div
              className="relative w-full overflow-hidden"
              style={{
                viewTransitionName: "work-preview",
                aspectRatio: "1 / 1",
                flex: "0 1 auto",
                minHeight: 0,
              }}
            >
              <img
                key={selectedIdx}
                src={currentPreview}
                alt=""
                className="absolute inset-0 w-full h-full object-cover block anim-fade"
                style={{ animationDuration: "400ms" }}
              />
            </div>
            {currentExperience && (
              <>
                {/* Name · Company · Industry line — anim-fade swaps with
                    selectedIdx so it cross-fades when hovering rows. */}
                <div
                  key={`meta-${selectedIdx}`}
                  className="flex items-start gap-[12px] anim-fade whitespace-nowrap"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                    animationDuration: "400ms",
                  }}
                >
                  <p
                    className="shrink-0"
                    style={{
                      fontFamily: SPACE_GROTESK,
                      fontWeight: 400,
                      color: "#111323",
                    }}
                  >
                    {currentExperience.name}
                  </p>
                  <p
                    className="shrink-0"
                    style={{
                      fontFamily: SOLWAY,
                      fontWeight: 400,
                      color: "#1B2249",
                    }}
                  >
                    ·
                  </p>
                  <p
                    className="shrink-0"
                    style={{
                      fontFamily: SOLWAY,
                      fontWeight: 300,
                      color: "#7E7F85",
                    }}
                  >
                    {currentExperience.short}
                  </p>
                  {currentExperience.industry && (
                    <>
                      <p
                        className="shrink-0"
                        style={{
                          fontFamily: SOLWAY,
                          fontWeight: 400,
                          color: "#1B2249",
                        }}
                      >
                        ·
                      </p>
                      <p
                        className="shrink-0"
                        style={{
                          fontFamily: SOLWAY,
                          fontWeight: 300,
                          color: "#7E7F85",
                        }}
                      >
                        {currentExperience.industry}
                      </p>
                    </>
                  )}
                </div>
                {/* Description — Solway Medium 12/16, also anim-fade keyed
                    by selectedIdx so it follows the hover. */}
                {currentExperience.description && (
                  <p
                    key={`desc-${selectedIdx}`}
                    className="w-full anim-fade"
                    style={{
                      fontFamily: SOLWAY,
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "16px",
                      letterSpacing: "0.5px",
                      color: "#1F2753",
                      animationDuration: "400ms",
                    }}
                  >
                    {currentExperience.description}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Text and Experiences Container — h-full so the inner
              experience-list flexes (justify-between) and pushes the
              CTAs to the bottom of the 606-tall bio container, sitting
              just above the FloatingNav. */}
          <div className="flex-1 min-w-0 h-full flex flex-col items-start gap-[32px]">
            {/* "My Experiences" label — stage 2 */}
            <p
              className="w-full text-[#5A5D70] anim-bubbly-grow shrink-0"
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

            {/* Experience list — flex-1 + justify-between (Figma
                302:2360): the 9 rows distribute evenly between header
                and CTAs so the column always fills the bio container
                regardless of row count. */}
            <div
              ref={containerRef}
              className="relative w-full flex flex-col items-start justify-between flex-1 min-h-0 rounded-[24px]"
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

/* === Mobile (Figma 319:1666) ===
   Header (title + sub) at the top, then a fixed-height preview image
   (h=282) showing the currently selected experience, then "My
   Experiences" label + a vertically scrollable list with a 2 px
   scrollbar on the right. Tapping a row promotes it to selected
   (navy pill, larger type, full info). Below the list, the two CTAs
   stick to the bottom; the FloatingNav is managed by ScaledShell.

   Type scales:
     - Title       Solway Regular 32/40 navy
     - Sub         Solway Regular 16/20 navy
     - Section     Solway Medium 20/26 grey-navy
     - Other rows  Solway Regular 12.8/19.2 navy-dark, date 10.4/19.2 50% navy-dark
     - Selected    Solway Regular 18/24 white, short 13/20 white,
                   date 13/24 white, navy bg p-8 rounded-8 */
function MobileExperienceRow({
  item,
  selected,
  onSelect,
}: {
  item: Experience;
  selected: boolean;
  onSelect: () => void;
}) {
  const isCaseStudy = !!item.caseStudy;

  if (selected) {
    const innerSelected = (
      <div className="bg-[#1F2753] flex items-center p-[8px] rounded-[8px] w-full gap-[8px]">
        <div className="flex-1 min-w-0 flex gap-[8px] items-center">
          <p
            className="font-normal whitespace-nowrap shrink-0"
            style={{
              fontFamily: SOLWAY,
              fontSize: 18,
              lineHeight: "24px",
              letterSpacing: "0.15px",
              color: "#FFFFFF",
            }}
          >
            {item.name}
          </p>
          <p
            className="whitespace-nowrap shrink-0"
            style={{
              fontFamily: SOLWAY,
              fontWeight: 300,
              fontSize: 13,
              lineHeight: "20px",
              letterSpacing: "0.15px",
              color: "#FFFFFF",
            }}
          >
            {item.short}
          </p>
          <LinkExternalIcon light />
        </div>
        <p
          className="whitespace-nowrap shrink-0"
          style={{
            fontFamily: SOLWAY,
            fontSize: 13,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            color: "#FFFFFF",
          }}
        >
          {item.date}
        </p>
      </div>
    );

    if (isCaseStudy) {
      return (
        <a
          href={item.caseStudy}
          className="block w-full no-underline anim-bubbly-grow"
          style={{ color: "inherit" }}
          aria-label={`${item.name} — open case study`}
        >
          {innerSelected}
        </a>
      );
    }
    return (
      <button
        type="button"
        onClick={onSelect}
        className="block w-full text-left anim-bubbly-grow"
      >
        {innerSelected}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full flex items-center px-[8px] opacity-80 anim-bubbly-grow"
      aria-label={item.name}
    >
      <p
        className="flex-1 min-w-0 text-left whitespace-nowrap"
        style={{
          fontFamily: SOLWAY,
          fontSize: 12.8,
          lineHeight: "19.2px",
          letterSpacing: "0.12px",
          color: "#1B2249",
        }}
      >
        {item.name}
      </p>
      <p
        className="whitespace-nowrap shrink-0 opacity-50"
        style={{
          fontFamily: SOLWAY,
          fontSize: 10.4,
          lineHeight: "19.2px",
          letterSpacing: "0.12px",
          color: "#1B2249",
        }}
      >
        {item.date}
      </p>
    </button>
  );
}

function MobileScrollbar({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState({ height: 32, top: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const update = () => {
      const trackHeight = track.clientHeight;
      const ratio = el.clientHeight / el.scrollHeight;
      const height = Math.max(32, Math.round(ratio * trackHeight));
      const maxScroll = el.scrollHeight - el.clientHeight;
      const top =
        maxScroll > 0
          ? Math.round((el.scrollTop / maxScroll) * (trackHeight - height))
          : 0;
      setThumb({ height, top });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(track);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollRef]);

  return (
    <div
      ref={trackRef}
      className="bg-[#EDEAE4] rounded-[4px] relative shrink-0"
      style={{ width: 2, height: "100%" }}
    >
      <div
        className="absolute bg-[#28315F] rounded-[4px] -translate-x-1/2 left-1/2"
        style={{
          width: 4,
          height: thumb.height,
          top: thumb.top,
          transition:
            "top 280ms cubic-bezier(0.34, 1.56, 0.64, 1), height 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          willChange: "top, height",
        }}
      />
    </div>
  );
}

function WorkMobile() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const currentExperience = EXPERIENCES[selectedIdx];
  const currentPreview = currentExperience?.preview ?? FALLBACK_PREVIEW;

  /* Mobile layout uses absolute positions inside the fixed 390×844
     canvas — guarantees the preview frame and CTAs land at the figma
     locations with no flexbox-collapse surprises. The experiences
     list fills the gap between the header and the CTAs and scrolls
     internally. Reserved bottom space is 120 px (88 nav + 32 nav-pad)
     so CTAs sit immediately above the FloatingNav. */
  return (
    <>
      {/* Title section — top, stages 0/1 */}
      <div
        className="absolute flex flex-col items-start text-[#1F2753]"
        style={{ left: 16, right: 16, top: 32, gap: 8 }}
      >
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontSize: 32,
            lineHeight: "40px",
            transformOrigin: "left center",
            ["--stage" as string]: 0,
          }}
        >
          I&rsquo;ve worked in multiple industries...
        </p>
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontSize: 16,
            lineHeight: "20px",
            transformOrigin: "left center",
            ["--stage" as string]: 1,
          }}
        >
          Saas, B2B, ERP, Startup, Crypto, etc.
        </p>
      </div>

      {/* Preview image — FIXED frame (Figma 319:1672, h=282). z-10 so
          it sits in front of any background; cross-fades on selection.
          Stage 2: fades in after the title rows, before the experience
          list rows (stages 4+) start their bubbly entrance. */}
      <div
        className="absolute overflow-hidden anim-fade-stage"
        style={{
          left: 16,
          right: 16,
          top: 122,
          height: 282,
          viewTransitionName: "work-preview",
          zIndex: 10,
          ["--stage" as string]: 2,
        }}
      >
        <img
          key={selectedIdx}
          src={currentPreview}
          alt=""
          className="absolute inset-0 w-full h-full object-cover block anim-fade"
          style={{ animationDuration: "400ms" }}
        />
      </div>

      {/* "My Experiences" label (image bottom y=404 + 20 gap = 424) */}
      <p
        className="absolute text-[#5A5D70] anim-bubbly-grow"
        style={{
          left: 16,
          right: 16,
          top: 424,
          fontWeight: 500,
          fontSize: 20,
          lineHeight: "26px",
          letterSpacing: "0.5px",
          transformOrigin: "left center",
          ["--stage" as string]: 3,
        }}
      >
        My Experiences
      </p>

      {/* Experience list + scrollbar — fills the gap between the
          header (bottom y=450) and the CTAs (top y=662): top=466,
          bottom=646, height=180. */}
      <div
        className="absolute flex"
        style={{
          left: 16,
          right: 16,
          top: 466,
          height: 180,
          gap: 8,
        }}
      >
        <div
          ref={scrollRef}
          className="no-scrollbar flex-1 min-w-0 overflow-y-auto flex flex-col"
          style={{
            scrollBehavior: "smooth",
            overscrollBehavior: "contain",
            gap: 12,
          }}
        >
          {EXPERIENCES.map((item, i) => (
            <span
              key={`${item.name}-${i}`}
              className="block w-full anim-bubbly-grow shrink-0"
              style={{
                transformOrigin: "left center",
                ["--stage" as string]: 4 + i * 0.25,
              }}
            >
              <MobileExperienceRow
                item={item}
                selected={selectedIdx === i}
                onSelect={() => setSelectedIdx(i)}
              />
            </span>
          ))}
        </div>
        <MobileScrollbar scrollRef={scrollRef} />
      </div>

      {/* CTAs — Get in touch + MY CV. Sit just above the nav (bottom
          120 = nav-pad 32 + nav-height 88). */}
      <div
        className="absolute flex items-start"
        style={{ left: 16, right: 16, bottom: 136, gap: 12 }}
      >
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
    </>
  );
}

export default function Work() {
  const isMobile = useIsMobile();
  return isMobile ? <WorkMobile /> : <WorkDesktop />;
}
