"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShouldAnimateHome } from "./_components/useShouldAnimate";

/* === FIGMA DESIGN TOKENS (Home, node 288:1718) ===
   Frame: 1512 × 982 — content rendered inside ScaledShell which
   handles the scale-to-fit transform.
   Type: all Solway, Navy #1F2753
     - "Parichehr"        Solway Regular  240 / 260  tracking-16
     - "Talebzadeh"
       "Product Designer" Solway Light    24 / 36    tracking-5
     - bio                Solway Light 16/28, with Solway Regular spans
                          for the keywords (interaction / experience /
                          interface / design system / content)
     - KNOW ME MORE?      Solway Light 16/28, underlined, links to /about
     - Complexity tagline Solway Light 16/24 right-aligned
   Illustration: 868 × 868 absolute, top-114, left-1/2, -translateX-1/2
   FloatingNav: rendered by ScaledShell at left=565 top=854.
============================================================= */

export default function Home() {
  // Sequenced entrance only when the user opened or hard-refreshed `/`.
  // Any other entry to home (soft Link nav from /about, etc.) skips it.
  const shouldAnimate = useShouldAnimateHome();
  const router = useRouter();

  // Wrap navigation in document.startViewTransition so the shared
  // `viewTransitionName: "hero-illustration"` element morphs from
  // home position → about corner.
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
      {/* Background illustration — slides down from top at 1.3 s on home's
          load sequence. `viewTransitionName` makes this image the source
          for the cross-page morph when navigating to /about (and back). */}
      <div
        className={
          "absolute pointer-events-none " +
          (shouldAnimate ? "anim-fade-down" : "")
        }
        style={{
          left: "50%",
          marginLeft: -434,
          top: 114,
          width: 868,
          height: 868,
          viewTransitionName: "hero-illustration",
          ...(shouldAnimate
            ? { animationDelay: "1.3s", animationDuration: "0.4s" }
            : {}),
        }}
      >
        <img
          src="/assets/illustration.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Layout content — fills the 1512 × 982 design canvas */}
      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[160px] px-[120px] gap-[20px]">
        {/* Bio Section: Parichehr + Profile Info row */}
        <div className="w-full flex flex-col items-start gap-[20px] flex-1 min-h-px text-[#1F2753]">
          {/* "Parichehr" — display name (slides down at 0s for 0.3s) */}
          <p
            className={
              "font-normal w-full " +
              (shouldAnimate ? "anim-fade-down" : "")
            }
            style={{
              fontSize: 240,
              lineHeight: "260px",
              letterSpacing: "16px",
              ...(shouldAnimate
                ? { animationDelay: "0s", animationDuration: "0.3s" }
                : {}),
            }}
          >
            Parichehr
          </p>

          {/* "Talebzadeh" / "Product Designer" — top row of the "other texts"
              cohort. Each child animates independently (TL → TR), 0.2s each. */}
          <div
            className="w-full flex items-start justify-center flex-1 min-h-px"
            style={{
              fontWeight: 300,
              fontSize: 24,
              lineHeight: "36px",
              letterSpacing: "5px",
            }}
          >
            <p
              className={
                "flex-1 min-w-0 " + (shouldAnimate ? "anim-fade-down" : "")
              }
              style={
                shouldAnimate
                  ? { animationDelay: "0.3s", animationDuration: "0.2s" }
                  : undefined
              }
            >
              Talebzadeh
            </p>
            <p
              className={
                "whitespace-nowrap shrink-0 " +
                (shouldAnimate ? "anim-fade-down" : "")
              }
              style={
                shouldAnimate
                  ? { animationDelay: "0.5s", animationDuration: "0.2s" }
                  : undefined
              }
            >
              Product Designer
            </p>
          </div>
        </div>

        {/* Bio Container: bio + CTA on the left, Complexity tagline on the right */}
        <div className="w-full flex items-end justify-center text-[#1F2753] shrink-0">
          {/* Left column — bio paragraph + KNOW ME MORE? CTA */}
          <div
            className="flex flex-col items-start justify-center gap-[24px] shrink-0"
            style={{ fontWeight: 300 }}
          >
            <p
              className={shouldAnimate ? "anim-fade-down" : ""}
              style={{
                fontSize: 16,
                lineHeight: "28px",
                width: 327,
                ...(shouldAnimate
                  ? { animationDelay: "0.7s", animationDuration: "0.2s" }
                  : {}),
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
            {/* KNOW ME MORE? — appears at 0.9s in the queue, links to /about
                via the same view-transition path so the picture morph runs. */}
            <Link
              href="/about"
              onClick={handleAboutClick}
              className={shouldAnimate ? "anim-fade-down" : ""}
              style={{
                fontSize: 16,
                lineHeight: "28px",
                width: 316,
                textDecoration: "underline",
                textDecorationStyle: "solid",
                color: "#1F2753",
                ...(shouldAnimate
                  ? { animationDelay: "0.9s", animationDuration: "0.2s" }
                  : {}),
              }}
            >
              KNOW ME MORE?
            </Link>
          </div>

          {/* Right column — Complexity tagline (right-aligned, BR slot) */}
          <div className="flex-1 min-w-0 self-stretch flex flex-row items-end">
            <div className="flex-1 min-w-0 h-full flex flex-col items-end justify-end">
              <p
                className={shouldAnimate ? "anim-fade-down" : ""}
                style={{
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: "24px",
                  width: 251,
                  textAlign: "right",
                  ...(shouldAnimate
                    ? { animationDelay: "1.1s", animationDuration: "0.2s" }
                    : {}),
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
