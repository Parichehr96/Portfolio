"use client";

import Link from "next/link";
import { font } from "../_lib/tokens";
import { useViewTransitionRouter } from "../_lib/useViewTransitionRouter";

/* === Shared CTA pill ===
   Used on the four main routes (Home/About/Work/Contact). Variant:
   - primary   = cream bg, hover darkens
   - secondary = white bg with cream-dark border, hover cream
   When `href` is omitted the button renders as a non-clickable span
   placeholder (used for "MY CV" until a destination is provided).
   Internal hrefs route via useViewTransitionRouter so the shared
   hero-illustration morph fires on navigation; external/mailto/tel
   hrefs short-circuit that and use a plain anchor with target="_blank"
   when `external` is set. */
export type CTAButtonVariant = "primary" | "secondary";

export type CTAButtonProps = {
  href?: string;
  iconSrc: string;
  label: string;
  variant: CTAButtonVariant;
  uppercase?: boolean;
  /** When true (or for protocol-prefixed hrefs), opens in a new tab and
   *  bypasses View Transitions. Detected automatically for mailto:,
   *  tel:, and absolute http(s):// hrefs. */
  external?: boolean;
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

const baseClass =
  "flex-1 min-w-0 flex items-center justify-center gap-[12px] px-[16px] py-[12px] rounded-[120px] transition-colors duration-200";
const primaryClass = "bg-[var(--color-cream)] hover:bg-[var(--color-cream-dark)] cursor-pointer";
const secondaryClass =
  "bg-white border-2 border-solid border-[var(--color-cream-dark)] hover:bg-[var(--color-cream)] cursor-pointer";

function ButtonInner({
  iconSrc,
  label,
  uppercase,
}: Pick<CTAButtonProps, "iconSrc" | "label" | "uppercase">) {
  return (
    <>
      <span className="relative shrink-0 inline-block w-[24px] h-[24px]">
        <img
          src={iconSrc}
          alt=""
          className="absolute inset-0 w-full h-full block"
        />
      </span>
      <span
        className="whitespace-nowrap"
        style={{
          color: "var(--color-navy)",
          fontFamily: font.solway,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "18px",
          textTransform: uppercase ? "uppercase" : undefined,
        }}
      >
        {label}
      </span>
    </>
  );
}

export default function CTAButton({
  href,
  iconSrc,
  label,
  variant,
  uppercase = false,
  external,
}: CTAButtonProps) {
  const { handleClick } = useViewTransitionRouter();
  const variantClass = variant === "primary" ? primaryClass : secondaryClass;

  const inner = (
    <ButtonInner iconSrc={iconSrc} label={label} uppercase={uppercase} />
  );

  if (!href) {
    return <span className={`${baseClass} ${variantClass}`}>{inner}</span>;
  }

  const isExt = external ?? isExternalHref(href);
  if (isExt) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${variantClass}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick(href)}
      className={`${baseClass} ${variantClass}`}
    >
      {inner}
    </Link>
  );
}
