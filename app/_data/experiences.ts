export type Experience = {
  name: string;
  /** Company / context tag shown next to the name (Solway Light grey). */
  short: string;
  date: string;
  /** Industry tag rendered under the preview frame (e.g. "Web3"). Used
   *  for the description block beneath the project image. */
  industry?: string;
  /** One-sentence project description shown under the preview frame
   *  when the row is selected. */
  description?: string;
  /** Optional per-project preview image. Falls back to profile-image
   *  while the user hasn't supplied real previews yet. */
  preview?: string;
  /** When set, the experience name links to a case-study route. The
   *  whole row stays a hover target for the highlight; only the name
   *  cluster is clickable so the surrounding date/dashed leader don't
   *  steal the click. */
  caseStudy?: string;
};

/* Order matches the desktop /work page sections (Figma 300:2201):
   indices 0–3 are "Featured Case Studies", 4–5 are "Supporting Case
   Studies", 6–8 are "Early Works". Mobile renders the array flat and
   ignores the section grouping. */
export const EXPERIENCES: Experience[] = [
  {
    name: "Mindful Meet",
    short: "Master’s Project",
    date: "Oct 2025 - Dec 2025",
    industry: "SaaS · Productivity Tool",
    description:
      "A Calendar integration that makes the digital carbon cost and mental load of online meetings visible — uplifting mental health and productivity.",
    caseStudy: "/work/mindful-meet",
  },
  {
    name: "ONTON",
    short: "PomeGroup",
    date: "May 2024 - June 2025",
    industry: "Mobile App · Consumer · Web3",
    description:
      "A Telegram Mini App connecting crypto communities to on-chain event verification, letting organisers issue and participants collect proof-of-attendance badges in-chat.",
    caseStudy: "/work/onton",
  },
  {
    name: "Ezam Part",
    short: "Ezam",
    date: "Nov 2022 - June 2023",
    industry: "E-commerce · B2B",
    description:
      "A unified digital ecosystem (consumer site, agent dashboard, repairman app) for one of Iran’s largest auto parts manufacturers.",
    caseStudy: "/work/ezam-part",
  },
  {
    name: "WOW Global Solution",
    short: "RDSysCo",
    date: "May 2021 - Sep 2022",
    industry: "ERP · Enterprise SaaS · B2B",
    description:
      "A comprehensive ERP platform centralising HR, scheduling, documents, profiles, and inter-company connections for North American oil and gas companies.",
    caseStudy: "/work/wow-global-solutions",
  },
  {
    name: "ViaVia",
    short: "Master’s Project",
    date: "Jan 2026 - May 2026",
    industry: "Mobile App · Mobility · Community Service",
    description:
      "A community-based ridesharing app for rural Zeeland, connecting senior passengers with volunteer drivers through a local credit economy redeemable in village businesses.",
  },
  {
    name: "Challenquiz",
    short: "PomeGroup",
    date: "Nov 2023 - May 2024",
    industry: "Mobile App · Consumer · Gaming",
    description:
      "A redesigned Telegram quiz app where users compete in real-time trivia challenges, earn tokens, and climb leaderboards.",
    caseStudy: "/work/challenquiz",
  },
  {
    name: "Golestan",
    short: "Bachelor’s Thesis",
    date: "Jan 2021 - June 2022",
    industry: "ERP · EdTech · Web App",
    description:
      "A redesign of Iran’s national university ERP used by students nationwide — simplifying enrolment, grades, and academic workflows.",
  },
  {
    name: "Filala",
    short: "Poytek",
    date: "Apr 2021 - Nov 2021",
    industry: "Mobile App · EdTech",
    description:
      "A read-aloud children’s book app for under-5s, paired with a physical device that displays story illustrations as animated slideshows.",
  },
  {
    name: "Living Maples",
    short: "Golearn",
    date: "Oct 2020 - Apr 2021",
    industry: "Mobile App · Healthcare",
    description:
      "A pill reminder app for Canadians 60+, designed with elderly-first principles and engaging visuals that motivate without blame.",
  },
];

/** Section groupings for the desktop /work page (Figma 429:3498/3499/3546).
 *  Mobile ignores these and lists experiences linearly. */
export const EXPERIENCE_SECTIONS = [
  { label: "Featured Case Studies -", start: 0, end: 4 },
  { label: "Supporting Case Studies -", start: 4, end: 6 },
  { label: "Early Works -", start: 6, end: 9 },
] as const;

export const FALLBACK_PREVIEW = "/assets/profile-image.png";
