"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CTAButton from "../_components/CTAButton";
import LinkExternalIcon from "../_components/LinkExternalIcon";
import { useIsMobile } from "../_components/useIsMobile";
import { useViewTransitionRouter } from "../_lib/useViewTransitionRouter";
import {
  ACADEMIC,
  CERTIFICATES,
  HOBBY_ICONS,
  METHODES,
  SOFT_SKILLS,
  TOOLS,
  type AcademicItem as Item,
} from "../_data/about";

/* === FIGMA DESIGN TOKENS (AboutMe, node 302:2532) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Outer flex-col gap-80, pt-80 pb-40 px-120 items-center.
   Bio Section (top, w=1272):
     - "You can call me Pari," Solway Regular 60/66 tracking-2
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
  return (
    <div className="w-full flex items-end justify-center gap-[8px]">
      <div className="flex-1 min-w-0 flex items-center gap-[8px]">
        <p
          className="text-[#1B2249] whitespace-nowrap shrink-0"
          style={{
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          {item.name}
        </p>
        <div className="flex items-center shrink-0">
          <p
            className="text-[#7E7F85] whitespace-nowrap shrink-0"
            style={{
              fontSize: 16,
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            {item.short}
          </p>
          <LinkExternalIcon />
        </div>
        <span
          className="flex-1 min-w-0 overflow-hidden whitespace-nowrap text-[#7E7F85]"
          style={{
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
          aria-hidden
        >
          {".".repeat(500)}
        </span>
      </div>
      <p
        className="text-[#1B2249] whitespace-nowrap shrink-0"
        style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "0.15px" }}
      >
        {item.date}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="w-full text-[#5A5D70]"
      style={{
        fontWeight: 500,
        fontSize: 20,
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
      className="text-[#7E7F85] shrink-0"
      style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "0.15px" }}
    >
      {children}
    </p>
  );
}

function SkillBullet({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#1B2249] shrink-0"
      style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "0.15px" }}
    >
      · {children}
    </p>
  );
}

/* Each paragraph carries its own --stage so the 5 paragraphs bubble in
   one-by-one (stages baseStage..baseStage+4) instead of as a single block. */
function BioText({ baseStage }: { baseStage: number }) {
  const paragraphClass =
    "w-full text-[#5A5D70] shrink-0 anim-bubbly-grow";
  const paragraphStyle = {
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: "0.5px",
    transformOrigin: "left top",
  } as const;
  return (
    <div className="w-full flex flex-col gap-[24px] shrink-0">
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage }}
      >
        I&rsquo;m a product designer with{" "}
        <span style={{ fontWeight: 500 }}>+5 years of experience</span>{" "}
        designing digital products across consumer apps, enterprise platforms,
        and Web3 ecosystems. I&rsquo;m currently based in{" "}
        <span style={{ fontWeight: 500 }}>Amsterdam</span>, completing my{" "}
        <span style={{ fontWeight: 500 }}>
          Master&rsquo;s in Interaction Design
        </span>{" "}
        at HvA.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 1 }}
      >
        Most of my work has happened as the only designer in the room.
        I&rsquo;ve designed solo for a{" "}
        <span style={{ fontWeight: 500 }}>Web3 product</span> that grew from 87
        to 1,500 daily active users, led the redesign of a{" "}
        <span style={{ fontWeight: 500 }}>gamified quiz app</span>, shaped the{" "}
        <span style={{ fontWeight: 500 }}>digital ecosystem</span> of one of
        Iran&rsquo;s largest auto parts manufacturers, and contributed to{" "}
        <span style={{ fontWeight: 500 }}>enterprise ERP</span> work for the
        oil and gas industry. Each project taught me something different, but
        they share a common thread: figuring out how to make complex systems
        feel simple, and how to keep users at the centre when the structure
        around me doesn&rsquo;t always make that easy.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 2 }}
      >
        I care about evidence. I care about honesty in the process — including
        naming what didn&rsquo;t work and why. And I care about building
        things that actually reach people, because the deepest lesson
        I&rsquo;ve taken from my career so far is that design is only
        meaningful when it&rsquo;s used.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 3 }}
      >
        Outside of client work, I think a lot about ethics; particularly how
        products shape behavior without users noticing. My recent academic
        work on Mindful Meet, an eco-conscious meeting tool, and ViaVia, a
        community based ride-sharing app, came directly from that interest.
        <br />
        I also have experienced building different things with AI recently
        and have been enjoying it and getting good at it actually!
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 4 }}
      >
        If you&rsquo;re working on something{" "}
        <span style={{ fontWeight: 500 }}>complex</span>,{" "}
        <span style={{ fontWeight: 500 }}>multi-audience</span>, or{" "}
        <span style={{ fontWeight: 500 }}>strategically ambitious</span> — or
        if you need a designer who can{" "}
        <span style={{ fontWeight: 500 }}>
          hold the whole system in their head while still caring about the
          details
        </span>{" "}
        — I&rsquo;d love to talk.
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
      className="bg-[#EDEAE4] rounded-[4px] relative shrink-0"
      style={{ width: 2, height: fillHeight ? "100%" : trackHeight }}
    >
      {/* Bubbly thumb — overshoot easing gives the indicator a slight
          spring as it tracks the scroll position. */}
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

