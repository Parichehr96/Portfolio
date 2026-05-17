"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CTAButton from "../_components/CTAButton";
import LinkExternalIcon from "../_components/LinkExternalIcon";
import MobileMenuButton from "../_components/MobileMenuButton";
import { useIsMobile } from "../_components/useIsMobile";
import { useViewTransitionRouter } from "../_lib/useViewTransitionRouter";
import { fs } from "../_lib/typography";
import {
  ACADEMIC,
  CERTIFICATES,
  CONTRIBUTIONS,
  INTERESTS,
  METHODES,
  SOFT_SKILLS,
  TOOLS,
  type AcademicItem as Item,
} from "../_data/about";

/* === FIGMA DESIGN TOKENS (AboutMe, node 302:2532) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Outer flex-col gap-80, pt-80 pb-40 px-120 items-center.
   Bio Section (top, w=1272):
     - "Call me Pari," Solway Regular 60/66 tracking-2
     - "Nice to meet you!"     Solway Regular 32/40 tracking-2
   Illustration (face crop): 816×816 absolute, x=-33, top=167.
     `viewTransitionName: "hero-illustration"` → cross-page morph.
   Bio Container (w-full, h=665, pl=634, gap=40, pb=160, overflow-clip):
     - Bio Text Container (flex-1) — vertically scrollable, gap-40
         · bio paragraphs with Solway Medium emphasis spans (16/24)
         · "My Academic Background" + 2 items
         · "My Certificates" + 4 items
         · "My Skills" — 2-column (Methodes | Soft Skills + Tools)
         · "My Hobbies" — 10 icons in a row, w-596 justify-between
         · Primary "Get in touch" button → /contact (cream bg)
         · Secondary "MY EXPERIENCES" button → /work (white + cream-dark border)
     - 2 px scrollbar track + 4 px navy thumb (custom, bubbly transition)
   Floating nav: rendered by ScaledShell (About active).
============================================================= */

const SOLWAY = "var(--font-solway), serif";

