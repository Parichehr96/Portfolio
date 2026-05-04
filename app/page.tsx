"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* === FIGMA DESIGN TOKENS (Home, node 288:1718) ===
   Frame: 1512 × 982 — content rendered inside ScaledShell which
   handles the scale-to-fit transform.
   Type: all Solway, Navy #1F2753

   Mount-time animation: every element below carries
   `className="anim-bubbly-grow"` with an inline `--stage` (0 → N) so
   they pop in top-left → bottom-right with a 250 ms stagger,
   completing in ~2 s total. The illustration uses `viewTransitionName`
   so it morphs to the next page's illustration where the View
   Transitions API is supported.
============================================================= */

const STAGE = (n: number) =>
  ({ "--stage": n }) as React.CSSProperties;

export default function Home() {
  const router = useRouter();

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
    const startVT = (
      document as unknown as {
        startViewTransition?: (cb: () => void) => unknown;
      }
    ).startViewTransition;
    if (typeof startVT !== "function") return;
    e.preventDefault();
    startVT.call(document, () => {
      router.push("/about");
    });
  };

  return (
    <>
      {/* Background illustration — `viewTransitionName` makes this the
          matching layer that physically morphs to /about's illustration.
          No bubbly grow here so the morph reads cleanly. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          marginLeft: -434,
          top: 114,
          width: 868,
          height: 868,
          viewTransitionName: "hero-illustration",
        }}
      >
        <img
          src="/assets/illustration.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[160px] px-[120px] gap-[20px]">
        <div className="w-full flex flex-col items-start gap-[20px] flex-1 min-h-px text-[#1F2753]">
          {/* "Parichehr" — top-left, stage 0 */}
          <p
            className="font-normal w-full anim-bubbly-grow"
            style={{
              fontSize: 240,
              lineHeight: "260px",
              letterSpacing: "16px",
              transformOrigin: "left center",
              ...STAGE(0),
            }}
          >
            Parichehr
          </p>

          <div
            className="w-full flex items-start justify-center flex-1 min-h-px"
            style={{
              fontWeight: 300,
              fontSize: 24,
              lineHeight: "36px",
              letterSpacing: "5px",
            }}
          >
            {/* "Talebzadeh" — stage 1 */}
            <p
              className="flex-1 min-w-0 anim-bubbly-grow"
              style={{ transformOrigin: "left center", ...STAGE(1) }}
            >
              Talebzadeh
            </p>
            {/* "Product Designer" — stage 2 (top-right) */}
            <p
              className="whitespace-nowrap shrink-0 anim-bubbly-grow"
              style={{ transformOrigin: "right center", ...STAGE(2) }}
            >
              Product Designer
            </p>
          </div>
        </div>

        <div className="w-full flex items-end justify-center text-[#1F2753] shrink-0">
          <div
            className="flex flex-col items-start justify-center gap-[24px] shrink-0"
            style={{ fontWeight: 300 }}
          >
            {/* Bio — stage 3 */}
            <p
              className="anim-bubbly-grow"
              style={{
                fontSize: 16,
                lineHeight: "28px",
                width: 327,
                transformOrigin: "left center",
                ...STAGE(3),
              }}
            >
              designing digital products, containing{" "}
              <span style={{ fontWeight: 400 }}>interaction</span>,{" "}
              <span style={{ fontWeight: 400 }}>experience</span>,{" "}
              <span style={{ fontWeight: 400 }}>interface</span>,{" "}
              <span style={{ fontWeight: 400 }}>design system</span>, and{" "}
              <span style={{ fontWeight: 400 }}>content</span>, within
              various product team for modern businesses.
            </p>
            {/* KNOW ME MORE? — stage 4 */}
            <Link
              href="/about"
              onClick={handleAboutClick}
              className="anim-bubbly-grow"
              style={{
                fontSize: 16,
                lineHeight: "28px",
                width: 316,
                textDecoration: "underline",
                textDecorationStyle: "solid",
                color: "#1F2753",
                transformOrigin: "left center",
                ...STAGE(4),
              }}
            >
              KNOW ME MORE?
            </Link>
          </div>

          <div className="flex-1 min-w-0 self-stretch flex flex-row items-end">
            <div className="flex-1 min-w-0 h-full flex flex-col items-end justify-end">
              {/* Complexity tagline — stage 5 (bottom-right) */}
              <p
                className="anim-bubbly-grow"
                style={{
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: "24px",
                  width: 251,
                  textAlign: "right",
                  transformOrigin: "right center",
                  ...STAGE(5),
                }}
              >
                Complexity is inevitable, Confusion is optional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
