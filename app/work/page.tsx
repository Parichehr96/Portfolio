"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* === FIGMA DESIGN TOKENS (Work, node 300:2201) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Outer flex-col gap-80, pt-80 pb-40 px-120 items-center.
   Bio Section header (gap-12, w=1272):
     - "I've worked in multiple industries..." Solway Regular 44/52  tracking-2
     - "Nice to meet you!"                     Solway Regular 32/40  tracking-2
   Bio Container (h=665, gap-40, pb-80):
     - Profile Image (h-full, aspect-square, viewTransitionName matches
       the home + about hero illustration so the picture morphs across
       all three pages.)
     - Text and Experiences Container (flex-1):
         · "My Experiences" — Solway Medium 20/26 tracking-0.5
         · 8 experience rows with gap-32 between
         · "GET IN TOUCH?" CTA (underlined, /contact not yet a route)
   Per row: company name (Space Grotesk Regular 16/24 tracking-0.15 Navy),
   institution short (Solway Regular gray), 24×24 link icon, dotted
   leader, date (Space Grotesk Regular Navy).
   Floating nav: rendered by ScaledShell (Work active = position 2).
============================================================= */

type Experience = { name: string; short: string; date: string };

const EXPERIENCES: Experience[] = [
  { name: "ONTON", short: "PomeGroup", date: "May 2024 - June 2025" },
  { name: "Challenquiz", short: "PomeGroup", date: "Nov 2023 - May 2024" },
  { name: "Ezam Part", short: "Ezam", date: "Nov 2022 - June 2023" },
  { name: "WOW Global Solution", short: "RDSysCo", date: "May 2021 - Sep 2022" },
  { name: "Golestan", short: "-", date: "Jan 2021 - June 2022" },
  { name: "Filala", short: "Poytek", date: "Apr 2021 - Nov 2021" },
  { name: "IOT", short: "Poytek", date: "Apr 2021 - Nov 2021" },
  { name: "Living Maples", short: "Golearn", date: "Oct 2020 - Apr 2021" },
];

const SPACE_GROTESK = "var(--font-space-grotesk), sans-serif";
const SOLWAY = "var(--font-solway), serif";

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

function ExperienceRow({ item }: { item: Experience }) {
  return (
    <div className="w-full flex items-center gap-[8px]">
      <div className="flex-1 min-w-0 flex items-center gap-[8px]">
        <p
          className="text-[#1B2249] whitespace-nowrap shrink-0"
          style={{
            fontFamily: SPACE_GROTESK,
            fontWeight: 400,
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
            fontFamily: SOLWAY,
            fontWeight: 400,
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
        className="overflow-hidden whitespace-nowrap text-[#7E7F85] shrink min-w-0"
        style={{
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "0.15px",
          maxWidth: 360,
        }}
        aria-hidden
      >
        {".".repeat(80)}
      </span>
      <p
        className="text-[#1B2249] whitespace-nowrap shrink-0"
        style={{
          fontFamily: SPACE_GROTESK,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "0.15px",
        }}
      >
        {item.date}
      </p>
    </div>
  );
}

export default function Work() {
  const router = useRouter();

  // Same view-transition handler the FloatingNav and home CTA use, so the
  // hero-illustration morph fires when the user navigates via this CTA too.
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
    const startVT = (
      document as unknown as {
        startViewTransition?: (cb: () => void) => unknown;
      }
    ).startViewTransition;
    if (typeof startVT !== "function") return;
    e.preventDefault();
    startVT.call(document, () => {
      router.push("/contact");
    });
  };

  return (
    <>
      {/* Page layout — flex-col gap-80, padding matches Figma exactly */}
      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[40px] px-[120px] gap-[80px]">
        {/* Bio Section header — gap-12 between the two greeting lines */}
        <div
          className="w-full flex flex-col items-start gap-[12px] text-[#1F2753]"
          style={{ letterSpacing: "2px" }}
        >
          <p
            className="w-full"
            style={{ fontSize: 44, lineHeight: "52px" }}
          >
            I&rsquo;ve worked in multiple industries...
          </p>
          <p
            className="w-full"
            style={{ fontSize: 32, lineHeight: "40px" }}
          >
            Nice to meet you!
          </p>
        </div>

        {/* Bio Container — Profile Image (left) + Text and Experiences (right).
            pb-80 = 80 px bottom padding inside the 665 px container. */}
        <div
          className="w-full flex items-start"
          style={{
            height: 665,
            paddingBottom: 80,
            gap: 40,
          }}
        >
          {/* Profile Image — same `viewTransitionName` as home + about, so
              the browser morphs the picture between all three pages on
              cross-page navigation (size + position interpolated, content
              crossfades). */}
          <div
            className="h-full aspect-square shrink-0 relative"
            style={{ viewTransitionName: "hero-illustration" }}
          >
            <img
              src="/assets/profile-image.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover block"
            />
          </div>

          {/* Text and Experiences Container — flex-1 column with gap-40 */}
          <div className="flex-1 min-w-0 flex flex-col items-start gap-[40px]">
            <p
              className="w-full text-[#5A5D70]"
              style={{
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "26px",
                letterSpacing: "0.5px",
              }}
            >
              My Experiences
            </p>

            {/* Experience rows — gap-32 between each */}
            <div className="w-full flex flex-col items-start gap-[32px] rounded-[24px]">
              {EXPERIENCES.map((item, i) => (
                <ExperienceRow key={`${item.name}-${i}`} item={item} />
              ))}
            </div>

            {/* GET IN TOUCH? CTA — links to /contact via the same
                document.startViewTransition path so the hero-illustration
                morphs from Work's profile portrait to Contact's face crop
                on click. */}
            <Link
              href="/contact"
              onClick={handleContactClick}
              className="w-full text-[#1F2753] shrink-0 block"
              style={{
                fontFamily: SOLWAY,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: "28px",
                textDecoration: "underline",
                textDecorationStyle: "solid",
              }}
            >
              GET IN TOUCH?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
