"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function FooterNavItem({
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

function Divider() {
  return (
    <span className="text-[22px] leading-[28px] text-[#EDEAE4] shrink-0">
      |
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="flex items-start justify-center px-[48px] py-[32px] w-full shrink-0">
      <div className="flex-1 min-w-0 flex items-center justify-between p-[40px] border-t border-b border-solid border-[#1F2753]">
        <div className="flex flex-col items-start gap-[16px] shrink-0">
          <p className="w-[160px] text-[32px] leading-[40px] text-[#1F2753]">
            Parichehr
          </p>
          <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] text-[#5A5D70] whitespace-nowrap">
            All rights reserved
          </p>
        </div>
        <div className="flex items-center gap-[24px] shrink-0">
          <FooterNavItem href="/">Home</FooterNavItem>
          <Divider />
          <FooterNavItem href="/about">About</FooterNavItem>
          <Divider />
          <FooterNavItem href="/work">Work</FooterNavItem>
          <Divider />
          <FooterNavItem href="/contact">Contact</FooterNavItem>
        </div>
      </div>
    </footer>
  );
}
