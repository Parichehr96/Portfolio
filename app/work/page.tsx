"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "../_components/CTAButton";
import LinkExternalIcon from "../_components/LinkExternalIcon";
import { useIsMobile } from "../_components/useIsMobile";
import {
  EXPERIENCES,
  EXPERIENCE_SECTIONS,
  FALLBACK_PREVIEW,
  type Experience,
} from "../_data/experiences";

/* === FIGMA DESIGN TOKENS (Work, node 300:2201) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Bio Section header (gap-12, w=1272):
     - "I'm experienced in a range,"      Solway Regular 44/52 navy
     - "confidently adapt to the context." Solway Regular 20/24 tracking-2 navy
   Bio Container (h=665, gap-40, pb-80):
     - Project preview frame on the LEFT (h-full aspect-square,
       viewTransitionName matches the home/about/contact hero)
     - Text and Experiences Container on the RIGHT (flex-1, gap-32):
       · "My Experiences" Solway Medium 20/26
       · 9 experience rows. The selected row renders a cream pill
         (Figma 302:2414, bg #F9F5EB, px-24 py-12, rounded-122) with
         "Visit" + name 22/28 + full date, all in navy-darker. The pill
         bg is rendered DIRECTLY on the row container so it stays pixel-
         locked to the content. Unselected rows show name 16/24 +
         dashed leader + year-only date 12/16 at 50% opacity.
       · Primary "GET IN TOUCH" → /contact (Cream bg)
       · Secondary "MY CV" (Cream Dark border) — no destination yet.
   Floating nav: rendered by ScaledShell (Work active = position 2).
============================================================= */

const SOLWAY = "var(--font-solway), serif";

// Dashed leader pattern: 4 px dash, 4 px gap, repeats horizontally to fill
// any width. Background-image-based so the same span renders crisply on
// any viewport / scale without re-counting characters.
const DASH_GRADIENT =
  "repeating-linear-gradient(to right, #7E7F85 0, #7E7F85 4px, transparent 4px, transparent 8px)";

// Two easings, picked deliberately:
//   BUBBLY — overshoots past the target so it pops on layout properties
//     (padding, font-size, gap, border-radius, font-weight, transform).
//     y2 = 1.7 gives a noticeable bounce — value crests ~7% past target
//     around the middle of the curve before settling. Reads as a soft
//     spring on size changes.
//   SMOOTH — Material's ease-out, no overshoot. Used for COLOR and
//     OPACITY: overshoot on those properties dips past the destination
//     (a fade-out briefly goes "even more transparent" before clamping
//     back), which the eye reads as a flicker / brief glitch where the
//     cream pill appears to vanish then return.
// All durations are synchronized at 500 ms so opacity, bg, padding,
// transform, and font-size all start and end together — that prevents
// timing mismatches where one property finishes early and produces a
// between-states "unselected" appearance during the transition. 500 ms
// is intentionally long enough for the spring to read as bouncy
// without feeling laggy.
const BUBBLY = "cubic-bezier(0.34, 1.7, 0.64, 1)";
const SMOOTH = "cubic-bezier(0.4, 0, 0.2, 1)";
const T = 500;
const ROW_TRANSITION = [
  `background-color ${T}ms ${SMOOTH}`,
  `border-radius ${T}ms ${BUBBLY}`,
  `padding ${T}ms ${BUBBLY}`,
  `gap ${T}ms ${BUBBLY}`,
  `transform ${T}ms ${BUBBLY}`,
  `opacity ${T}ms ${SMOOTH}`,
].join(", ");
const TEXT_TRANSITION = [
  `font-size ${T}ms ${BUBBLY}`,
  `line-height ${T}ms ${BUBBLY}`,
  `letter-spacing ${T}ms ${BUBBLY}`,
  `font-weight ${T}ms ${BUBBLY}`,
  `color ${T}ms ${SMOOTH}`,
].join(", ");

/** Compact year format for unselected rows (Figma 365:21144 etc.):
 *  "Apr 2021 - Nov 2021" → "2021"  (single year — start == end)
 *  "May 2021 - Sep 2022" → "2021 - 2022"
 *  Selected rows keep the full month-year range untouched. */
function yearsOnly(dateRange: string): string {
  const matches = dateRange.match(/\d{4}/g);
  if (!matches || matches.length === 0) return dateRange;
  const first = matches[0];
  const last = matches[matches.length - 1];
  return first === last ? first : `${first} - ${last}`;
}

