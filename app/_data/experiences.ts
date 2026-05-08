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

export const EXPERIENCES: Experience[] = [
  {
    name: "ViaVia",
    short: "Master’s Project",
    date: "Jan 2026 - May 2026",
    industry: "Mobility",
    description:
      "Project description coming soon — placeholder until copy is finalised.",
  },
  {
    name: "Mindful Meet",
    short: "Master’s Project",
    date: "Oct 2025 - Dec 2022",
    industry: "Sustainability",
    description:
      "A Google Calendar integration that makes the digital carbon cost and mental load of online meetings visible — without using guilt.",
  },
  {
    name: "ONTON",
    short: "PomeGroup",
    date: "May 2024 - June 2025",
    industry: "Web3",
    description:
      "A Telegram Mini App connecting crypto communities to on-chain event verification, letting organisers issue and participants collect proof-of-attendance badges in-chat.",
  },
  {
    name: "Challenquiz",
    short: "PomeGroup",
    date: "Nov 2023 - May 2024",
    industry: "Consumer",
    description:
      "A redesigned Telegram quiz app where users compete in real-time trivia challenges, earn tokens, and climb leaderboards.",
    caseStudy: "/work/challenquiz",
  },
  {
    name: "Ezam Part",
    short: "Ezam",
    date: "Nov 2022 - June 2023",
    industry: "B2B E-commerce",
    description:
      "A unified digital ecosystem (consumer site, agent dashboard, repairman app) for one of Iran’s largest auto parts manufacturers.",
  },
  {
    name: "WOW Global Solution",
    short: "RDSysCo",
    date: "May 2021 - Sep 2022",
    industry: "Enterprise SaaS",
    description:
      "A comprehensive ERP platform centralising HR, scheduling, documents, profiles, and inter-company connections for North American oil and gas companies.",
    caseStudy: "/work/wow-global-solutions",
  },
  {
    name: "Golestan",
    short: "Bachelor’s Thesis",
    date: "Jan 2021 - June 2022",
    industry: "Education",
    description:
      "Project description coming soon — placeholder until copy is finalised.",
  },
  {
    name: "Filala",
    short: "Poytek",
    date: "Apr 2021 - Nov 2021",
    industry: "Consumer",
    description:
      "Project description coming soon — placeholder until copy is finalised.",
  },
  {
    name: "Living Maples",
    short: "Golearn",
    date: "Oct 2020 - Apr 2021",
    industry: "EdTech",
    description:
      "Project description coming soon — placeholder until copy is finalised.",
  },
];

export const FALLBACK_PREVIEW = "/assets/profile-image.png";
