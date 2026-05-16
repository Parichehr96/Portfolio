"use client";

import Link from "next/link";
import { font } from "../_lib/tokens";
import { useViewTransitionRouter } from "../_lib/useViewTransitionRouter";
import { fs } from "../_lib/typography";

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
  /** Optional — Contact's "Set a Meeting" pill has no icon (Figma
   *  535:11128). When omitted, the inner span is skipped entirely so
   *  the label centres on its own. */
  iconSrc?: string;
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

// Pill spec tightened in the 2026-05 Figma refresh (About 535:8396,
// Contact 535:11128, Work 535:8371): gap 12 → 8, px 16 → 24, rounded
// 120 → 122, secondary border 2 → 1.6, label 14 → 16.
const baseClass =
  "flex-1 min-w-0 flex items-center justify-center gap-[8px] px-[24px] py-[12px] rounded-[122px] transition-colors duration-200";
// Primary CTA bg + hover read from theme tokens (cream → cream-dark
// in light, navy-light → navy in dark) per Figma 549:11218 so the
// pill repaints to navy-light with a white label when dark mode is
// active without each call site needing to know.
const primaryClass =
  "bg-[var(--color-cta-primary-bg)] hover:bg-[var(--color-cta-primary-hover)] cursor-pointer";
// Transparent bg lets the secondary pill read as an outlined button on
// both themes (white card on light, navy card on dark) — only the
// border + hover overlay change color via the theme variable.
const secondaryClass =
  "bg-transparent border-[1.6px] border-solid border-[var(--color-cream-dark)] hover:bg-[rgba(249,245,235,0.12)] cursor-pointer";

function ButtonInner({
  iconSrc,
  label,
  uppercase,
  variant,
}: Pick<CTAButtonProps, "iconSrc" | "label" | "uppercase" | "variant">) {
  // Primary pill's bg + text both swap with theme (cream / navy-dark
  // in light → navy-light / white in dark) via the
  // `--color-cta-primary-*` tokens. Secondary is transparent and
  // sits on the page bg, so it follows the theme's primary text
  // colour (navy in light, white in dark).
  const labelColor =
    variant === "primary"
      ? "var(--color-cta-primary-text)"
      : "var(--color-text-primary)";
  return (
    <>
      {iconSrc && (
        // `themed-icon` is a no-op in light mode (the filter only
        // applies under `[data-theme="dark"]`), so applying it to
        // both variants is safe: it keeps the navy artwork on light
        // cream / light page bg, and shifts the icon to the white +
        // light-blue palette in dark mode where the primary pill bg
        // becomes navy-light (otherwise the dark-navy glyph
        // disappears into the pill).
        <span className="themed-icon relative shrink-0 inline-block w-[24px] h-[24px]">
          <img
            src={iconSrc}
            alt=""
            className="absolute inset-0 w-full h-full block"
          />
        </span>
      )}
      <span
        className="whitespace-nowrap"
        style={{
          color: labelColor,
          fontFamily: font.solway,
          fontWeight: 400,
          fontSize: fs(16),
          lineHeight: "24px",
          letterSpacing: "0.15px",
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
    <ButtonInner
      iconSrc={iconSrc}
      label={label}
      uppercase={uppercase}
      variant={variant}
    />
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
