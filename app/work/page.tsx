"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import CTAButton from "../_components/CTAButton";
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

/** Behance arrow next to early-works names (Figma 300:2201 / 449:8726).
 *  Two modes:
 *    - `interactive` (default): standalone `<a>` with `stopPropagation`,
 *      for use inside non-link parents like the mobile tail's
 *      `<div role="button">` select rows. The icon can be clicked
 *      directly to open the external URL without first selecting.
 *    - `interactive={false}`: visual-only `<span>`, used inside row
 *      wrappers that are *already* anchors (`ExperienceRowItem`,
 *      `ExperienceDetail`) — nesting anchors is invalid HTML, and the
 *      parent anchor already handles the click for the whole row. */
function ExternalLinkIcon({
  href,
  label,
  interactive = true,
}: {
  href: string;
  label: string;
  interactive?: boolean;
}) {
  if (!interactive) {
    return (
      <span
        className="shrink-0 inline-block relative"
        style={{ width: 20, height: 20 }}
        aria-hidden
      >
        <img
          src="/assets/icon-link-external.svg"
          alt=""
          className="absolute inset-0 w-full h-full block"
        />
      </span>
    );
  }
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={stop}
      onMouseDown={stop}
      aria-label={`Open ${label} on Behance`}
      className="shrink-0 inline-block relative cursor-pointer hover:opacity-80 transition-opacity duration-200"
      style={{ width: 20, height: 20 }}
    >
      <img
        src="/assets/icon-link-external.svg"
        alt=""
        className="absolute inset-0 w-full h-full block"
      />
    </a>
  );
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
        {item.externalUrl && (
          <ExternalLinkIcon
            href={item.externalUrl}
            label={item.name}
            interactive={false}
          />
        )}
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
  if (item.externalUrl) {
    return (
      <a
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        style={{ cursor: "pointer", color: "inherit", ...stageStyle }}
        onMouseEnter={onSelect}
        onFocus={onSelect}
        aria-label={`${item.name} — open on Behance`}
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

/* === Mobile (Figma 439:3667 / 439:3864) ============================
   Section carousel — three "tiers" (Featured / Supporting / Early)
   navigable via the chevrons next to the section title or by swiping
   the page horizontally. Tiers wrap: → from Early Works loops back
   to Featured.

   Within a tier, the SELECTED experience renders as a cream pill at
   the TOP of the list (full content: name + industry + short + date
   + description). Below it, the remaining items render as a rotated
   tail of the section's experience array. The user can:
     - tap an unselected row → it becomes the selected pill (with the
       rest of the list rotating around it),
     - swipe vertically → advance / retreat the rotation,
   and the rotation wraps so scrolling past the last item loops back
   to the first.

   Scroll indicator (right edge): only appears when the section has
   more than 3 items (1 selected + 2 unselected fit in the frame
   without overflow). Track height matches the list height; thumb
   height = trackHeight / N, thumb top = trackHeight × selectedIdx/N.
==================================================================== */

function ChevronLeftIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="#111323"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="#111323"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkMobile() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const sectionCount = EXPERIENCE_SECTIONS.length;
  const section = EXPERIENCE_SECTIONS[sectionIdx];
  const sectionLabel = section.label.replace(/\s*-\s*$/, "");
  const sectionItems = EXPERIENCES.slice(section.start, section.end);
  const itemCount = sectionItems.length;
  // Defensive clamp: setSelectedIdx(0) is called on every section
  // change, but during the same render it's still possible (after
  // hot reload etc.) for selectedIdx to be out of range — keep it
  // valid so currentExperience never becomes undefined.
  const safeSelectedIdx = ((selectedIdx % itemCount) + itemCount) % itemCount;
  const currentExperience = sectionItems[safeSelectedIdx];
  const currentPreview = currentExperience?.preview ?? FALLBACK_PREVIEW;

  // Rotated list: selected first, then the rest in original order with
  // wraparound. The visible tail is capped at 2 items so the frame
  // always shows "1 selected + 2 unselected" — extra items (e.g. the
  // 4th in Featured) live in DOM only after the user advances the
  // rotation past them. The scroll indicator (only visible when the
  // section has > 3 items) hints that more rows exist beyond the
  // visible two.
  const rotated = sectionItems.map(
    (_, i) => sectionItems[(safeSelectedIdx + i) % itemCount],
  );
  const tail = rotated.slice(1, 3);

  const goSection = (delta: number) => {
    setSectionIdx((s) => ((s + delta) % sectionCount + sectionCount) % sectionCount);
    setSelectedIdx(0);
  };
  const goItem = (delta: number) => {
    setSelectedIdx(
      (i) => ((i + delta) % itemCount + itemCount) % itemCount,
    );
  };

  // Touch swipe — horizontal moves between sections, vertical moves
  // between items. Threshold 40 px filters out incidental finger jitter;
  // > 600 ms is treated as a slow drag and ignored. The dominant axis
  // (max of |dx|, |dy|) wins so a near-diagonal swipe still resolves to
  // one intent.
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    touchStart.current = null;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const dt = Date.now() - start.t;
    if (dt > 600) return;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const THRESHOLD = 40;
    if (absDx > absDy && absDx > THRESHOLD) {
      goSection(dx > 0 ? -1 : 1);
    } else if (absDy > absDx && absDy > THRESHOLD) {
      goItem(dy > 0 ? -1 : 1);
    }
  };

  // Wheel/trackpad — same intent as touch, but fired by mouse wheel,
  // trackpad pan, or DevTools mobile-mode (which routes wheel events
  // even when touch isn't emulated). The lock prevents trackpad
  // momentum scroll from over-advancing — one item per ~250 ms,
  // one section per ~400 ms. Pinch-zoom (ctrlKey) is ignored.
  const wheelLock = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) return;
    const now = Date.now();
    if (now < wheelLock.current) return;
    const absDx = Math.abs(e.deltaX);
    const absDy = Math.abs(e.deltaY);
    if (absDx < 4 && absDy < 4) return;
    if (absDx > absDy * 1.5) {
      wheelLock.current = now + 400;
      goSection(e.deltaX > 0 ? 1 : -1);
    } else if (absDy > absDx * 1.5) {
      wheelLock.current = now + 250;
      goItem(e.deltaY > 0 ? 1 : -1);
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col items-center bg-white"
      style={{
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 32,
        // 128 = 32 (nav bottom margin) + 88 (nav height) + 8 (gap
        // between MY CV CTA and the nav). Larger values push the
        // experience list shorter and clip the second unselected row,
        // so 8 px is the smallest readable gap that keeps the row
        // visible.
        paddingBottom: 128,
        gap: 16,
        touchAction: "pan-y",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      {/* Bio Section header — title + subtitle (Figma 439:3668) */}
      <div className="w-full flex flex-col items-start shrink-0">
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 22,
            lineHeight: "28px",
            color: "#1F2753",
            transformOrigin: "left center",
            ["--stage" as string]: 0,
          }}
        >
          I&rsquo;m experienced in a range,
        </p>
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "20px",
            letterSpacing: "0.25px",
            color: "#1F2753",
            transformOrigin: "left center",
            ["--stage" as string]: 0.4,
          }}
        >
          confidently adapt to the context.
        </p>
      </div>

      {/* Bio Container — flex-1 fills remaining vertical space */}
      <div
        className="w-full flex-1 min-h-0 flex flex-col items-center"
        style={{ gap: 16 }}
      >
        {/* Section header: chevron + label + chevron (Figma 439:3861) */}
        <div
          className="w-full flex items-center justify-center anim-bubbly-grow"
          style={{
            gap: 16,
            paddingTop: 4,
            paddingBottom: 4,
            transformOrigin: "center center",
            ["--stage" as string]: 0.8,
          }}
        >
          <button
            type="button"
            onClick={() => goSection(-1)}
            aria-label="Previous section"
            className="shrink-0 flex items-center justify-center cursor-pointer"
            style={{ width: 24, height: 24 }}
          >
            <ChevronLeftIcon />
          </button>
          <p
            key={`label-${sectionIdx}`}
            className="flex-1 min-w-0 anim-bounce-pop"
            style={{
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "24px",
              letterSpacing: "0.15px",
              color: "#111323",
              textAlign: "center",
            }}
          >
            {sectionLabel}
          </p>
          <button
            type="button"
            onClick={() => goSection(1)}
            aria-label="Next section"
            className="shrink-0 flex items-center justify-center cursor-pointer"
            style={{ width: 24, height: 24 }}
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Profile image — h-282, view-transition target shared with
            the desktop preview frame so the image morphs cleanly when
            navigating away and back. The Image is keyed by its *src*
            so it only re-mounts (and fades) when the actual preview
            asset changes — when consecutive selections share the
            FALLBACK_PREVIEW the DOM is reused and there's no flicker. */}
        <div
          className="w-full relative overflow-hidden shrink-0"
          style={{
            height: 282,
            viewTransitionName: "work-preview",
          }}
        >
          <Image
            key={currentPreview}
            src={currentPreview}
            alt=""
            fill
            sizes="358px"
            className="object-cover block anim-fade"
            style={{ animationDuration: "400ms" }}
          />
        </div>

        {/* Text and Experiences Container — flex-1 absorbs whatever
            vertical space is left between the image and the CTA so
            the selected pill stays anchored at top and the unselected
            list grows to fill the rest. */}
        <div
          className="w-full flex-1 min-h-0 flex items-start"
          style={{ gap: 8 }}
        >
          <div
            className="flex-1 min-w-0 h-full overflow-hidden flex flex-col items-center"
            style={{ gap: 12 }}
          >
            {/* Selected pill — cream bg, 18/24 name + 12/16 industry +
                12/16 light short + 12/24 date + 11/16 light description.
                Wrapper is keyed by *sectionIdx only* so the bouncy
                scale-pop only fires on tier change. Within a tier,
                the SelectedPill stays mounted and its internal name+
                date row cross-transitions (slide up + fade) while the
                industry / company / description update in place. */}
            <div
              key={`pill-${sectionIdx}`}
              className="w-full shrink-0 anim-bounce-pop"
            >
              <SelectedPill experience={currentExperience} />
            </div>

            {/* Unselected items below — rotated tail. Same key
                strategy as the pill: bouncy pop on tier change only,
                content swaps in place when the user advances within a
                tier (60 ms delay so the tail still trails the pill on
                tier change). */}
            <div
              key={`tail-${sectionIdx}`}
              className="w-full flex flex-col items-center anim-bounce-pop"
              style={{ gap: 12, animationDelay: "60ms" }}
            >
              {tail.map((item, i) => {
                const targetIdx = (safeSelectedIdx + i + 1) % itemCount;
                return (
                  <div
                    key={`${item.name}-${targetIdx}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedIdx(targetIdx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIdx(targetIdx);
                      }
                    }}
                    className="w-full flex items-center shrink-0 cursor-pointer"
                    style={{ gap: 12, opacity: 0.5 }}
                    aria-label={`Select ${item.name}`}
                  >
                    <div
                      className="flex-1 min-w-0 flex items-end"
                      style={{ gap: 4 }}
                    >
                      <p
                        className="whitespace-nowrap shrink-0 text-left"
                        style={{
                          fontFamily: SOLWAY,
                          fontWeight: 400,
                          fontSize: 14,
                          lineHeight: "20px",
                          letterSpacing: "0.25px",
                          color: "#1B2249",
                        }}
                      >
                        {item.name}
                      </p>
                      {item.externalUrl && (
                        <ExternalLinkIcon
                          href={item.externalUrl}
                          label={item.name}
                        />
                      )}
                      <span
                        className="flex-1 min-w-0 self-end"
                        style={{
                          height: 1,
                          backgroundImage: DASH_GRADIENT,
                          backgroundRepeat: "repeat-x",
                          backgroundSize: "100% 1px",
                          marginBottom: 4,
                        }}
                        aria-hidden
                      />
                    </div>
                    <p
                      className="whitespace-nowrap shrink-0"
                      style={{
                        fontFamily: SOLWAY,
                        fontWeight: 500,
                        fontSize: 12,
                        lineHeight: "16px",
                        letterSpacing: "0.5px",
                        color: "#1B2249",
                      }}
                    >
                      {yearsOnly(item.date)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll indicator — only visible when there are more than 3
              items (selected + 2 unselected fit on screen, anything
              beyond needs the indicator to hint that more exist). */}
          {itemCount > 3 && (
            <div
              className="self-stretch overflow-hidden relative shrink-0"
              style={{
                width: 2,
                backgroundColor: "#EDEAE4",
                borderRadius: 4,
              }}
              aria-hidden
            >
              <div
                className="absolute -translate-x-1/2 left-1/2"
                style={{
                  width: 4,
                  height: `${100 / itemCount}%`,
                  top: `${(safeSelectedIdx / itemCount) * 100}%`,
                  backgroundColor: "#28315F",
                  borderRadius: 4,
                  transition:
                    "top 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            </div>
          )}
        </div>

        {/* MY CV — only CTA on mobile, matching the desktop work page */}
        <div className="w-full flex items-start shrink-0">
          <span
            className="anim-bubbly-grow flex-1 flex"
            style={{ ["--stage" as string]: 1.6 }}
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
  );
}

const NAME_STYLE: React.CSSProperties = {
  fontFamily: SOLWAY,
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "24px",
  letterSpacing: "0.15px",
  color: "#111323",
};

const DATE_STYLE: React.CSSProperties = {
  fontFamily: SOLWAY,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "24px",
  letterSpacing: "0.15px",
  color: "#111323",
};

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Selected pill — Figma 439:3682 / 439:3878. Cream bg, rounded-8,
   px-8 py-12. The name+date row at the top cross-transitions on
   selection change (previous slides up + fades out, new slides up
   from below + fades in with bubbly overshoot); the industry,
   company, and description below update in place. Wrapped as an
   anchor when the experience has a case-study route. */
function SelectedPill({ experience }: { experience: Experience | undefined }) {
  // Track the previous experience so we can render an outgoing layer
  // alongside the incoming one for the dual-layer cross-transition.
  // useLayoutEffect runs before paint, so the outgoing layer + the
  // incoming-key bump land in the same frame as the new content —
  // no flash of the new content sitting at rest before the animation
  // kicks in.
  const [outgoingExp, setOutgoingExp] = useState<Experience | null>(null);
  const [incomingTick, setIncomingTick] = useState(0);
  const lastExpRef = useRef<Experience | undefined>(undefined);

  useIsoLayoutEffect(() => {
    const last = lastExpRef.current;
    if (last && experience && last.name !== experience.name) {
      setOutgoingExp(last);
      setIncomingTick((t) => t + 1);
      lastExpRef.current = experience;
      const timer = setTimeout(() => setOutgoingExp(null), 500);
      return () => clearTimeout(timer);
    }
    lastExpRef.current = experience;
  }, [experience]);

  if (!experience) return null;

  // First mount (incomingTick === 0) renders the name + date with no
  // animation class — there's no "previous" content to slide out of
  // the way. After that, every prop change bumps incomingTick and
  // re-mounts the incoming layer with the bubbly slide-up.
  const incomingAnim = incomingTick > 0 ? "anim-pill-name-in" : "";

  const inner = (
    <div
      className="w-full flex flex-col items-start"
      style={{
        backgroundColor: "#F9F5EB",
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 12,
        gap: 8,
      }}
    >
      {/* Name + date — animated layer. Fixed-height row with two
          absolute layers (outgoing + incoming) so the previous title
          can slide up out of frame while the new title slides up into
          place, both clipped to the row's bounds by overflow:hidden. */}
      <div
        className="w-full relative"
        style={{ height: 24, overflow: "hidden" }}
      >
        {outgoingExp && (
          <div
            key={`out-${incomingTick}`}
            className="absolute inset-0 flex items-center justify-between anim-pill-name-out"
            style={{ gap: 8 }}
          >
            <div className="flex items-center min-w-0" style={{ gap: 6 }}>
              <p className="whitespace-nowrap" style={NAME_STYLE}>
                {outgoingExp.name}
              </p>
              {outgoingExp.externalUrl && (
                <ExternalLinkIcon
                  href={outgoingExp.externalUrl}
                  label={outgoingExp.name}
                  interactive={false}
                />
              )}
            </div>
            <p className="whitespace-nowrap shrink-0" style={DATE_STYLE}>
              {outgoingExp.date}
            </p>
          </div>
        )}
        <div
          key={`in-${incomingTick}`}
          className={`absolute inset-0 flex items-center justify-between ${incomingAnim}`}
          style={{ gap: 8 }}
        >
          <div className="flex items-center min-w-0" style={{ gap: 6 }}>
            <p className="whitespace-nowrap" style={NAME_STYLE}>
              {experience.name}
            </p>
            {experience.externalUrl && (
              <ExternalLinkIcon
                href={experience.externalUrl}
                label={experience.name}
                interactive={false}
              />
            )}
          </div>
          <p className="whitespace-nowrap shrink-0" style={DATE_STYLE}>
            {experience.date}
          </p>
        </div>
      </div>

      {/* Industry + company — content swaps in place on prop change.
          w-full so the column claims the pill's content width instead
          of hugging its widest child — without this a long industry
          string never wraps and grows the column past the pill. */}
      <div className="w-full flex flex-col items-start" style={{ gap: 4 }}>
        {experience.industry && (
          <p
            className="w-full"
            style={{
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "16px",
              letterSpacing: "0.5px",
              color: "#111323",
            }}
          >
            {experience.industry}
          </p>
        )}
        <p
          className="w-full"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 300,
            fontSize: 12,
            lineHeight: "16px",
            letterSpacing: "0.5px",
            color: "#111323",
          }}
        >
          {experience.short}
        </p>
      </div>

      {/* Description — content swaps in place on prop change */}
      {experience.description && (
        <p
          className="w-full text-left"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 300,
            fontSize: 11,
            lineHeight: "16px",
            letterSpacing: "0.5px",
            color: "#111323",
          }}
        >
          {experience.description}
        </p>
      )}
    </div>
  );

  if (experience.caseStudy) {
    return (
      <a
        href={experience.caseStudy}
        className="block w-full no-underline shrink-0"
        style={{ color: "inherit" }}
        aria-label={`${experience.name} — open case study`}
      >
        {inner}
      </a>
    );
  }
  if (experience.externalUrl) {
    return (
      <a
        href={experience.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full no-underline shrink-0"
        style={{ color: "inherit" }}
        aria-label={`${experience.name} — open on Behance`}
      >
        {inner}
      </a>
    );
  }
  return <div className="w-full shrink-0">{inner}</div>;
}

export default function Work() {
  const isMobile = useIsMobile();
  return isMobile ? <WorkMobile /> : <WorkDesktop />;
}
