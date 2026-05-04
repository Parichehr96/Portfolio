"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

type Item = { name: string; short: string; date: string };

const ACADEMIC: Item[] = [
  { name: "Master Interaction Design", short: "HVA", date: "2025 - Present" },
  { name: "Bachelor Industrial Design", short: "AUI", date: "2017 - 2022" },
];

const CERTIFICATES: Item[] = [
  { name: "Typography", short: "Uxcel", date: "2025" },
  { name: "GenAI for UX Designers", short: "Coursera", date: "2025" },
  { name: "Google UX Design", short: "Coursera", date: "2024" },
  { name: "Agile Project", short: "Coursera", date: "2022" },
];

const METHODES = [
  "Product Design",
  "Design Thinking",
  "Interaction Design",
  "Information Architecture",
  "User Research",
  "Usability testing",
  "Journey Mapping",
  "Prototyping",
  "Design Systems",
  "Agile / Scrum",
];

const SOFT_SKILLS = [
  "Cross-Functional Collaboration",
  "Stakeholder Management",
  "Design Leadership",
  "Time Management",
  "Crisis Management",
];

const TOOLS = ["Figma", "Miro", "Analytical softwares"];

const HOBBY_ICONS = [
  "/assets/icon-hobby-fire-exit.svg",
  "/assets/icon-hobby-boat.svg",
  "/assets/icon-hobby-luggage.svg",
  "/assets/icon-hobby-vinyl.svg",
  "/assets/icon-hobby-puzzle.svg",
  "/assets/icon-hobby-video-player.svg",
  "/assets/icon-hobby-camera.svg",
  "/assets/icon-hobby-chess.svg",
  "/assets/icon-hobby-cheers.svg",
  "/assets/icon-hobby-microphone.svg",
];

function LinkExternalIcon() {
  return (
    <span className="relative shrink-0 inline-block w-[24px] h-[24px]">
      <img
        src="/assets/icon-link-external.svg"
        alt=""
        className="absolute inset-0 w-full h-full block"
      />
    </span>
  );
}

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

function BioText({ stage }: { stage: number }) {
  return (
    <div
      className="w-full text-[#5A5D70] flex flex-col gap-[24px] shrink-0 anim-bubbly-grow"
      style={{
        fontSize: 16,
        lineHeight: "24px",
        letterSpacing: "0.5px",
        transformOrigin: "left top",
        ["--stage" as string]: stage,
      }}
    >
      <p>
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
      <p>
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
      <p>
        I care about evidence. I care about honesty in the process — including
        naming what didn&rsquo;t work and why. And I care about building
        things that actually reach people, because the deepest lesson
        I&rsquo;ve taken from my career so far is that design is only
        meaningful when it&rsquo;s used.
      </p>
      <p>
        Outside of client work, I think a lot about ethics; particularly how
        products shape behavior without users noticing. My recent academic
        work on Mindful Meet, an eco-conscious meeting tool, and ViaVia, a
        community based ride-sharing app, came directly from that interest.
        <br />
        I also have experienced building different things with AI recently
        and have been enjoying it and getting good at it actually!
      </p>
      <p>
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

/* === Primary / Secondary buttons ===
   Both share the same 14/18 Solway Regular text + 24 px icon + rounded-120
   pill geometry. Primary uses Cream bg; Secondary uses 2-px Cream Dark
   border on white. Both navigate via document.startViewTransition so the
   shared hero-illustration morph fires when clicked. */
function CTAButton({
  href,
  iconSrc,
  label,
  variant,
  uppercase = false,
}: {
  href: string;
  iconSrc: string;
  label: string;
  variant: "primary" | "secondary";
  uppercase?: boolean;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
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
    "flex-1 min-w-0 flex items-center justify-center gap-[12px] px-[16px] py-[12px] rounded-[120px] cursor-pointer transition-colors duration-200";
  const variantClass =
    variant === "primary"
      ? "bg-[#F9F5EB] hover:bg-[#EDEAE4]"
      : "bg-white border-2 border-solid border-[#EDEAE4] hover:bg-[#F9F5EB]";

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseClass} ${variantClass}`}
    >
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
    </Link>
  );
}

function CustomScrollbar({
  scrollRef,
  trackHeight = 505,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  trackHeight?: number;
}) {
  const [thumb, setThumb] = useState({ height: 216, top: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const ratio = el.clientHeight / el.scrollHeight;
      const height = Math.max(40, Math.round(ratio * trackHeight));
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
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollRef, trackHeight]);

  return (
    <div
      className="bg-[#EDEAE4] rounded-[4px] relative shrink-0"
      style={{ width: 2, height: trackHeight }}
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

export default function About() {
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
          <BioText stage={2} />
          <ListSection
            title="My Academic Background"
            items={ACADEMIC}
            stage={3}
          />
          <ListSection
            title="My Certificates"
            items={CERTIFICATES}
            stage={4}
          />

          {/* My Skills — Methodes | (Soft Skills + Tools) — stage 5 */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 5,
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

          {/* My Hobbies — 10 icons in a row. Section header is stage 6;
              each icon sub-stages 6.0..6.9 so they pop one-by-one. */}
          <div
            className="w-full flex flex-col items-start gap-[20px] shrink-0 anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 6,
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
                    ["--stage" as string]: 6 + i * 0.25,
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
              stages (8 and 9). */}
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
