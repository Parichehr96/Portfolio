import Nav from "../_components/Nav";
import Footer from "../_components/Footer";

/* === FIGMA DESIGN TOKENS (MacBook Pro 14" - 4, node 105:196) ===
   Card:    bg #FEFBF5, rounded-40, px-32 py-24, h-232
   Section: title 32/40 tracking-[12px] navy, gap-24 to list, gap-32 between cards
   Sections gap: 48
   Status:  Successful  bg #EBFFEE  text #02542D
            Failed      bg #FEE9E7  text #900B09
            Concept     bg #EDEAE4  text #5A5D70  (Cream Dark / Gray Navy)
   Type:    Title/large   22/28  (project name)
            Title/medium  16/24 tracking-[0.15px]  (status, "My role")
            Title/small   14/20 tracking-[0.1px]   (description)
============================================================= */

const ASSETS = {
  linkExternal: "/assets/icon-link-external.svg",
};

const SECTION_TITLE_CLASS =
  "text-[32px] leading-[40px] text-[#1F2753] tracking-[12px] whitespace-nowrap";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

type Status = "Successful" | "Failed" | "Concept";

type Project = {
  name: string;
  status: Status;
  role?: string;
  description?: string;
};

const STATUS_STYLES: Record<Status, { bg: string; text: string }> = {
  Successful: { bg: "#EBFFEE", text: "#02542D" },
  Failed: { bg: "#FEE9E7", text: "#900B09" },
  Concept: { bg: "#EDEAE4", text: "#5A5D70" },
};

const APPLICATIONS: Project[] = [
  { name: "ONTON", status: "Failed" },
  { name: "Living Maples", status: "Successful" },
  { name: "Challenquiz", status: "Failed" },
];

const WEBSITES: Project[] = [
  { name: "Ezam", status: "Successful" },
  { name: "Nomadic", status: "Successful" },
];

const PLATFORMS: Project[] = [
  { name: "WOW Global Solution", status: "Failed" },
  { name: "Golestan", status: "Concept" },
];

function StatusBadge({ status }: { status: Status }) {
  const { bg, text } = STATUS_STYLES[status];
  return (
    <div
      className="px-[12px] py-[4px] rounded-[122px] flex items-center justify-center shrink-0"
      style={{ backgroundColor: bg }}
    >
      <p
        className="text-[16px] leading-[24px] tracking-[0.15px] whitespace-nowrap"
        style={{ color: text }}
      >
        {status}
      </p>
    </div>
  );
}

function ProjectCard({
  name,
  status,
  role = "My role",
  description = LOREM,
}: Project) {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] px-[32px] py-[24px] h-[232px] flex-1 min-w-0 flex items-end gap-[24px]">
      <div className="flex-1 min-w-0 h-full flex flex-col items-start justify-center gap-[16px]">
        <div className="w-full flex flex-col items-start gap-[12px]">
          <StatusBadge status={status} />
          <div className="w-full flex items-start gap-[8px]">
            <div className="flex-1 min-w-0 flex flex-col items-start justify-center gap-[4px]">
              <div className="w-full flex items-center gap-[8px] text-[22px] leading-[28px] whitespace-nowrap">
                <p className="text-[#D9D9D9] shrink-0">LG</p>
                <p className="text-[#1B2249] shrink-0">{name}</p>
              </div>
              <p className="w-full text-[16px] leading-[24px] tracking-[0.15px] text-[#1B2249]">
                {role}
              </p>
            </div>
            <div className="relative size-[24px] shrink-0">
              <img
                src={ASSETS.linkExternal}
                alt=""
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-[#EDEAE4]" />
        <p className="w-full h-[52px] text-[14px] leading-[20px] tracking-[0.1px] text-[#5A5D70] line-clamp-2 overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  return (
    <section className="w-full flex flex-col items-start gap-[24px]">
      <p className={SECTION_TITLE_CLASS}>{title}</p>
      <div className="w-full flex items-start gap-[32px]">
        {projects.map((p, i) => (
          <ProjectCard key={`${p.name}-${i}`} {...p} />
        ))}
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <div className="page-enter w-full min-h-screen flex flex-col items-start bg-[#F9F5EB]">
      <Nav />

      <main className="w-full flex flex-col items-start gap-[48px] p-[48px]">
        <Section title="Applications -" projects={APPLICATIONS} />
        <Section title="Websites -" projects={WEBSITES} />
        <Section title="Platforms -" projects={PLATFORMS} />
      </main>

      <Footer />
    </div>
  );
}
