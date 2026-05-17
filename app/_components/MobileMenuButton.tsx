"use client";

/* === MobileMenuButton ===
   Outlined 3-dot menu pill rendered in the top-right of every mobile
   page's title row (Figma 510:7948 / 557:11245 / 558:11293 / 558:11302).
   Placeholder only — no click handler yet. Eventually this will open a
   mobile menu surface containing theme + scale options (currently
   hidden on mobile alongside this button, see ScaledShell). Until then
   the click is a no-op and the button is `aria-disabled`.

   Pill spec: 1.6 px cream-dark border, px-24 py-12, rounded-122, with a
   24 × 24 horizontal-dots glyph inside. The glyph wrapper carries
   `themed-icon` so the dark-navy dots flip to the white + light-blue
   palette under [data-theme="dark"], matching the rest of the UI. */
export default function MobileMenuButton() {
  return (
    <button
      type="button"
      aria-label="Menu"
      aria-disabled="true"
      tabIndex={-1}
      className="shrink-0 flex items-center justify-center gap-[6.4px] px-[19.2px] py-[9.6px] rounded-[122px] border-[1.28px] border-solid border-[var(--color-cream-dark)] cursor-default bg-transparent"
    >
      <span
        className="themed-icon relative shrink-0 inline-flex items-center justify-center"
        aria-hidden
        style={{ width: 19.2, height: 19.2 }}
      >
        {/* SVG natural aspect is ~3.73:1 (19.2 × 5.15 viewBox per
            Figma asset 510:7979). Setting width:19.2 + height:auto
            keeps the streamline-freehand dots at their intrinsic
            ratio and the flex centring on the wrapper places them
            vertically in the middle of the 19.2 × 19.2 icon box,
            matching the Figma `inset-[36.58%_0]` group. */}
        <img
          src="/assets/icon-menu-horizontal.svg"
          alt=""
          className="block"
          style={{ width: 19.2, height: "auto" }}
        />
      </span>
    </button>
  );
}
