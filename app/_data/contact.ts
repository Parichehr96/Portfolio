export type Social = {
  /** Optional href — when omitted the button renders as a non-clickable
   *  visual placeholder. */
  href?: string;
  src: string;
  alt: string;
  /** SVG's intrinsic viewBox dimensions, taken from the asset itself.
   *  Rendering at these natural sizes inside the 40 × 40 wrapper
   *  reproduces Figma's nested-inset framing without hand-tuned CSS. */
  iconWidth: number;
  iconHeight: number;
  /** Optional vertical translate (CSS length / percentage) applied to
   *  the rendered <img> so the icon's *visible* content centers in the
   *  wrapper. Some SVGs (notably Medium) have the visible glyph in
   *  the top portion of the viewBox and bottom padding inside, so a
   *  pure flex-center leaves the glyph visually too high. Percentage
   *  is resolved against the image's own height — same value works
   *  in both the 40 px desktop pill and the 24 px mobile pill. */
  verticalNudge?: string;
};

export const EMAIL = "parichehr.t96@gmail.com";
export const PHONE_DISPLAY = "+31-657248971";
// WhatsApp wants international digits with no `+` or punctuation.
// Phone number is +31 6 5724 8971.
export const WHATSAPP_URL = "https://wa.me/31657248971";
export const CALENDAR_URL = "https://calendar.app.google/jcChbEUgp776dBD4A";

export const SOCIALS: Social[] = [
  {
    href: "https://www.linkedin.com/in/parichehr-talebzadeh/",
    src: "/assets/icon-social-linkedin.svg",
    alt: "LinkedIn",
    iconWidth: 35.7333,
    iconHeight: 34.0667,
  },
  {
    href: "https://dribbble.com/PariUXD",
    src: "/assets/icon-social-dribbble.svg",
    alt: "Dribbble",
    iconWidth: 35.7333,
    iconHeight: 35.7333,
  },
  {
    href: "https://www.behance.net/pariuxd",
    src: "/assets/icon-social-behance.svg",
    alt: "Behance",
    iconWidth: 40,
    iconHeight: 40,
  },
  {
    href: "https://medium.com/@pariuxd",
    src: "/assets/icon-social-medium.svg",
    alt: "Medium",
    iconWidth: 33.3333,
    iconHeight: 29.69,
    // The Medium glyph sits at y=0–20 inside its 29.69-tall viewBox
    // (the rest is bottom padding inside the SVG), so a pure flex
    // centre leaves it ~4.8 px above the pill's optical centre.
    // 16.3 % of 29.69 ≈ 4.84 px, which lands the glyph dead-centre.
    verticalNudge: "16.3%",
  },
];