function EducationRow({ item }: { item: Item }) {
  // Hover state mirrors the /work selected pill — cream bg, pill
  // radius, breathing-room padding bubble in with a bubbly easing so
  // the row reads as "bubbling up" on hover. `group/hover` on the
  // anchor means anywhere on the row triggers the inner pill state.
  const inner = (
    <div
      className="w-full flex items-end justify-center gap-[8px] rounded-[122px] group-hover:bg-[var(--color-experience-pill-bg)] group-hover:px-[24px] group-hover:py-[8px]"
      style={{
        transition:
          "background-color 300ms ease-out, padding 300ms cubic-bezier(0.34, 1.5, 0.64, 1), border-radius 300ms cubic-bezier(0.34, 1.5, 0.64, 1)",
      }}
    >
      <div className="flex-1 min-w-0 flex items-center gap-[8px]">
        <p
          className="text-[var(--color-text-primary)] whitespace-nowrap shrink-0"
          style={{
            fontSize: fs(16),
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          {item.name}
        </p>
        <div className="flex items-center shrink-0">
          <p
            className="text-[var(--color-text-muted)] whitespace-nowrap shrink-0"
            style={{
              fontSize: fs(16),
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            {item.short}
          </p>
          {item.url && <LinkExternalIcon />}
        </div>
        <span
          className="flex-1 min-w-0 overflow-hidden whitespace-nowrap text-[var(--color-text-muted)]"
          style={{
            fontSize: fs(16),
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
          aria-hidden
        >
          {".".repeat(500)}
        </span>
      </div>
      <p
        className="text-[var(--color-text-primary)] whitespace-nowrap shrink-0"
        style={{ fontSize: fs(16), lineHeight: "24px", letterSpacing: "0.15px" }}
      >
        {item.date}
      </p>
    </div>
  );
  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full no-underline cursor-pointer"
        style={{ color: "inherit" }}
        aria-label={`${item.name} — ${item.short} (opens in a new tab)`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="w-full text-[var(--color-text-secondary)]"
      style={{
        fontWeight: 500,
        fontSize: fs(20),
        lineHeight: "26px",
        letterSpacing: "0.5px",
      }}
    >
      {children}
    </p>
  );
}

function SkillsColumnHeader({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[var(--color-text-muted)] shrink-0"
      style={{ fontSize: fs(16), lineHeight: "24px", letterSpacing: "0.15px" }}
    >
      {children}
    </p>
  );
}

function SkillBullet({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[var(--color-text-primary)] shrink-0"
      style={{ fontSize: fs(16), lineHeight: "24px", letterSpacing: "0.15px" }}
    >
      · {children}
    </p>
  );
}

/* Each paragraph carries its own --stage so the 5 paragraphs bubble in
   one-by-one (stages baseStage..baseStage+4) instead of as a single block. */
function BioText({ baseStage }: { baseStage: number }) {
  const paragraphClass =
    "w-full text-[var(--color-text-secondary)] shrink-0 anim-bubbly-grow";
  const paragraphStyle = {
    fontSize: fs(16),
    lineHeight: "24px",
    letterSpacing: "0.5px",
    transformOrigin: "left top",
  } as const;
  // 2026-05 Figma rewrite (389:5415): bio collapsed from 5 long
  // paragraphs to 3 shorter ones, gap reduced from 24 → 12, no more
  // Medium-weight emphasis spans (all Solway Regular).
  return (
    <div className="w-full flex flex-col gap-[12px] shrink-0">
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage }}
      >
        I think in systems.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 1 }}
      >
        That&rsquo;s how I&rsquo;ve spent the last five years quietly
        approaching every project — figuring out where user journeys overlap,
        how roles hand off to each other, how trust travels through a product
        without exposing private data. The visible part of design is getting
        faster every month; AI can generate components, layouts, even full
        flows in seconds. What still requires craft is the system underneath,
        and that&rsquo;s where I want to keep working.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 2 }}
      >
        I&rsquo;m a product designer based in Amsterdam, currently completing
        my Master&rsquo;s at HvA. I&rsquo;ve shipped end-to-end across
        consumer apps, B2B platforms, and enterprise systems — usually as the
        only designer in the room. Looking for product teams in the
        Netherlands building complex things that need someone who can hold the
        whole picture in their head while still caring about the details.
      </p>
    </div>
  );
}