function ExperienceRow({
  item,
  selected,
}: {
  item: Experience;
  selected: boolean;
}) {
  // Figma 302:2414 — selected = cream pill (bg #F9F5EB, px-24 py-12,
  // rounded-122) with name 22/28 + date 16/24 in navy-darker (#111323).
  // Unselected = 50% opacity, name 16/24 + dashed leader + date 12/16
  // (Solway Medium, year-only) in #1B2249.
  //
  // Single DOM tree across both states (name and dashed-leader always
  // rendered) so CSS transitions on font-size, padding, gap, etc. apply
  // continuously — the cream pill bubbles in/out smoothly when the user
  // hovers between rows. Final values are exact Figma values, so every
  // resting hover state is still pixel-perfect.
  const selectedColor = "#111323";
  const unselectedColor = "#1B2249";
  const nameColor = selected ? selectedColor : unselectedColor;
  const dateColor = selected ? selectedColor : unselectedColor;
  const dateText = selected ? item.date : yearsOnly(item.date);

  return (
    <div
      className="w-full flex items-center"
      style={{
        gap: selected ? 8 : 12,
        paddingLeft: selected ? 24 : 0,
        paddingRight: selected ? 24 : 0,
        paddingTop: selected ? 12 : 0,
        paddingBottom: selected ? 12 : 0,
        backgroundColor: selected ? "#F9F5EB" : "transparent",
        borderRadius: selected ? 122 : 0,
        // Subtle scale pop — the unselected state sits at 0.97, and
        // becoming selected springs it up to 1.0 via the BUBBLY curve,
        // which crests around 1.03 before settling. Combined with the
        // padding/gap/font-size bubble, the cream pill feels like it
        // "lands" with a spring instead of inflating linearly.
        transform: selected ? "scale(1)" : "scale(0.97)",
        transformOrigin: "left center",
        opacity: selected ? 1 : 0.5,
        transition: ROW_TRANSITION,
      }}
    >
      <div className="flex-1 min-w-0 flex items-end" style={{ gap: 4 }}>
        <p
          className="whitespace-nowrap shrink-0"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: selected ? 22 : 14,
            lineHeight: selected ? "28px" : "20px",
            letterSpacing: selected ? "0px" : "0.25px",
            color: nameColor,
            transition: TEXT_TRANSITION,
          }}
        >
          {item.name}
        </p>
        {/* Dashed leader stays in the DOM in both states — it's flex-1
            so it fills the space between name and date. When selected
            it fades to opacity 0 so the cream pill behind reads as a
            clean highlight. Keeping it always-rendered means the row's
            DOM doesn't change on hover, so the bubbly transitions on
            font-size/padding/gap aren't interrupted by element swaps. */}
        <span
          className="flex-1 min-w-0 self-end"
          style={{
            height: 1,
            backgroundImage: DASH_GRADIENT,
            backgroundRepeat: "repeat-x",
            backgroundSize: "100% 1px",
            marginBottom: 4,
            opacity: selected ? 0 : 1,
            transition: `opacity ${T}ms ${SMOOTH}`,
          }}
          aria-hidden
        />
      </div>
      <p
        className="whitespace-nowrap shrink-0"
        style={{
          fontFamily: SOLWAY,
          fontWeight: selected ? 400 : 500,
          fontSize: selected ? 16 : 12,
          lineHeight: selected ? "24px" : "16px",
          letterSpacing: "0.5px",
          color: dateColor,
          transition: TEXT_TRANSITION,
        }}
      >
        {dateText}
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
  item,
  selected,
  onSelect,
  stage,
}: {
  item: Experience;
  selected: boolean;
  onSelect: () => void;
  stage: number;
}) {
  const inner = <ExperienceRow item={item} selected={selected} />;
  // No outer padding — the row itself owns its padding (selected =
  // px-24 py-12, unselected = none) so the cream pill bg, rendered on
  // the row container, is pixel-locked to the row's content box.
  const baseClass =
    "relative block w-full no-underline anim-bubbly-grow";
  const stageStyle: React.CSSProperties = {
    transformOrigin: "left center",
    ["--stage" as string]: stage,
  };
  if (item.caseStudy) {
    return (
      <a
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
  // ONTON (idx 1, in the Featured Case Studies section) is selected on
  // mount per Figma 300:2201.
  const [selectedIdx, setSelectedIdx] = useState(1);

  const currentExperience = EXPERIENCES[selectedIdx];
  const currentPreview = currentExperience?.preview ?? FALLBACK_PREVIEW;

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[40px] px-[120px] gap-[80px]">
        {/* Bio Section header (Figma 300:2203) — title is Solway 44/52
            with no letter-spacing; subtitle is Solway 20/24 tracking 2px.
            Title is whitespace-nowrap per the design. */}
        <div className="w-full flex flex-col items-start gap-[12px] text-[#1F2753]">
          <p
            className="w-full whitespace-nowrap anim-bubbly-grow"
            style={{
              fontSize: 44,
              lineHeight: "52px",
              transformOrigin: "left center",
              ["--stage" as string]: 0,
            }}
          >
            I&rsquo;m experienced in a range,
          </p>
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: 20,
              lineHeight: "24px",
              letterSpacing: "2px",
              transformOrigin: "left center",
              ["--stage" as string]: 1,
            }}
          >
            confidently adapt to the context.
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
                {/* Industry · Company line (Figma 375:4586) — the
                    project name now lives only inside the selected
                    pill in the experience list, so the meta line
                    under the preview reduces to industry · company.
                    items-end so the smaller "PomeGroup" baselines
                    under the bigger "Web3" without a baseline jump. */}
                <div
                  key={`meta-${selectedIdx}`}
                  className="flex items-end gap-[8px] anim-fade whitespace-nowrap"
                  style={{ animationDuration: "400ms" }}
                >
                  {currentExperience.industry && (
                    <>
                      <p
                        className="shrink-0"
                        style={{
                          fontFamily: SOLWAY,
                          fontWeight: 300,
                          fontSize: 16,
                          lineHeight: "24px",
                          letterSpacing: "0.15px",
                          color: "#1B2249",
                        }}
                      >
                        {currentExperience.industry}
                      </p>
                      <p
                        className="shrink-0"
                        style={{
                          fontFamily: SOLWAY,
                          fontWeight: 400,
                          fontSize: 16,
                          lineHeight: "24px",
                          letterSpacing: "0.15px",
                          color: "#1B2249",
                        }}
                      >
                        ·
                      </p>
                    </>
                  )}
                  <p
                    className="shrink-0"
                    style={{
                      fontFamily: SOLWAY,
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                      color: "#7E7F85",
                    }}
                  >
                    {currentExperience.short}
                  </p>
                </div>
                {/* Description (Figma 375:4589) — Solway Regular 16/24,
                    letterSpacing 0.5, navy. anim-fade keyed by
                    selectedIdx so it follows the hover. */}
                {currentExperience.description && (
                  <p
                    key={`desc-${selectedIdx}`}
                    className="w-full anim-fade"
                    style={{
                      fontFamily: SOLWAY,
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: "24px",
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
              CTA to the bottom of the 606-tall bio container, sitting
              just above the FloatingNav. */}
          <div className="flex-1 min-w-0 h-full flex flex-col items-start gap-[32px]">
            {/* Experience list — three named sections (Figma 429:3498
                / 429:3499 / 429:3546) distributed via justify-between
                across the column. Inside each section, header + items
                use gap-16 (16 px). The selected row renders its cream
                pill bg directly on the row container so the box stays
                pixel-locked to the row's content + padding. */}
            <div className="w-full flex flex-col items-start justify-between flex-1 min-h-0 rounded-[24px]">
              {/* Build stages with a pure reduce so the cascade is a
                  single continuous flow (0.4 stage = 64 ms apart)
                  across every header and item — no pause at section
                  boundaries. Each section consumes 1 stage for its
                  header + N stages for its items; the next section
                  picks up immediately from where the previous left off. */}
              {EXPERIENCE_SECTIONS.reduce<{
                start: number;
                nodes: React.ReactNode[];
              }>(
                (acc, section) => {
                  const headerStage = acc.start;
                  const itemCount = section.end - section.start;
                  const itemStages = Array.from(
                    { length: itemCount },
                    (_, i) => headerStage + 0.4 * (i + 1),
                  );
                  const nextStart = headerStage + 0.4 * (itemCount + 1);
                  const node = (
                    <div
                      key={section.label}
                      className="w-full flex flex-col items-start gap-[16px]"
                    >
                      <p
                        className="w-full anim-bubbly-grow"
                        style={{
                          fontFamily: SOLWAY,
                          fontWeight: 400,
                          fontSize: 16,
                          lineHeight: "24px",
                          letterSpacing: "0.15px",
                          color: "#111323",
                          transformOrigin: "left center",
                          ["--stage" as string]: headerStage,
                        }}
                      >
                        {section.label}
                      </p>
                      <div className="w-full flex flex-col items-start gap-[16px]">
                        {EXPERIENCES.slice(section.start, section.end).map(
                          (item, i) => {
                            const flatIdx = section.start + i;
                            return (
                              <ExperienceRowItem
                                key={`${item.name}-${flatIdx}`}
                                item={item}
                                selected={selectedIdx === flatIdx}
                                onSelect={() => setSelectedIdx(flatIdx)}
                                stage={itemStages[i]}
                              />
                            );
                          },
                        )}
                      </div>
                    </div>
                  );
                  return { start: nextStart, nodes: [...acc.nodes, node] };
                },
                { start: 2, nodes: [] },
              ).nodes}
            </div>

            {/* CTA — Figma 319:2261 now shows only "MY CV" full-width
                across the row (no "Get in touch" pill). */}
            <div className="w-full flex items-start shrink-0">
              <span
                className="anim-bubbly-grow flex-1 flex"
                style={{ ["--stage" as string]: 8 }}
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
          I&rsquo;m experienced in a range,
        </p>
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontSize: 16,
            lineHeight: "20px",
            letterSpacing: "2px",
            transformOrigin: "left center",
            ["--stage" as string]: 1,
          }}
        >
          confidently adapt to the context.
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
