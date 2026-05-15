/* 24x24 external-link chevron used next to inline links across the
   four main routes. `light` swaps to the white variant for use inside
   navy-pill rows (selected experience, social pills on cream cards).
   Otherwise the wrapper is `themed-icon` so the navy SVG inverts to
   cream when the page is in dark mode. */
export default function LinkExternalIcon({
  light = false,
}: {
  light?: boolean;
}) {
  const src = light
    ? "/assets/icon-link-external-white.svg"
    : "/assets/icon-link-external.svg";
  // The `light` variant is already white, so it doesn't need the
  // dark-mode invert filter — only the navy default variant does.
  const themed = light ? "" : "themed-icon";
  return (
    <span
      className={`${themed} relative shrink-0 inline-block w-[24px] h-[24px]`}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full block transition-opacity duration-300"
      />
    </span>
  );
}