function CustomScrollbar({
  scrollRef,
  trackHeight = 505,
  fillHeight = false,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  /** Fixed track height in px (used on desktop). Ignored when
   *  `fillHeight` is true. */
  trackHeight?: number;
  /** When true, the track stretches to 100% of its parent flex column
   *  and the thumb height/top are computed from the live measured
   *  height — used by the mobile layout where the bio container is
   *  itself flex-1 inside a viewport-sized column. */
  fillHeight?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState({ height: 216, top: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const measuredTrack = fillHeight
        ? trackRef.current?.clientHeight ?? trackHeight
        : trackHeight;
      const ratio = el.clientHeight / el.scrollHeight;
      const height = Math.max(40, Math.round(ratio * measuredTrack));
      const maxScroll = el.scrollHeight - el.clientHeight;
      const top =
        maxScroll > 0
          ? Math.round(
              (el.scrollTop / maxScroll) * (measuredTrack - height)
            )
          : 0;
      setThumb({ height, top });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (fillHeight && trackRef.current) ro.observe(trackRef.current);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollRef, trackHeight, fillHeight]);

  return (
    <div
      ref={trackRef}
      className="rounded-[4px] relative shrink-0"
      style={{
        width: 2,
        height: fillHeight ? "100%" : trackHeight,
        backgroundColor: "var(--color-scroll-track)",
      }}
    >
      {/* Bubbly thumb — overshoot easing gives the indicator a slight
          spring as it tracks the scroll position. */}
      <div
        className="absolute rounded-[4px] -translate-x-1/2 left-1/2"
        style={{
          width: 4,
          height: thumb.height,
          top: thumb.top,
          backgroundColor: "var(--color-scroll-thumb)",
          transition:
            "top 280ms cubic-bezier(0.34, 1.56, 0.64, 1), height 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          willChange: "top, height",
        }}
      />
    </div>
  );
}

function AboutDesktop() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Forward wheel events from anywhere on the page to the inner bio
  // scroll container. The page itself isn't a normal document — it's
  // rendered inside ScaledShell's fixed canvas, so the browser's
  // native scroll bubbles nowhere unless the cursor is already inside
  // the scrollable bio area. Adding a window-level wheel listener
  // makes the bio scroll whenever the user wheels, regardless of
  // where the cursor sits (over the illustration, the title, the bio
  // — any of it). `behavior: "auto"` overrides the scroll container's
  // `scroll-behavior: smooth` so the forwarded scroll uses the same
  // instant per-event motion as a native wheel — matching speed
  // between scrolling over the image and scrolling inside the bio
  // itself. `deltaMode` is normalised because some browsers (most
  // notably Firefox) emit wheel deltas in lines (mode 1) or pages
  // (mode 2) instead of pixels.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // When the wheel is already happening over the scroll container
      // (or any descendant of it), let the native handler take over —
      // otherwise we'd double-scroll.
      if (el.contains(e.target as Node)) return;
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16; // lines → px
      else if (e.deltaMode === 2) delta *= el.clientHeight; // pages → px
      el.scrollBy({ top: delta, behavior: "auto" });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      {/* Illustration (face crop). Same `viewTransitionName` as the other
          three pages, so the browser auto-morphs the picture between
          their positions/sizes during navigation. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "calc(50% - 789px)",
          top: 167,
          width: 816,
          height: 816,
          viewTransitionName: "hero-illustration",
          opacity: "var(--hero-illustration-opacity)",
        }}
      >
        <img
          src="/assets/illustration-about.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Bio Section header — stage 0 (TL) + stage 1. The right-side
          theme + scale buttons now live in ScaledShell so they
          persist across navigation, freeing the title block to use
          the full 1272-wide content area. */}
      <div
        className="absolute left-[120px] top-[80px] flex flex-col items-start gap-[12px]"
        style={{ width: 1272 }}
      >
        <p
          className="w-full text-[var(--color-text-primary)] anim-bubbly-grow"
          style={{
            fontSize: fs(60),
            lineHeight: "66px",
            letterSpacing: "2px",
            transformOrigin: "left center",
            ["--stage" as string]: 0,
          }}
        >
          Call me Pari,
        </p>
        <p
          className="w-full text-[var(--color-text-primary)] anim-bubbly-grow"
          style={{
            fontSize: fs(32),
            lineHeight: "40px",
            letterSpacing: "2px",
            transformOrigin: "left center",
            ["--stage" as string]: 1,
          }}
        >
          Nice to meet you!
        </p>
      </div>

      {/* Bio Container — illustration on the left is the matching layer
          (no bubbly); each child of the scrollable bio bubbles in
          individually, staged 2..8 to flow top → bottom. */}
      <div
        className="absolute flex items-start"
        style={{
          left: 120,
          top: 314,
          width: 1272,
          height: 665,
          paddingLeft: 634,
          paddingBottom: 160,
          gap: 40,
        }}
      >
        <div
          ref={scrollRef}
          className="no-scrollbar flex-1 min-w-0 h-full overflow-y-auto flex flex-col items-start gap-[40px]"
          style={{
            scrollBehavior: "smooth",
            overscrollBehavior: "contain",
          }}
        >
          {/* Bio paragraphs — stages 2..4 (3 paragraphs after the
              2026-05 Figma rewrite). Section titles drop the previous
              "My" prefix to match Figma 319:2633 / 544:11181 /
              319:2654 / 319:2693 / 429:3595. */}
          <BioText baseStage={2} />
          <ListSection
            title="Academic Background"
            items={ACADEMIC}
            stage={5}
          />
          <ListSection
            title="Contributions"
            items={CONTRIBUTIONS}
            stage={6}
          />
          <ListSection
            title="Certificates"
            items={CERTIFICATES}
            stage={7}
          />

          {/* Skills — Methodes | (Soft Skills + Tools) — stage 8 */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 8,
            }}
          >
            <SectionTitle>Skills</SectionTitle>
            <div className="w-full flex items-start rounded-[24px] whitespace-nowrap">
              <div className="flex-1 min-w-0 flex flex-col items-start justify-center gap-[8px]">
                <SkillsColumnHeader>Methodes</SkillsColumnHeader>
                <div className="flex flex-col items-start justify-center gap-[4px]">
                  {METHODES.map((item) => (
                    <SkillBullet key={item}>
                      {item}
                    </SkillBullet>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col items-start justify-center gap-[24px]">
                <div className="w-full flex flex-col items-start justify-center gap-[8px]">
                  <SkillsColumnHeader>Soft Skills</SkillsColumnHeader>
                  <div className="flex flex-col items-start justify-center gap-[4px]">
                    {SOFT_SKILLS.map((item) => (
                      <SkillBullet key={item}>
                        {item}
                      </SkillBullet>
                    ))}
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-[8px]">
                  <SkillsColumnHeader>Tools</SkillsColumnHeader>
                  <div className="flex flex-col items-start justify-center gap-[4px]">
                    {TOOLS.map((item) => (
                      <SkillBullet key={item}>
                        {item}
                      </SkillBullet>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Interests (Figma 302:2532 → 429:3596) — 9 icons in a row.
              Section header is stage 10; each interest sub-stages
              10.0..10.x so the icons pop in one-by-one. Each interest
              renders as a 32 × 32 icon with a Solway Regular 10/16
              label in #7E7F85 beneath. */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 9,
            }}
          >
            <SectionTitle>Interests</SectionTitle>
            <div
              className="flex items-center justify-center"
              style={{ gap: 12 }}
            >
              {INTERESTS.map((interest, i) => (
                <span
                  key={interest.label}
                  className="shrink-0 inline-flex flex-col items-center anim-bubbly-grow"
                  style={{
                    width: 54,
                    gap: 4,
                    ["--stage" as string]: 9 + i * 0.25,
                  }}
                >
                  <span
                    className="themed-icon relative shrink-0 inline-block"
                    style={{ width: 32, height: 32 }}
                    aria-hidden
                  >
                    <img
                      src={interest.icon}
                      alt=""
                      className="absolute inset-0 w-full h-full block"
                    />
                  </span>
                  <span
                    className="shrink-0 whitespace-nowrap text-center"
                    style={{
                      fontFamily: SOLWAY,
                      fontWeight: 400,
                      fontSize: fs(10),
                      lineHeight: "16px",
                      letterSpacing: "0.5px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {interest.label}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* CTA — primary "My Works" cream pill (Figma 535:8396).
              Stretches full width so the bottom spacing of the
              scrollable bio area stays the same. Stage 11 lands the
              CTA last in the bubbly-grow sequence. */}
          <div className="w-full flex items-start shrink-0">
            <span
              className="anim-bubbly-grow flex-1 flex"
              style={{ ["--stage" as string]: 11 }}
            >
              <CTAButton
                href="/contact"
                iconSrc="/assets/icon-cta-chat.svg"
                label="Let's talk"
                variant="primary"
              />
            </span>
          </div>
        </div>

        <CustomScrollbar scrollRef={scrollRef} trackHeight={505} />
      </div>
    </>
  );
}

function ListSection({
  title,
  items,
  stage,
}: {
  title: string;
  items: Item[];
  stage: number;
}) {
  return (
    <div
      className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
      style={{
        transformOrigin: "left top",
        ["--stage" as string]: stage,
      }}
    >
      <SectionTitle>{title}</SectionTitle>
      <div className="w-full flex flex-col items-start gap-[16px] rounded-[24px]">
        {items.map((item, i) => (
          <EducationRow key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

/* === Mobile bio paragraphs (Figma 478:4294) ===
   Same 3 paragraphs as desktop, rendered with the mobile leading
   (16/24 tracking-0.5 per the latest Figma) and bullet-by-bullet
   stagger so each appears individually. */
function MobileBioText({ baseStage }: { baseStage: number }) {
  const paragraphClass =
    "w-full text-[var(--color-text-secondary)] shrink-0 anim-bubbly-grow";
  const paragraphStyle = {
    fontSize: fs(16),
    lineHeight: "24px",
    letterSpacing: "0.5px",
    transformOrigin: "left top",
  } as const;
  // Mobile mirror of the desktop bio rewrite — same 3 paragraphs, just
  // rendered with the mobile leading (16/26) and a tighter gap-12.
  return (
    <div className="w-full flex flex-col gap-[12px] shrink-0">
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage }}
      >
        I think in systems.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 1 }}
      >
        That&rsquo;s how I&rsquo;ve spent the last five years quietly
        approaching every project — figuring out where user journeys
        overlap, how roles hand off to each other, how trust travels
        through a product without exposing private data. The visible part
        of design is getting faster every month; AI can generate
        components, layouts, even full flows in seconds. What still
        requires craft is the system underneath, and that&rsquo;s where
        I want to keep working.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 2 }}
      >
        I&rsquo;m a product designer based in Amsterdam, currently
        completing my Master&rsquo;s at HvA. I&rsquo;ve shipped end-to-end
        across consumer apps, B2B platforms, and enterprise systems —
        usually as the only designer in the room. Looking for product
        teams in the Netherlands building complex things that need
        someone who can hold the whole picture in their head while still
        caring about the details.
      </p>
    </div>
  );
}

/* Mobile education row — name + short on top line, date underneath
   (Figma 312:1762). No dotted leader on mobile, since each row is
   single-column. */
function MobileEducationRow({ item }: { item: Item }) {
  const inner = (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex gap-[8px] items-center">
        <p
          className="text-[var(--color-text-primary)] whitespace-nowrap shrink-0"
          style={{
            fontSize: fs(16),
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          {item.name}
        </p>
        <div className="flex items-center shrink-0">
          <p
            className="text-[var(--color-text-muted)] whitespace-nowrap shrink-0"
            style={{
              fontSize: fs(14),
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            {item.short}
          </p>
          {item.url && <LinkExternalIcon />}
        </div>
      </div>
      <p
        className="text-[var(--color-text-primary)] whitespace-nowrap shrink-0"
        style={{ fontSize: fs(14), lineHeight: "20px", letterSpacing: "0.15px" }}
      >
        {item.date}
      </p>
    </div>
  );
  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full no-underline cursor-pointer hover:opacity-80 transition-opacity duration-200"
        style={{ color: "inherit" }}
        aria-label={`${item.name} — ${item.short} (opens in a new tab)`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function MobileListSection({
  title,
  items,
  stage,
}: {
  title: string;
  items: Item[];
  stage: number;
}) {
  return (
    <div
      className="w-full flex flex-col items-start gap-[24px] shrink-0 anim-bubbly-grow"
      style={{
        transformOrigin: "left top",
        ["--stage" as string]: stage,
      }}
    >
      <SectionTitle>{title}</SectionTitle>
      <div className="w-full flex flex-col items-start gap-[20px] rounded-[24px]">
        {items.map((item, i) => (
          <MobileEducationRow key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function AboutMobile() {
  const { handleClick } = useViewTransitionRouter();
  const handleContactClick = handleClick("/contact");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Scroll-driven illustration opacity. At the top of the bio the
  // illustration sits at full strength behind the content; as the
  // user scrolls down, it fades out 1 → 0 and is fully gone by the
  // time they reach the end of the bio. Scrolling back up restores
  // it the same way. rAF-throttled so we don't churn React on every
  // frame.
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      setScrollProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const illustrationOpacity = 1 - scrollProgress;

  return (
    <div className="absolute inset-0 flex flex-col items-center pt-[20px] pb-[108px] px-[16px] gap-[24px]">
      {/* Background illustration — bottom-right. z-10 so it sits in
          front of the scrolling bio text where they overlap (image
          stays visible on top). FloatingNav (z-20 in ScaledShell) is
          still in front of it.

          Two nested wrappers so the two opacity sources don't fight
          each other:
            • Outer div holds the scroll-driven opacity (1 at the top
              of the bio, 0 at the very end). Inline style wins because
              nothing else writes opacity here.
            • Inner div carries the `anim-fade-stage` mount fade-in
              and the shared `viewTransitionName` for cross-page morph. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "calc(50% + 106.5px)",
          bottom: -1,
          width: 429,
          height: 429,
          transform: "translateX(-50%)",
          zIndex: 10,
          opacity: illustrationOpacity,
        }}
      >
        <div
          className="w-full h-full anim-fade-stage"
          style={{
            viewTransitionName: "hero-illustration",
            ["--stage" as string]: 13,
          }}
        >
          <img
            src="/assets/illustration-about.png"
            alt=""
            className="w-full h-full object-cover block"
          />
        </div>
      </div>

      {/* Bio Section header (Figma 557:11244) — flex row with title
          cluster on the left and the 3-dot MobileMenuButton placeholder
          on the right. gap-10 items-start. The title cluster keeps its
          own 8 px column gap. */}
      <div className="relative w-full flex items-start gap-[10px]">
        <div className="flex-1 min-w-0 flex flex-col items-start gap-[8px]">
          <p
            className="w-full text-[var(--color-text-primary)] anim-bubbly-grow"
            style={{
              fontSize: fs(32),
              lineHeight: "40px",
              transformOrigin: "left center",
              ["--stage" as string]: 0,
            }}
          >
            Call me Pari,
          </p>
          <p
            className="w-full text-[var(--color-text-primary)] anim-bubbly-grow"
            style={{
              fontSize: fs(16),
              lineHeight: "24px",
              transformOrigin: "left center",
              ["--stage" as string]: 1,
            }}
          >
            Nice to meet you!
          </p>
        </div>
        <span
          className="shrink-0 anim-bubbly-grow"
          style={{
            transformOrigin: "right center",
            ["--stage" as string]: 1.5,
          }}
        >
          <MobileMenuButton />
        </span>
      </div>

      {/* Bio Container — 2 px scrollbar on the LEFT (Figma 312:2138) +
          scrollable text container on the right. The scrollbar uses the
          same CustomScrollbar component as desktop, just placed first
          in the flex. */}
      <div className="relative w-full flex-1 min-h-0 flex items-start gap-[12px]">
        <CustomScrollbar scrollRef={scrollRef} trackHeight={0} fillHeight />

        <div
          ref={scrollRef}
          className="no-scrollbar flex-1 min-w-0 h-full overflow-y-auto flex flex-col items-start gap-[40px]"
          style={{
            scrollBehavior: "smooth",
            overscrollBehavior: "contain",
          }}
        >
          <MobileBioText baseStage={2} />
          <MobileListSection
            title="Academic Background"
            items={ACADEMIC}
            stage={5}
          />
          <MobileListSection
            title="Contributions"
            items={CONTRIBUTIONS}
            stage={6}
          />
          <MobileListSection
            title="Certificates"
            items={CERTIFICATES}
            stage={7}
          />

          {/* Skills — single column on mobile (stacked Methodes,
              Soft Skills, Tools). */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 8,
            }}
          >
            <SectionTitle>Skills</SectionTitle>
            <div className="w-full flex flex-col items-start gap-[24px] rounded-[24px]">
              <div className="w-full flex flex-col items-start gap-[8px]">
                <SkillsColumnHeader>Methodes</SkillsColumnHeader>
                <div className="flex flex-col items-start gap-[4px]">
                  {METHODES.map((item) => (
                    <SkillBullet key={item}>
                      {item}
                    </SkillBullet>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-[8px]">
                <SkillsColumnHeader>Soft Skills</SkillsColumnHeader>
                <div className="flex flex-col items-start gap-[4px]">
                  {SOFT_SKILLS.map((item) => (
                    <SkillBullet key={item}>
                      {item}
                    </SkillBullet>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-[8px]">
                <SkillsColumnHeader>Tools</SkillsColumnHeader>
                <div className="flex flex-col items-start gap-[4px]">
                  {TOOLS.map((item) => (
                    <SkillBullet key={item}>
                      {item}
                    </SkillBullet>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interests (Figma 478:4385 mobile) — two centred rows:
              first row 5 items with 31.2 px gaps, second row 4 items
              with 30.4 px gaps. Each item is 25.6 px wide with a
              25.6 × 25.6 icon and a Solway Regular 8/12.8 label in
              #7E7F85 beneath. Labels overflow the cell width and stay
              centred (`whitespace-nowrap`). */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 9,
            }}
          >
            <SectionTitle>Interests</SectionTitle>
            <div
              className="w-full flex flex-col items-center"
              style={{ gap: 12 }}
            >
              {[INTERESTS.slice(0, 5), INTERESTS.slice(5)].map(
                (row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex items-center"
                    style={{ gap: rowIdx === 0 ? 31.2 : 30.4 }}
                  >
                    {row.map((interest, i) => (
                      <span
                        key={interest.label}
                        className="shrink-0 inline-flex flex-col items-center anim-bubbly-grow"
                        style={{
                          width: 25.6,
                          gap: 3.2,
                          ["--stage" as string]:
                            9 + (rowIdx * 5 + i) * 0.25,
                        }}
                      >
                        <span
                          className="themed-icon relative shrink-0 inline-block"
                          style={{ width: 25.6, height: 25.6 }}
                          aria-hidden
                        >
                          <img
                            src={interest.icon}
                            alt=""
                            className="absolute inset-0 w-full h-full block"
                          />
                        </span>
                        <span
                          className="shrink-0 whitespace-nowrap text-center"
                          style={{
                            fontFamily: SOLWAY,
                            fontWeight: 400,
                            fontSize: fs(8),
                            lineHeight: "12.8px",
                            letterSpacing: "0.4px",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {interest.label}
                        </span>
                      </span>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* CTA — primary "Let's talk" cream pill (Figma 557:11254).
              Inline on mobile (rather than via CTAButton) because the
              mobile spec adds an explicit `h-40` cap and drops the
              icon; desktop About still uses CTAButton with its
              natural 48-tall sizing. Stage 11 lands the CTA last in
              the bubbly-grow sequence. */}
          <Link
            href="/contact"
            onClick={handleContactClick}
            className="w-full anim-bubbly-grow flex items-center justify-center gap-[8px] rounded-[122px] bg-[var(--color-cta-primary-bg)] hover:bg-[var(--color-cta-primary-hover)] transition-colors duration-200 shrink-0"
            style={{
              height: 40,
              paddingLeft: 24,
              paddingRight: 24,
              color: "var(--color-cta-primary-text)",
              fontFamily: SOLWAY,
              fontWeight: 400,
              fontSize: fs(16),
              lineHeight: "24px",
              letterSpacing: "0.15px",
              textAlign: "center",
              transformOrigin: "left center",
              ["--stage" as string]: 11,
            }}
            aria-label="Let's talk — open contact"
          >
            Let&rsquo;s talk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const isMobile = useIsMobile();
  return isMobile ? <AboutMobile /> : <AboutDesktop />;
}
