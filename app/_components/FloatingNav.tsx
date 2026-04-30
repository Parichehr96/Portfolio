"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShouldAnimate } from "./useShouldAnimate";

/* === FIGMA DESIGN TOKENS (Nav, instance 288:1727) ===
   Bar:    382 × 88. The Union SVG (Cream) is the backdrop.
   Slot:   each at top=8, w=88, h=72 — at left = 6 / 100 / 194 / 288.
   Active:   navy #1F2753 pill, white-themed icon.
   Inactive: white pill, navy-themed icon.
   Hover:    inactive bg shifts to Navy at 10 % opacity.
   Order:  Home / Work / About me / Contact.

   Architecture: a single navy "active pill" is rendered absolutely,
   driven only by `left`. When the pathname changes, it slides between
   slot positions with a bubbly cubic-bezier easing. Icons cross-fade
   their active/inactive variants via opacity transitions. Because
   FloatingNav lives in the persistent layout, these transitions
   animate naturally between pages — the component itself never
   unmounts on Link navigation.
=================================================== */

type Item = {
  href?: string;
  label: string;
  left: number;
  activeIcon: string;
  inactiveIcon: string;
};

const ITEMS: Item[] = [
  {
    href: "/",
    label: "Home",
    left: 6,
    activeIcon: "/assets/icon-nav-home-active.svg",
    inactiveIcon: "/assets/icon-nav-home-inactive.svg",
  },
  {
    href: "/work",
    label: "Work",
    left: 100,
    activeIcon: "/assets/icon-nav-work-active.svg",
    inactiveIcon: "/assets/icon-nav-work-inactive.svg",
  },
  {
    href: "/about",
    label: "About me",
    left: 194,
    activeIcon: "/assets/icon-nav-about-active.svg",
    inactiveIcon: "/assets/icon-nav-about-inactive.svg",
  },
  {
    href: "/contact",
    label: "Contact",
    left: 288,
    activeIcon: "/assets/icon-nav-contact-active.svg",
    inactiveIcon: "/assets/icon-nav-contact-inactive.svg",
  },
];

const PILL_TRANSITION = "left 700ms cubic-bezier(0.34, 1.56, 0.64, 1)";
const ICON_TRANSITION = "opacity 500ms ease-out";

type FloatingNavProps = {
  /** Animation delay in seconds for the very first session render.
   *  Backdrop fades in at this offset (0.3 s), items pop in starting
   *  +0.3 s later, every 0.2 s, each 0.2 s long. After first render,
   *  soft navigations are silent (only the bubbly active-pill slide
   *  + icon cross-fade). */
  startDelay?: number;
};

const NAV_BACKDROP_DURATION = 0.3;
const NAV_ITEM_DURATION = 0.2;
const NAV_ITEM_STAGGER = 0.2;

export default function FloatingNav({ startDelay = 1.5 }: FloatingNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const shouldAnimate = useShouldAnimate();
  const itemBase = startDelay + NAV_BACKDROP_DURATION;

  const activeIdx = ITEMS.findIndex((it) => it.href === pathname);
  const activeLeft = activeIdx >= 0 ? ITEMS[activeIdx].left : ITEMS[0].left;

  // Navigate inside a View Transition so the shared
  // `viewTransitionName: "hero-illustration"` element morphs from
  // home position → about corner (and back) automatically.
  const handleNav = (href: string) => (e: React.MouseEvent) => {
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

  const popDelay = (i: number) => `${itemBase + i * NAV_ITEM_STAGGER}s`;
  const popClass = shouldAnimate ? "anim-pop-up" : "";
  const popStyle = (i: number): React.CSSProperties =>
    shouldAnimate
      ? {
          animationDelay: popDelay(i),
          animationDuration: `${NAV_ITEM_DURATION}s`,
        }
      : {};

  return (
    <nav className="relative w-[382px] h-[88px] shrink-0">
      {/* Union backdrop — fades in once on first session render (0.3 s) */}
      <img
        src="/assets/nav-pill.svg"
        alt=""
        aria-hidden
        className={
          "absolute inset-0 w-full h-full pointer-events-none block " +
          (shouldAnimate ? "anim-fade" : "")
        }
        style={
          shouldAnimate
            ? {
                animationDelay: `${startDelay}s`,
                animationDuration: `${NAV_BACKDROP_DURATION}s`,
              }
            : undefined
        }
      />

      {/* 4 slot click areas with white pill bg + hover overlay */}
      {ITEMS.map((item, i) => {
        const className = `group absolute top-[8px] w-[88px] h-[72px] ${popClass}`;
        const style: React.CSSProperties = { left: item.left, ...popStyle(i) };
        const inner = (
          <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[76px] rounded-full bg-white pointer-events-none transition-colors duration-200 group-hover:bg-[#1F2753]/10" />
        );
        return item.href ? (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={className}
            style={style}
            onClick={handleNav(item.href)}
          >
            {inner}
          </Link>
        ) : (
          <span
            key={item.label}
            aria-label={item.label}
            className={className}
            style={style}
          >
            {inner}
          </span>
        );
      })}

      {/* Single navy active pill — bubbly slide between slot positions */}
      <span
        className={
          "absolute top-1/2 -translate-y-1/2 h-[76px] w-[88px] rounded-full bg-[#1F2753] pointer-events-none " +
          (shouldAnimate ? "anim-pop-up" : "")
        }
        style={{
          left: activeLeft,
          opacity: activeIdx >= 0 ? 1 : 0,
          transition: PILL_TRANSITION,
          ...(shouldAnimate
            ? {
                animationDelay: popDelay(Math.max(0, activeIdx)),
                animationDuration: `${NAV_ITEM_DURATION}s`,
              }
            : {}),
        }}
      />

      {/* Icons (top layer) — opacity cross-fade between active/inactive */}
      {ITEMS.map((item, i) => {
        const active = !!item.href && pathname === item.href;
        const className = `absolute top-[8px] w-[88px] h-[72px] flex items-center justify-center pointer-events-none ${popClass}`;
        const style: React.CSSProperties = { left: item.left, ...popStyle(i) };
        return (
          <div key={`icon-${item.label}`} className={className} style={style}>
            <div className="relative w-[40px] h-[40px]">
              <img
                src={item.inactiveIcon}
                alt=""
                width={40}
                height={40}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: active ? 0 : 1, transition: ICON_TRANSITION }}
              />
              <img
                src={item.activeIcon}
                alt=""
                width={40}
                height={40}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: active ? 1 : 0, transition: ICON_TRANSITION }}
              />
            </div>
          </div>
        );
      })}
    </nav>
  );
}
