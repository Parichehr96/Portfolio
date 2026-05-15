"use client";

import { useEffect, useRef, useState } from "react";
import { type Scale, useScale } from "./ScaleProvider";
import { useTheme } from "./ThemeProvider";
import { fs } from "../_lib/typography";

/* === Top-right secondary buttons (Figma 497:3627 / 518:8154) ===
   Two stacked 48 × N pill buttons that sit at the top-right of every
   main page's title row:

   1. Theme toggle (always 48 × 48):
        - Moon glyph in light → tap switches to dark
        - Sun glyph in dark → tap switches back to light

   2. Font-size scale (48 × ? — expands on tap, Figma 518:8219):
        - Collapsed: shows the currently active size ("1x", "2x", or
          "3x") with no underline.
        - Tap: expands to a stacked column listing all three options;
          the currently-active option renders Bold + underlined.
        - Tap an option: applies the scale and collapses the column.
        - Outside click + Escape close without changing the scale.

   Both share the cream-dark 1.6 px border + rounded-122 + cream hover
   used by the secondary CTA elsewhere. Text/icon colours come from
   `--color-secondary-button-text` so they swap automatically with
   theme. */

/* Streamline-freehand-color theme glyphs straight from the Figma
   source. `icon-theme-dark.svg` is "light-mode-brightness-half"
   (Figma I497:3604;497:3635) — shown when the user is in light mode,
   indicating "tap to switch to dark". `icon-theme-light.svg` is
   "light-mode-dark-light" (Figma I497:3739;497:3604;497:3648) — shown
   in dark mode, indicating "tap to switch to light". Each asset is
   colored for its target background, so no filter is applied. */
function ThemeIcon({ dark }: { dark: boolean }) {
  const src = dark
    ? "/assets/icon-theme-light.svg"
    : "/assets/icon-theme-dark.svg";
  return (
    <span
      className="relative shrink-0 inline-block"
      style={{ width: 24, height: 24 }}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full block"
      />
    </span>
  );
}

const SCALES: Scale[] = ["1", "2", "3"];

const themeButtonClass =
  "size-[48px] flex items-center justify-center rounded-[122px] border-[1.6px] border-solid border-[var(--color-border-soft)] bg-transparent hover:bg-[var(--color-cream-hover-overlay)] transition-colors duration-200 cursor-pointer";

function ScaleButton() {
  const { scale, setScale } = useScale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + Escape. Listeners only mount while the
  // dropdown is open so they don't constantly poll when collapsed.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target || !rootRef.current) return;
      if (!rootRef.current.contains(target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-solway), serif",
    fontSize: fs(16),
    lineHeight: "24px",
    letterSpacing: "0.15px",
    color: "var(--color-secondary-button-text)",
  };

  // The collapsed 48 × 48 anchor button is ALWAYS rendered in layout
  // (and stays visible when closed). When the user opens the picker
  // we render the expanded 48-wide pill on top of it via absolute
  // positioning, so the surrounding flex column (and the page rows
  // below it) never reflow as the picker grows downward.
  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Font size: ${scale}x. Tap to change.`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={themeButtonClass}
        // Hide the collapsed label while the picker is open so the
        // duplicated "Nx" text from the dropdown doesn't bleed through
        // the panel — the button itself stays in layout to preserve
        // the column height.
        style={{ visibility: open ? "hidden" : "visible" }}
      >
        <span style={labelStyle}>{scale}x</span>
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Font size"
          className="absolute top-0 left-0 flex flex-col items-center justify-center rounded-[122px] border-[1.6px] border-solid border-[var(--color-border-soft)] bg-[var(--color-bg-page)] z-10"
          style={{ width: 48, padding: 12, gap: 16 }}
        >
          {SCALES.map((s) => {
            const active = s === scale;
            return (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setScale(s);
                  setOpen(false);
                }}
                className="cursor-pointer flex items-center justify-center"
                style={{
                  ...labelStyle,
                  fontWeight: active ? 700 : 400,
                  textDecorationLine: active ? "underline" : undefined,
                  textDecorationStyle: active ? "solid" : undefined,
                }}
              >
                {s}x
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TopRightButtons({
  stage,
  align = "top",
}: {
  /** --stage value for the bubbly mount animation. Pass the same stage
   *  the title row uses so the buttons pop in alongside it. */
  stage: number;
  /** Vertical alignment within the parent flex row. Defaults to "top"
   *  so the buttons sit alongside the first title line; pass "center"
   *  when wrapping a single tall title element (e.g. the home name). */
  align?: "top" | "center";
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="shrink-0 flex flex-col items-start gap-[20px] anim-bubbly-grow"
      style={{
        justifyContent: align === "center" ? "center" : "flex-start",
        transformOrigin: "right top",
        ["--stage" as string]: stage,
      }}
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={isDark}
        className={themeButtonClass}
      >
        <ThemeIcon dark={isDark} />
      </button>
      <ScaleButton />
    </div>
  );
}
