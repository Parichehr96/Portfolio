"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useViewTransitionRouter } from "../_lib/useViewTransitionRouter";
import { useShouldAnimate } from "./useShouldAnimate";
import { useTheme } from "./ThemeProvider";

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
  const { handleClick } = useViewTransitionRouter();
  const shouldAnimate = useShouldAnimate();
  const { theme } = useTheme();
  const itemBase = startDelay + NAV_BACKDROP_DURATION;

  const activeIdx = ITEMS.findIndex((it) => it.href === pathname);
  const activeLeft = activeIdx >= 0 ? ITEMS[activeIdx].left : ITEMS[0].left;

  // The nav-icon SVGs ship in two contrast variants: `active` is
  // light-on-dark (designed to sit on the navy active pill) and
  // `inactive` is dark-on-light (designed to sit on the cream pill).
  // In dark mode the pill colors invert (cream pill = active, navy
  // pill = inactive), so the icon variants need to swap roles too —
  // otherwise the active item shows a light icon on a light pill.
  const activeIconKey: "activeIcon" | "inactiveIcon" =
    theme === "dark" ? "inactiveIcon" : "activeIcon";
  const inactiveIconKey: "activeIcon" | "inactiveIcon" =
    theme === "dark" ? "activeIcon" : "inactiveIcon";

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
      {/* Union backdrop — inline SVG (was an <img src="nav-pill.svg">)
          so the document's `--fill-0` CSS variable cascades into the
          <path>'s `fill="var(--fill-0, #F9F5EB)"` declaration. The
          inline form lets dark mode repaint the cream pill to navy
          dark without swapping the asset. */}
      <svg
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 382 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
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
      >
        <path
          d="M332 0C359.614 0 382 19.6995 382 44C382 68.3005 359.614 88 332 88C314.193 88 298.562 79.8083 289.704 67.4739C287.624 64.5772 282.376 64.5772 280.296 67.4739C271.438 79.8083 255.807 88 238 88C220.193 88 204.562 79.8083 195.704 67.4739C193.624 64.5772 188.376 64.5772 186.296 67.4739C177.438 79.8083 161.807 88 144 88C126.193 88 110.562 79.8083 101.704 67.4739C99.6236 64.5772 94.3764 64.5772 92.2962 67.4739C83.4384 79.8083 67.8067 88 50 88C22.3858 88 0 68.3005 0 44C0 19.6995 22.3858 0 50 0C67.8066 0 83.4384 8.1915 92.2963 20.5257C94.3765 23.4224 99.6235 23.4224 101.704 20.5257C110.562 8.1915 126.193 0 144 0C161.807 0 177.438 8.1915 186.296 20.5257C188.377 23.4224 193.623 23.4224 195.704 20.5257C204.562 8.1915 220.193 0 238 0C255.807 0 271.438 8.1915 280.296 20.5257C282.377 23.4224 287.623 23.4224 289.704 20.5257C298.562 8.1915 314.193 0 332 0Z"
          fill="var(--color-nav-pill-bg)"
        />
      </svg>

      {/* 4 slot click areas — pill bg fills with the inactive theme
          colour (white in light, navy-dark in dark). A second
          absolutely-positioned overlay supplies the hover tint via
          the theme-driven `--color-nav-hover-overlay` (dark wash in
          light, soft white wash in dark). */}
      {ITEMS.map((item, i) => {
        const className = `group absolute top-[8px] w-[88px] h-[72px] ${popClass}`;
        const style: React.CSSProperties = { left: item.left, ...popStyle(i) };
        const inner = (
          <>
            <span
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[76px] rounded-full pointer-events-none"
              style={{
                backgroundColor: "var(--color-nav-inactive-bg)",
              }}
            />
            <span
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[76px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                backgroundColor: "var(--color-nav-hover-overlay)",
              }}
            />
          </>
        );
        return item.href ? (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={className}
            style={style}
            onClick={handleClick(item.href)}
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

      {/* Active pill — navy in light, cream in dark. Bubbly slide
          between slot positions stays untouched. */}
      <span
        className={
          "absolute top-1/2 -translate-y-1/2 h-[76px] w-[88px] rounded-full pointer-events-none " +
          (shouldAnimate ? "anim-pop-up" : "")
        }
        style={{
          left: activeLeft,
          opacity: activeIdx >= 0 ? 1 : 0,
          backgroundColor: "var(--color-nav-active-bg)",
          transition: PILL_TRANSITION,
          ...(shouldAnimate
            ? {
                animationDelay: popDelay(Math.max(0, activeIdx)),
                animationDuration: `${NAV_ITEM_DURATION}s`,
              }
            : {}),
        }}
      />

      {/* Icons (top layer) — opacity cross-fade between active/inactive
          variants. In dark mode the variant keys swap so the active
          item still shows a dark glyph on its (now cream) pill and
          the inactive items show a light glyph on their navy pills. */}
      {ITEMS.map((item, i) => {
        const active = !!item.href && pathname === item.href;
        const className = `absolute top-[8px] w-[88px] h-[72px] flex items-center justify-center pointer-events-none ${popClass}`;
        const style: React.CSSProperties = { left: item.left, ...popStyle(i) };
        return (
          <div key={`icon-${item.label}`} className={className} style={style}>
            <div className="relative w-[40px] h-[40px]">
              <img
                src={item[inactiveIconKey]}
                alt=""
                width={40}
                height={40}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: active ? 0 : 1, transition: ICON_TRANSITION }}
              />
              <img
                src={item[activeIconKey]}
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
