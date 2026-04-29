"use client";

import { useEffect, useRef, useState } from "react";
import FloatingNav from "../_components/FloatingNav";
import { useShouldAnimate } from "../_components/useShouldAnimate";

/* === FIGMA DESIGN TOKENS (AboutMe, node 302:2532) ===
   Frame: 1512 × 982, bg #FFFFFF — same scale-to-fit pattern as Home.
   Bio Section (top, x=120 y=80, w=1272):
     - "You can call me Pari," Solway Regular  60/66  tracking-2
     - "Nice to meet you!"     Solway Regular  32/40  tracking-2
     - "Product Designer"      Solway Light    20/24  tracking-5
   Illustration (face crop): 816 × 816 absolute, x=-33, top=167.
   Bio Container (x=120, y=314, 1272 × 665, pl-634):
     - Bio Text Container (596w, h=505, scrollable) on the right
     - Custom 2 px scrollbar (track #EDEAE4 / thumb #28315F) at far right
   Floating nav: absolute at left=565, top=854.
============================================================= */

const DESIGN_W = 1512;
const DESIGN_H = 982;

type ListItem = {
  name: string;
  short: string;
  date: string;
};

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
              style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "0.15px" }}
            >
              {item.name}
            </p>
            <p
              className="text-[#7E7F85] whitespace-nowrap shrink-0"
              style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "0.15px" }}
            >
              {item.short}
            </p>
            <span
              className="flex-1 min-w-0 overflow-hidden whitespace-nowrap text-[#7E7F85]"
              style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "0.15px" }}
              aria-hidden
            >
              {".".repeat(120)}
            </span>
            <p
              className="text-[#1B2249] whitespace-nowrap shrink-0"
              style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "0.15px" }}
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
        <span style={{ fontWeight: 500 }}>enterprise ERP</span> work for the oil
        and gas industry. Each project taught me something different, but they
        share a common thread: figuring out how to make complex systems feel
        simple, and how to keep users at the centre when the structure around
        me doesn&rsquo;t always make that easy.
      </p>
      <p>
        I care about evidence. I care about honesty in the process — including
        naming what didn&rsquo;t work and why. And I care about building things
        that actually reach people, because the deepest lesson I&rsquo;ve taken
        from my career so far is that design only matters when it gets used.
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
  // Tracks the scroll position of `scrollRef` and renders a Figma-styled
  // 2 px track + 4 px thumb at the right edge of the bio container.
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
  const [scale, setScale] = useState(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Entrance animations only run on the first render of a JS session.
  // Soft navigation between pages keeps the module loaded, so subsequent
  // mounts see false and skip the animations entirely.
  const shouldAnimate = useShouldAnimate();

  useEffect(() => {
    const apply = () => {
      setScale(
        Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H),
      );
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      <div
        className="absolute"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          fontFamily: "var(--font-solway), serif",
        }}
      >
        {/* Illustration (face crop) — sweeps in from upper-right on first
            session render only. On soft navigation the hook returns false
            and we omit the class, so the picture appears without animation. */}
        <div
          className={
            "absolute pointer-events-none " +
            (shouldAnimate ? "anim-hand-down" : "")
          }
          style={{
            left: "calc(50% - 789px)",
            top: 167,
            width: 816,
            height: 816,
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
          className={
            "absolute left-[120px] top-[80px] flex flex-col items-start gap-[12px] " +
            (shouldAnimate ? "anim-fade-down" : "")
          }
          style={
            shouldAnimate
              ? { width: 1272, animationDelay: "0s", animationDuration: "0.4s" }
              : { width: 1272 }
          }
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
          className={
            "absolute flex items-start " + (shouldAnimate ? "anim-fade" : "")
          }
          style={{
            left: 120,
            top: 314,
            width: 1272,
            height: 665,
            paddingLeft: 634,
            paddingBottom: 160,
            gap: 40,
            ...(shouldAnimate
              ? { animationDelay: "0.4s", animationDuration: "0.5s" }
              : {}),
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

        {/* Floating nav — backdrop fades at 0.6s, items pop after.
            (Home uses the default 2.0s; About is a quicker entry.)
            FloatingNav internally uses useShouldAnimate, so on soft
            navigation it skips the entrance animation and only
            transitions the active-state colors. */}
        <div className="absolute" style={{ left: 565, top: 854 }}>
          <FloatingNav startDelay={0.6} />
        </div>
      </div>
    </div>
  );
}
