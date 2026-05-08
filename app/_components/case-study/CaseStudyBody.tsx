import Image from "next/image";
import type React from "react";
import { color, font } from "../../_lib/tokens";

/* === Shared case-study body primitives ===
   These are the small building blocks used inside every long-form
   case-study page (under /work/<slug>). Each one is a thin wrapper
   around the Figma type tokens so case-study pages can stay focused
   on content layout instead of re-stating the brand/typography rules
   on every paragraph. */

const NAVY = color.navy;
const NAVY_DARK = color.navyDark;
const SOLWAY = font.solway;

export type SectionTitleSize = "xl" | "lg" | "md";

const SECTION_TITLE_SIZES: Record<
  SectionTitleSize,
  { fontSize: number; lineHeight: string; fontWeight: number }
> = {
  xl: { fontSize: 32, lineHeight: "40px", fontWeight: 700 },
  lg: { fontSize: 28, lineHeight: "36px", fontWeight: 700 },
  md: { fontSize: 24, lineHeight: "32px", fontWeight: 700 },
};

export function SectionTitle({
  text,
  size = "lg",
}: {
  text: string;
  size?: SectionTitleSize;
}) {
  const s = SECTION_TITLE_SIZES[size];
  return (
    <p
      className="w-full"
      style={{ color: NAVY, fontFamily: SOLWAY, ...s }}
    >
      {text}
    </p>
  );
}

const BODY_STYLE: React.CSSProperties = {
  color: NAVY,
  fontFamily: SOLWAY,
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "24px",
  letterSpacing: "0.5px",
};

export function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-full" style={BODY_STYLE}>
      {children}
    </p>
  );
}

export function BodyBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col" style={{ gap: 16, ...BODY_STYLE }}>
      {children}
    </div>
  );
}

/** Body-medium caption, left-aligned. Sits under each image in
 *  challenquiz; matches Body/medium per the design tokens. */
export function ImageCaption({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="w-full"
      style={{
        color: NAVY,
        fontFamily: SOLWAY,
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "20px",
        letterSpacing: "0.25px",
        textAlign: "left",
      }}
    >
      {children}
    </p>
  );
}

export type ImageFrameProps = {
  src: string;
  alt: string;
  /** Fill mode:
   *  - `fixed` (default when `height` is set): a fixed-height frame
   *    where the image is `object-contain` inside it. Used when the
   *    surrounding layout demands a specific row height (WOW phase /
   *    system blocks).
   *  - `natural`: frame height follows the image's natural aspect.
   *    Used by challenquiz where the frame should hug the image. */
  height?: number;
  bg?: string;
  rounded?: number;
  padding?: number;
  imgStyle?: React.CSSProperties;
};

/** Cream-framed image. When `height` is provided the frame is fixed-
 *  height with `object-contain` and the image is served via
 *  `next/image` for AVIF/WebP optimization. Without `height` the frame
 *  hugs the image's natural aspect — falls back to `<img>` since the
 *  intrinsic dimensions aren't known up front. */
export function ImageFrame({
  src,
  alt,
  height,
  bg = color.creamLight,
  rounded = 20,
  padding = 0,
  imgStyle,
}: ImageFrameProps) {
  if (height === undefined) {
    return (
      <div
        className="w-full overflow-hidden"
        style={{ backgroundColor: bg, borderRadius: rounded, padding }}
      >
        <img
          src={src}
          alt={alt}
          className="block w-full h-auto"
          style={imgStyle}
        />
      </div>
    );
  }
  const objectFit = (imgStyle?.objectFit as React.CSSProperties["objectFit"]) ?? "contain";
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: bg,
        height,
        borderRadius: rounded,
        padding,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 1272px, 100vw"
        className="block"
        style={{ objectFit, ...imgStyle }}
      />
    </div>
  );
}

/** Sub-title (Solway Regular 22/28 navy-dark) + body paragraph block,
 *  used at the bottom of every case study for the "What I learned"
 *  reflection section. */
export function ReflectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-start" style={{ gap: 8 }}>
      <p
        className="w-full"
        style={{
          color: NAVY_DARK,
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 22,
          lineHeight: "28px",
        }}
      >
        {title}
      </p>
      <p className="w-full" style={BODY_STYLE}>
        {children}
      </p>
    </div>
  );
}
