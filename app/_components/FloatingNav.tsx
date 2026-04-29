"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShouldAnimate } from "./useShouldAnimate";

/* === FIGMA DESIGN TOKENS (Nav, instance 288:1727) ===
   Bar:    382 × 88. The Union SVG (#F9F5EB Cream) is the backdrop —
           it fills the full 382 × 88 box.
   Slot:   each at top=8, w=88, h=72 — at left = 6 / 100 / 194 / 288.
   Pill:   inside each slot, an 88 × 76 pill is vertically centered.
   Active:   bg Navy #1F2753, white-themed icon.
   Inactive: bg White, navy-themed icon.
   Hover:    on inactive items, bg switches to Navy at 10 % opacity.
   Icon:   40 × 40 inside each pill.
   Order:  Home, Work, About me, Contact (per Figma icon glyphs —
           dashboard / work-from-home / portrait / team chat).
=================================================== */

type Item = {
  href?: string;
  label: string;
  left: number;
  activeIcon: string;
  inactiveIcon: string;
};

// Contact page doesn't exist yet — its entry omits `href` and renders as
// a non-clickable visual. Add the href when the page lands.
const ITEMS: Item[] = [
  {
    href: "/",
    label: "Home",
    left: 6,
    activeIcon: "/assets/icon-nav-home-active.svg",
    inactiveIcon: "/assets/icon-nav-home-inactive.svg",
  },
  {
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
    label: "Contact",
    left: 288,
    activeIcon: "/assets/icon-nav-contact-active.svg",
    inactiveIcon: "/assets/icon-nav-contact-inactive.svg",
  },
];

type FloatingNavProps = {
  /** Base animation delay in seconds (only applies on the first render
   *  of the JS session — soft navigations skip animations entirely).
   *  Backdrop fades in at this offset, items pop in starting +0.5s
   *  later, every 0.3s. Defaults to 2.0 for the home load sequence. */
  startDelay?: number;
};

export default function FloatingNav({ startDelay = 2.0 }: FloatingNavProps) {
  const pathname = usePathname();
  const shouldAnimate = useShouldAnimate();
  const itemBase = startDelay + 0.5;

  return (
    <nav className="relative w-[382px] h-[88px] shrink-0">
      {/* Union backdrop. Animated only on first session render. */}
      <img
        src="/assets/nav-pill.svg"
        alt=""
        aria-hidden
        className={
          "absolute inset-0 w-full h-full pointer-events-none block " +
          (shouldAnimate ? "anim-fade" : "")
        }
        style={shouldAnimate ? { animationDelay: `${startDelay}s` } : undefined}
      />

      {ITEMS.map((item, i) => {
        const active = !!item.href && pathname === item.href;
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
          "group absolute top-[8px] w-[88px] h-[72px] " +
          (shouldAnimate ? "anim-pop-up" : "");
        const slotStyle: React.CSSProperties = { left: item.left };
        if (shouldAnimate) {
          slotStyle.animationDelay = `${itemDelay}s`;
          slotStyle.animationDuration = "0.3s";
        }
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
