/* Design tokens — single source of truth for colors, fonts, and the
   Figma canvas dimensions used by ScaledShell. Anything that wants a
   brand color or font stack should import from here rather than
   hard-coding the literal. CSS custom properties mirroring these
   values are declared in globals.css under the same names so style={}
   and className can both reach them. */

export const color = {
  navy: "#1F2753",
  navyDark: "#1B2249",
  navyDeep: "#28315F",
  grayNavy: "#5A5D70",
  graySoft: "#7E7F85",
  grayLight: "#DDE0F1",
  cream: "#F9F5EB",
  creamDark: "#EDEAE4",
  creamLight: "#FEFBF5",
  white: "#FFFFFF",
} as const;

export const font = {
  solway: "var(--font-solway), serif",
  spaceGrotesk: "var(--font-space-grotesk), sans-serif",
} as const;

/** Figma reference canvases used by ScaledShell. */
export const canvas = {
  desktopWidth: 1512,
  desktopHeight: 982,
  mobileWidth: 390,
  mobileHeight: 844,
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  tabletScaleMultiplier: 0.9,
} as const;

/** Easing tokens reused across hover/transition animations. */
export const easing = {
  bubbly: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
