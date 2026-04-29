"use client";

import { useEffect, useRef, useState } from "react";

/* === FIGMA DESIGN TOKENS (AboutMe, node 302:2532) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Bio Section (top, x=120 y=80, w=1272):
     - "You can call me Pari," Solway Regular  60/66  tracking-2
     - "Nice to meet you!"     Solway Regular  32/40  tracking-2
     - "Product Designer"      Solway Light    20/24  tracking-5
   Illustration (face crop): 816 × 816 absolute, x=-33, top=167.
     `viewTransitionName: "hero-illustration"` lets the browser morph
     this picture from home's centered position when you navigate.
   Bio Container (x=120, y=314, 1272 × 665, pl-634):
     - Bio Text Container (596w, h=505, scrollable) on the right
     - Custom 2 px scrollbar at far right
   Floating nav: rendered by ScaledShell.
============================================================= */

type ListItem = { name: string; short: string; date: string };

const ACADEMIC: ListItem[] = [
  { name: "Master Interaction Design", short: "HVA", date: "2025 - Present" },
  { name: "Bachelor Industrial Design", short: "AUI", date: "2017 - 2022" },
];

const CERTIFICATES: ListItem[] = [
  { name: "Google UX Design", short: "Coursera", date: "2024" },
  { name: "Master Interaction Design", short: "HVA", date: "2023" },
];

const SKILLS: ListItem[] = [
  { name: "Google UX Design", short: "Coursera", date: "2024" },
];

const HOBBIES: ListItem[] = [
  { name: "Master Interaction Design", short: "HVA", date: "2023" },
];

function ListSection({ title, items }: { title: string; items: ListItem[] }) {
  return (
    <div className="w-full flex flex-col items-start gap-[20px] shrink-0">
      <p
        className="w-full text-[#5A5D70]"
        style={{
          fontWeight: 500,
          fontSize: 20,
          lineHeight: "26px",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </p>
      <div className="w-full flex flex-col items-start gap-[16px]">
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="w-full flex items-center gap-[8px]"
          >
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
            <span
              className="flex-1 min-w-0 overflow-hidden whitespace-nowrap text-[#7E7F85]"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
              aria-hidden
            >
              {".".repeat(120)}
            </span>
            <p
              className="text-[#1B2249] whitespace-nowrap shrink-0"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
            >
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BioText() {
  return (
    <div
      className="w-full text-[#5A5D70] flex flex-col gap-[26px] shrink-0"
      style={{ fontSize: 16, lineHeight: "26px", letterSpacing: "0.5px" }}
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
        Most of my work has happened in environments where I was the only
        designer in the room — sometimes by choice, often by circumstance.
        I&rsquo;ve designed solo for a 13-month{" "}
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
        I&rsquo;ve taken from my career so far is that design only matters
        when it gets used.
      </p>
      <p>
        Outside of client work, I think a lot about ethical design —
        particularly how products shape behaviour without users noticing. My
        recent academic work on Mindful Meet, an eco-conscious meeting tool,
        and ViaVia, Community based ride-sharing app, came directly from that
        interest.
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
    el.addEventListener("scroll", update);
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
      <div
        className="absolute bg-[#28315F] rounded-[4px] -translate-x-1/2 left-1/2 transition-[top] duration-75"
        style={{ width: 4, height: thumb.height, top: thumb.top }}
      />
    </div>
  );
}

export default function About() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* Illustration (face crop). Same `viewTransitionName` as the home
          illustration, so the browser auto-morphs the picture between
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

      {/* Bio Section header */}
      <div
        className="absolute left-[120px] top-[80px] flex flex-col items-start gap-[12px]"
        style={{ width: 1272 }}
      >
        <p
          className="w-full text-[#1F2753]"
          style={{ fontSize: 60, lineHeight: "66px", letterSpacing: "2px" }}
        >
          You can call me Pari,
        </p>
        <p
          className="w-full text-[#1F2753]"
          style={{ fontSize: 32, lineHeight: "40px", letterSpacing: "2px" }}
        >
          Nice to meet you!
        </p>
        <p
          className="w-full text-[#1F2753]"
          style={{
            fontWeight: 300,
            fontSize: 20,
            lineHeight: "24px",
            letterSpacing: "5px",
          }}
        >
          Product Designer
        </p>
      </div>

      {/* Bio Container — illustration overlaps left, content scrolls right */}
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
        >
          <BioText />
          <ListSection title="My Academic Background" items={ACADEMIC} />
          <ListSection title="My Certificates" items={CERTIFICATES} />
          <ListSection title="My Skills" items={SKILLS} />
          <ListSection title="My Hobbies" items={HOBBIES} />
        </div>

        <CustomScrollbar scrollRef={scrollRef} trackHeight={505} />
      </div>
    </>
  );
}
