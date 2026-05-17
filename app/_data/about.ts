export type AcademicItem = {
  name: string;
  short: string;
  date: string;
  /** External URL — when set, the row becomes a link (opens in a new
   *  tab) and an external-link arrow renders between the short and the
   *  dashed leader per Figma 302:2532 (node 319:2640 etc.). */
  url?: string;
};

export const ACADEMIC: AcademicItem[] = [
  {
    name: "Master Interaction Design",
    short: "HVA",
    date: "2025 - Present",
    url: "https://www.masterdigitaldesign.com/",
  },
  {
    name: "Bachelor Industrial Design",
    short: "AUI",
    date: "2017 - 2022",
    url: "https://www.aui.ac.ir",
  },
];

export const CERTIFICATES: AcademicItem[] = [
  {
    name: "Typography",
    short: "Uxcel",
    date: "2025",
    url: "https://app.uxcel.com/certificates/5AKU06K2NRCJ",
  },
  {
    name: "GenAI for UX Designers",
    short: "Coursera",
    date: "2025",
  },
  {
    name: "Google UX Design",
    short: "Coursera",
    date: "2024",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/SLTKQ66UJJFG?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof",
  },
  {
    name: "Agile Project",
    short: "Coursera",
    date: "2022",
    url: "https://www.coursera.org/account/accomplishments/certificate/LJGFKFZA52AL",
  },
];

/** Public-facing contributions — LinkedIn posts about plugins / portfolio
 *  work. Renders between Academic Background and Certificates per Figma
 *  544:11180 (added 2026-05). Same row template as ACADEMIC / CERTIFICATES
 *  so the dashed-leader + external-link arrow style matches. */
export const CONTRIBUTIONS: AcademicItem[] = [
  {
    name: "Human Decision Making",
    short: "Poytek",
    date: "2025",
    url: "https://www.linkedin.com/posts/parichehr-talebzadeh_humandecisionmaking-plugin-uxdesign-activity-7347249113219891201-wsOG",
  },
  {
    name: "Portfolio Design",
    short: "Poytek",
    date: "2024",
    url: "https://www.linkedin.com/posts/parichehr-talebzadeh_portfoliodesign-personalbranding-storytelling-activity-7274693957870120960-eBGn",
  },
];

export const METHODES = [
  "Product Design",
  "Design Thinking",
  "Interaction Design",
  "Information Architecture",
  "Interface Design",
  "User Research",
  "Usability testing",
  "Journey Mapping",
  "Prototyping",
  "Design Systems",
  "Agile / Scrum",
  "Using AI Properly",
];

export const SOFT_SKILLS = [
  "Cross-Functional Collaboration",
  "Stakeholder Management",
  "Design Leadership",
  "Time Management",
  "Crisis Management",
];

export const TOOLS = ["Figma", "Miro", "Analytical softwares"];

/** "My Interests" row (Figma 302:2532 → 429:3596). Each entry renders
 *  as a 32 × 32 icon with a Solway Regular 10/16 label beneath. Order
 *  matches the Figma source; the dropped chess icon is no longer on
 *  the canvas. */
export const INTERESTS: { icon: string; label: string }[] = [
  { icon: "/assets/icon-hobby-fire-exit.svg", label: "Exercise" },
  { icon: "/assets/icon-hobby-boat.svg", label: "Ocean" },
  { icon: "/assets/icon-hobby-luggage.svg", label: "Traveling" },
  { icon: "/assets/icon-hobby-vinyl.svg", label: "Music" },
  { icon: "/assets/icon-hobby-video-player.svg", label: "Movie" },
  { icon: "/assets/icon-hobby-puzzle.svg", label: "Puzzles" },
  { icon: "/assets/icon-hobby-cheers.svg", label: "Party" },
  { icon: "/assets/icon-hobby-camera.svg", label: "Photography" },
  { icon: "/assets/icon-hobby-microphone.svg", label: "Singing" },
];
