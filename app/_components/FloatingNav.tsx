"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* === FIGMA DESIGN TOKENS (Nav, instance 288:1727) ===
   Bar:    382 × 88. The Union SVG (#F9F5EB Cream) is the backdrop —
           it fills the full 382 × 88 box, providing the cream rim and
           inter-slot connectors. Items overlay it with their own bg.
   Slot:   each at top=8, w=88, h=72 — at left = 6 / 100 / 194 / 288.
   Pill:   inside each slot, an 88 × 76 pill is vertically centered
           (translate -50% from top-1/2), so it pops 2 px above/below
           the 72 px slot but stays inside the 88 px Union.
   Active:   bg Navy #1F2753 with white-themed icon.
   Inactive: bg White with navy-themed icon — the cream Union rim
             and inter-slot strip show as the visible "ring".
   Icon:   40 × 40 inside each pill.
=================================================== */

type Item = {
  href?: string;
  label: string;
  left: number;
  activeIcon: string;
  inactiveIcon: string;
};

// Work / Contact pages don't exist yet — their entries omit `href` and render
// as non-clickable visuals. Add the href when each page lands.
const ITEMS: Item[] = [
  {
    href: "/",
    label: "Home",
    left: 6,
    activeIcon: "/assets/icon-nav-home-active.svg",
    inactiveIcon: "/assets/icon-nav-home-inactive.svg",
  },
  {
    href: "/about",
    label: "About",
    left: 100,
    activeIcon: "/assets/icon-nav-about-active.svg",
    inactiveIcon: "/assets/icon-nav-about-inactive.svg",
  },
  {
    label: "Work",
    left: 194,
    activeIcon: "/assets/icon-nav-work-active.svg",
    inactiveIcon: "/assets/icon-nav-work-inactive.svg",
  },
  {
    label: "Contact",
    left: 288,
    activeIcon: "/assets/icon-nav-contact-active.svg",
    inactiveIcon: "/assets/icon-nav-contact-inactive.svg",
  },
];

type FloatingNavProps = {
  /** Base animation delay in seconds. Backdrop fades in at this offset
   *  (0.5s duration), then items pop in starting `+0.5s` later, every
   *  `0.3s`. Defaults to 2.0 (matches the home page's load sequence). */
  startDelay?: number;
};

export default function FloatingNav({ startDelay = 2.0 }: FloatingNavProps) {
  const pathname = usePathname();
  const itemBase = startDelay + 0.5;

  return (
    <nav className="relative w-[382px] h-[88px] shrink-0">
      {/* Union backdrop — fades in at startDelay for 0.5s. */}
      <img
        src="/assets/nav-pill.svg"
        alt=""
        aria-hidden
        className="anim-fade absolute inset-0 w-full h-full pointer-events-none block"
        style={{ animationDelay: `${startDelay}s` }}
      />

      {ITEMS.map((item, i) => {
        const active = !!item.href && pathname === item.href;
        // Items pop in left-to-right after the backdrop, every 0.3s, 0.3s each.
        const itemDelay = itemBase + i * 0.3;
        const pill = (
          <span
            className={
              "absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[76px] rounded-full flex items-center justify-center transition-colors duration-200 " +
              (active
                ? "bg-[#1F2753]"
                : "bg-white group-hover:bg-[#1F2753]/10")
            }
          >
            <img
              src={active ? item.activeIcon : item.inactiveIcon}
              alt=""
              width={40}
              height={40}
              className="w-[40px] h-[40px] block"
            />
          </span>
        );
        const slotClass =
          "anim-pop-up group absolute top-[8px] w-[88px] h-[72px]";
        const slotStyle = {
          left: item.left,
          animationDelay: `${itemDelay}s`,
          animationDuration: "0.3s",
        };
        return item.href ? (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={slotClass}
            style={slotStyle}
          >
            {pill}
          </Link>
        ) : (
          <span
            key={item.label}
            aria-label={item.label}
            className={slotClass}
            style={slotStyle}
          >
            {pill}
          </span>
        );
      })}
    </nav>
  );
}
