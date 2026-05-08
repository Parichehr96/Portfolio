export type Social = {
  /** Optional href — when omitted the button renders as a non-clickable
   *  visual placeholder (currently used for Instagram per request). */
  href?: string;
  src: string;
  alt: string;
  /** SVG's intrinsic viewBox dimensions, taken from the asset itself.
   *  Rendering at these natural sizes inside the 40 × 40 wrapper
   *  reproduces Figma's nested-inset framing without hand-tuned CSS. */
  iconWidth: number;
  iconHeight: number;
};

export const EMAIL = "parichehr.t96@gmail.com";
export const PHONE_DISPLAY = "+31-657248971";
// WhatsApp wants international digits with no `+` or punctuation; Telegram
// accepts the `+` form. Phone number is +31 6 5724 8971.
export const WHATSAPP_URL = "https://wa.me/31657248971";
export const TELEGRAM_URL = "https://t.me/+31657248971";
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
    src: "/assets/icon-social-instagram.svg",
    alt: "Instagram",
    iconWidth: 35.7333,
    iconHeight: 35.7333,
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
  },
];
