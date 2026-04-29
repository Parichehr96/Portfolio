"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* === FIGMA DESIGN TOKENS (Nav, instance 288:1727) ===
   Bar:    382 × 88, bg Cream #F9F5EB, full pill rounded
   Slot:   each 88 × 76, gap-6, px-6 outer
   Active:   bg Navy #1F2753, white-themed icon
   Inactive: bg White, navy-themed icon (matches page bg = white)
   Icon:   40 × 40 inside each slot
=================================================== */

type Item = {
  href?: string;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
};

// About / Work / Contact pages don't exist yet — their entries omit `href`
// and render as non-clickable visuals. Add the href when each page lands.
const ITEMS: Item[] = [
  {
    href: "/",
    label: "Home",
    activeIcon: "/assets/icon-nav-home-active.svg",
    inactiveIcon: "/assets/icon-nav-home-inactive.svg",
  },
  {
    label: "About",
    activeIcon: "/assets/icon-nav-about-active.svg",
    inactiveIcon: "/assets/icon-nav-about-inactive.svg",
  },
  {
    label: "Work",
    activeIcon: "/assets/icon-nav-work-active.svg",
    inactiveIcon: "/assets/icon-nav-work-inactive.svg",
  },
  {
    label: "Contact",
    activeIcon: "/assets/icon-nav-contact-active.svg",
    inactiveIcon: "/assets/icon-nav-contact-inactive.svg",
  },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#F9F5EB] w-[382px] h-[88px] rounded-full flex items-center px-[6px] gap-[6px] shrink-0">
      {ITEMS.map((item) => {
        const active = !!item.href && pathname === item.href;
        const slotClass =
          "w-[88px] h-[76px] flex items-center justify-center rounded-full shrink-0 transition-colors duration-200 " +
          (active ? "bg-[#1F2753]" : "bg-white");
        const icon = (
          <img
            src={active ? item.activeIcon : item.inactiveIcon}
            alt=""
            width={40}
            height={40}
            className="w-[40px] h-[40px] block"
          />
        );
        return item.href ? (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={slotClass}
          >
            {icon}
          </Link>
        ) : (
          <span
            key={item.label}
            aria-label={item.label}
            className={slotClass}
          >
            {icon}
          </span>
        );
      })}
    </nav>
  );
}