function AboutDesktop() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
        }}
      >
        <img
          src="/assets/illustration-about.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Bio Section header — stage 0 (TL) + stage 1 */}
      <div
        className="absolute left-[120px] top-[80px] flex flex-col items-start gap-[12px]"
        style={{ width: 1272 }}
      >
        <p
          className="w-full text-[#1F2753] anim-bubbly-grow"
          style={{
            fontSize: 60,
            lineHeight: "66px",
            letterSpacing: "2px",
            transformOrigin: "left center",
            ["--stage" as string]: 0,
          }}
        >
          You can call me Pari,
        </p>
        <p
          className="w-full text-[#1F2753] anim-bubbly-grow"
          style={{
            fontSize: 32,
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
          {/* Bio paragraphs — stages 2..6 (one per paragraph) */}
          <BioText baseStage={2} />
          <ListSection
            title="My Academic Background"
            items={ACADEMIC}
            stage={7}
          />
          <ListSection
            title="My Certificates"
            items={CERTIFICATES}
            stage={8}
          />

          {/* My Skills — Methodes | (Soft Skills + Tools) — stage 9 */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 9,
            }}
          >
            <SectionTitle>My Skills</SectionTitle>
            <div className="w-full flex items-start rounded-[24px] whitespace-nowrap">
              <div className="flex-1 min-w-0 flex flex-col items-start justify-center gap-[8px]">
                <SkillsColumnHeader>Methodes</SkillsColumnHeader>
                <div className="flex flex-col items-start justify-center gap-[4px]">
                  {METHODES.map((item) => (
                    <SkillBullet key={item}>{item}</SkillBullet>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col items-start justify-center gap-[24px]">
                <div className="w-full flex flex-col items-start justify-center gap-[8px]">
                  <SkillsColumnHeader>Soft Skills</SkillsColumnHeader>
                  <div className="flex flex-col items-start justify-center gap-[4px]">
                    {SOFT_SKILLS.map((item) => (
                      <SkillBullet key={item}>{item}</SkillBullet>
                    ))}
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-[8px]">
                  <SkillsColumnHeader>Tools</SkillsColumnHeader>
                  <div className="flex flex-col items-start justify-center gap-[4px]">
                    {TOOLS.map((item) => (
                      <SkillBullet key={item}>{item}</SkillBullet>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Hobbies — 10 icons in a row. Section header is stage 10;
              each icon sub-stages 10.0..10.9 so they pop one-by-one. */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 10,
            }}
          >
            <SectionTitle>My Hobbies</SectionTitle>
            <div
              className="flex items-center justify-between"
              style={{ width: 596 }}
            >
              {HOBBY_ICONS.map((src, i) => (
                <span
                  key={src}
                  className="relative shrink-0 inline-block anim-bubbly-grow"
                  style={{
                    width: 32,
                    height: 32,
                    ["--stage" as string]: 10 + i * 0.25,
                  }}
                  aria-hidden
                >
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full block"
                  />
                </span>
              ))}
            </div>
          </div>

          {/* CTAs — Each button bubbles individually as the last two
              stages (12 and 13). */}
          <div className="w-full flex items-start gap-[20px] shrink-0">
            <span
              className="anim-bubbly-grow flex-1 flex"
              style={{ ["--stage" as string]: 12 }}
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
              style={{ ["--stage" as string]: 13 }}
            >
              <CTAButton
                href="/work"
                iconSrc="/assets/icon-cta-work.svg"
                label="MY EXPERIENCES"
                variant="secondary"
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

/* === Mobile bio paragraphs (Figma 312:1758) ===
   Same 5 paragraphs as desktop but rendered with the mobile leading
   (16/26) and bullet-by-bullet stagger so each appears individually. */
function MobileBioText({ baseStage }: { baseStage: number }) {
  const paragraphClass = "w-full text-[#5A5D70] shrink-0 anim-bubbly-grow";
  const paragraphStyle = {
    fontSize: 16,
    lineHeight: "26px",
    letterSpacing: "0.5px",
    transformOrigin: "left top",
  } as const;
  return (
    <div className="w-full flex flex-col gap-[24px] shrink-0">
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage }}
      >
        I&rsquo;m a product designer with +5 years of experience designing
        digital products across consumer apps, enterprise platforms, and
        Web3 ecosystems. I&rsquo;m currently based in Amsterdam, completing
        my Master&rsquo;s in Interaction Design at HvA.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 1 }}
      >
        Most of my work has happened as the only designer in the room.
        I&rsquo;ve designed solo for a Web3 product that grew from 87 to
        1,500 daily active users, led the redesign of a gamified quiz app,
        shaped the digital ecosystem of one of Iran&rsquo;s largest auto
        parts manufacturers, and contributed to enterprise ERP work for the
        oil and gas industry. Each project taught me something different,
        but they share a common thread: figuring out how to make complex
        systems feel simple, and how to keep users at the centre when the
        structure around me doesn&rsquo;t always make that easy.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 2 }}
      >
        I care about evidence. I care about honesty in the process —
        including naming what didn&rsquo;t work and why. And I care about
        building things that actually reach people, because the deepest
        lesson I&rsquo;ve taken from my career so far is that design is
        only meaningful when it&rsquo;s used.
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 3 }}
      >
        Outside of client work, I think a lot about ethics; particularly
        how products shape behavior without users noticing. My recent
        academic work on Mindful Meet, an eco-conscious meeting tool, and
        ViaVia, a community based ride-sharing app, came directly from
        that interest.
        <br />
        I also have experienced building different things with AI recently
        and have been enjoying it and getting good at it actually!
      </p>
      <p
        className={paragraphClass}
        style={{ ...paragraphStyle, ["--stage" as string]: baseStage + 4 }}
      >
        If you&rsquo;re working on something complex, multi-audience, or
        strategically ambitious — or if you need a designer who can hold
        the whole system in their head while still caring about the
        details — I&rsquo;d love to talk.
      </p>
    </div>
  );
}

