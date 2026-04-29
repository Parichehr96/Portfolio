"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = !!href && pathname === href;
  const className =
    "flex items-center justify-center p-[4px] shrink-0 " +
    (active
      ? "border-t border-b border-solid border-[#1B2249]"
      : "border-t border-b border-solid border-transparent");
  const inner = (
    <p className="text-[16px] leading-[24px] tracking-[0.5px] text-[#111323] whitespace-nowrap">
      {children}
    </p>
  );
  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <span className={className}>{inner}</span>
  );
}

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-[48px] py-[32px] w-full shrink-0">
      <Link
        href="/"
        className="w-[160px] text-[22px] leading-[28px] text-[#1F2753]"
      >
        Parichehr
      </Link>

      <div className="flex items-center gap-[48px] shrink-0">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/work">Work</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </div>

      <div className="flex items-center justify-end w-[160px]">
        <span className="text-[22px] leading-[28px] text-[#1F2753] whitespace-nowrap">
          Let&rsquo;s talk
        </span>
      </div>
    </nav>
  );
}