/* Mobile education row — name + short on top line, date underneath
   (Figma 312:1762). No dotted leader on mobile, since each row is
   single-column. */
function MobileEducationRow({ item }: { item: Item }) {
  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex gap-[8px] items-center">
        <p
          className="text-[#1B2249] whitespace-nowrap shrink-0"
          style={{
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          {item.name}
        </p>
        <div className="flex items-center shrink-0">
          <p
            className="text-[#7E7F85] whitespace-nowrap shrink-0"
            style={{
              fontSize: 14,
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            {item.short}
          </p>
          <LinkExternalIcon />
        </div>
      </div>
      <p
        className="text-[#1B2249] whitespace-nowrap shrink-0"
        style={{ fontSize: 14, lineHeight: "20px", letterSpacing: "0.15px" }}
      >
        {item.date}
      </p>
    </div>
  );
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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { handleClick } = useViewTransitionRouter();
  const handleWorkClick = handleClick("/work");

  return (
    <div className="absolute inset-0 flex flex-col items-center pt-[64px] pb-[120px] px-[16px] gap-[24px]">
      {/* Background illustration — bottom-right. z-10 so it sits in
          front of the scrolling bio text where they overlap (image
          stays visible on top). FloatingNav (z-20 in ScaledShell) is
          still in front of it. Same `viewTransitionName` as the other
          three pages → cross-page morph. Fades in as stage 13, after
          the title, bio paragraphs, sections, and CTA all finish. */}
      <div
        className="absolute pointer-events-none anim-fade-stage"
        style={{
          left: "calc(50% + 106.5px)",
          bottom: -1,
          width: 429,
          height: 429,
          transform: "translateX(-50%)",
          viewTransitionName: "hero-illustration",
          zIndex: 10,
          ["--stage" as string]: 13,
        }}
      >
        <img
          src="/assets/illustration-about.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Bio Section header — "You can call me Pari," + "Nice to meet you!" */}
      <div className="relative w-full flex flex-col items-start gap-[8px]">
        <p
          className="w-full text-[#1F2753] anim-bubbly-grow"
          style={{
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "1px",
            transformOrigin: "left center",
            ["--stage" as string]: 0,
          }}
        >
          You can call me Pari,
        </p>
        <p
          className="w-full text-[#1F2753] anim-bubbly-grow"
          style={{
            fontSize: 16,
            lineHeight: "24px",
            transformOrigin: "left center",
            ["--stage" as string]: 1,
          }}
        >
          Nice to meet you!
        </p>
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
            title="My Academic Background"
            items={ACADEMIC}
            stage={7}
          />
          <MobileListSection
            title="My Certificates"
            items={CERTIFICATES}
            stage={8}
          />

          {/* My Skills — single column on mobile (stacked Methodes,
              Soft Skills, Tools). */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 9,
            }}
          >
            <SectionTitle>My Skills</SectionTitle>
            <div className="w-full flex flex-col items-start gap-[24px] rounded-[24px]">
              <div className="w-full flex flex-col items-start gap-[8px]">
                <SkillsColumnHeader>Methodes</SkillsColumnHeader>
                <div className="flex flex-col items-start gap-[4px]">
                  {METHODES.map((item) => (
                    <SkillBullet key={item}>{item}</SkillBullet>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-[8px]">
                <SkillsColumnHeader>Soft Skills</SkillsColumnHeader>
                <div className="flex flex-col items-start gap-[4px]">
                  {SOFT_SKILLS.map((item) => (
                    <SkillBullet key={item}>{item}</SkillBullet>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-[8px]">
                <SkillsColumnHeader>Tools</SkillsColumnHeader>
                <div className="flex flex-col items-start gap-[4px]">
                  {TOOLS.map((item) => (
                    <SkillBullet key={item}>{item}</SkillBullet>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* My Hobbies — 5 cols × 2 rows on mobile (Figma 312:1854). */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 10,
            }}
          >
            <SectionTitle>My Hobbies</SectionTitle>
            <div
              className="grid w-full"
              style={{
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                rowGap: 12,
                columnGap: 8,
                justifyItems: "start",
              }}
            >
              {HOBBY_ICONS.map((src, i) => (
                <span
                  key={src}
                  className="relative shrink-0 inline-block anim-bubbly-grow"
                  style={{
                    width: 24,
                    height: 24,
                    ["--stage" as string]: 10 + i * 0.25,
                  }}
                  aria-hidden
                >
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full block"
                  />
                </span>
              ))}
            </div>
          </div>

          {/* "MY WORK EXPERIENCES?" — single underline link CTA (Figma
              312:1911). Drives the same view-transition as the desktop
              MY EXPERIENCES button. */}
          <Link
            href="/work"
            onClick={handleWorkClick}
            className="w-full anim-bubbly-grow shrink-0 cursor-pointer"
            style={{
              fontFamily: SOLWAY,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: "28px",
              color: "#1F2753",
              textDecoration: "underline",
              textDecorationStyle: "solid",
              transformOrigin: "left center",
              ["--stage" as string]: 12,
            }}
          >
            MY WORK EXPERIENCES?
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
