import Nav from "../_components/Nav";
import Footer from "../_components/Footer";

/* === FIGMA DESIGN TOKENS (MacBook Pro 14" - 3, node 100:352) ===
   Page bg: Cream #F9F5EB
   Card bg: Cream Light #FEFBF5
   Text:    Navy #1F2753 (headings)
            Navy Dark #1B2249 (list items)
            Gray Navy #5A5D70 (body copy + meta)
   Type:    Headline/large 32/40 tracking-[12px]  (section titles)
            Title/medium   16/24 tracking-[0.15px] (item rows)
            Body/large     16/24 tracking-[0.5px] weight-500 (description body)
   Layout:  1416 content (px-48), gap-48 between sections, card p-40 rounded-40
============================================================= */

const ASSETS = {
  placeholder: "/assets/frame8.png",
  linkExternal: "/assets/icon-link-external.svg",
};

const SECTION_TITLE_CLASS =
  "text-[32px] leading-[40px] text-[#1F2753] tracking-[12px] whitespace-nowrap";

type ListItem = {
  name: string;
  meta?: string;
  date: string;
};

const EXPERIENCE: ListItem[] = [
  { name: "Nomadic", date: "2026" },
  { name: "ONTON", date: "May 2024 - June 2025" },
  { name: "Challenquiz", date: "Nov 2023 - May 2024" },
  { name: "Ezam", date: "Nov 2022 - June 2023" },
  { name: "WOW Global Solution", date: "May 2021 - Sep 2022" },
  { name: "Poytek", date: "Apr 2021 - Nov 2021" },
  { name: "Living Maples", date: "Oct 2020 - Apr 2021" },
];

const EDUCATION: ListItem[] = [
  { name: "Master Interaction Design", meta: "HVA", date: "2025 - Present" },
  { name: "Bachelor Industrial Design", meta: "AUI", date: "2017 - 2022" },
];

function LinkExternalIcon() {
  return (
    <div className="relative size-[24px] shrink-0">
      <img
        src={ASSETS.linkExternal}
        alt=""
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function Row({ item }: { item: ListItem }) {
  return (
    <div className="flex gap-[8px] items-center w-full">
      <div className="flex-1 min-w-0 flex gap-[8px] items-center">
        <p className="text-[16px] leading-[24px] tracking-[0.15px] text-[#1B2249] whitespace-nowrap">
          {item.name}
        </p>
        {item.meta && (
          <p className="text-[16px] leading-[24px] tracking-[0.15px] text-[#5A5D70] whitespace-nowrap">
            {item.meta}
          </p>
        )}
        <LinkExternalIcon />
      </div>
      <p className="text-[16px] leading-[24px] tracking-[0.15px] text-[#1B2249] whitespace-nowrap">
        {item.date}
      </p>
    </div>
  );
}

function ListCard({ items }: { items: ListItem[] }) {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] w-full flex flex-col items-start justify-end">
      <div className="w-full flex flex-col items-start gap-[20px]">
        {items.map((item) => (
          <Row key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function IntroImageCard() {
  // Image rounds bl/tl only (top-right and bottom-right stay square per Figma).
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] flex items-end gap-[24px] w-full h-full">
      <div className="flex-1 min-w-0 h-full rounded-bl-[32px] rounded-tl-[32px] overflow-hidden relative">
        <img
          src={ASSETS.placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function IntroText() {
  return (
    <div className="flex-1 min-w-0 h-full flex flex-col items-start justify-center gap-[24px]">
      <p className={SECTION_TITLE_CLASS}>I&rsquo;m Pari,</p>
      <div className="w-full flex flex-col gap-[24px] font-medium text-[16px] leading-[24px] tracking-[0.5px] text-[#5A5D70]">
        <p>
          a product designer with +5 years of experience designing digital
          products across consumer apps, enterprise platforms, and Web3
          ecosystems. I&rsquo;m currently based in Amsterdam, completing my
          Master&rsquo;s in Interaction Design at HvA.
        </p>
        <p>
          Most of my work has happened in environments where I was the only
          designer in the room — sometimes by choice, often by circumstance.
          I&rsquo;ve designed solo for a 13-month Web3 product that grew from 87
          to 1,500 daily active users, led the redesign of a gamified quiz app,
          shaped the digital ecosystem of one of Iran&rsquo;s largest auto parts
          manufacturers, and contributed to enterprise ERP work for the oil and
          gas industry. Each project taught me something different, but they
          share a common thread: figuring out how to make complex systems feel
          simple, and how to keep users at the centre when the structure around
          me doesn&rsquo;t always make that easy.
        </p>
        <p>
          I care about evidence. I care about honesty in the process — including
          naming what didn&rsquo;t work and why. And I care about building
          things that actually reach people, because the deepest lesson
          I&rsquo;ve taken from my career so far is that design only matters
          when it gets used.
        </p>
        <p>
          Outside of client work, I think a lot about ethical design —
          particularly how products shape behaviour without users noticing. My
          recent academic work on Mindful Meet, an eco-conscious meeting tool,
          came directly from that interest.
        </p>
        <p>
          If you&rsquo;re working on something complex, multi-audience, or
          strategically ambitious — or if you need a designer who can hold the
          whole system in their head while still caring about the details —
          I&rsquo;d love to talk.
        </p>
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="flex-1 min-w-0 flex flex-col items-start gap-[16px]">
      <p className={SECTION_TITLE_CLASS}>Work experiences -</p>
      <ListCard items={EXPERIENCE} />
    </div>
  );
}

function EducationAndSkills() {
  return (
    <div className="flex-1 min-w-0 flex flex-col items-start justify-center gap-[48px]">
      <div className="w-full flex flex-col items-start gap-[24px]">
        <p className={SECTION_TITLE_CLASS}>Education -</p>
        <ListCard items={EDUCATION} />
      </div>
      <div className="w-full flex flex-col items-start gap-[24px]">
        <p className={SECTION_TITLE_CLASS}>Skills -</p>
        <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] w-full flex flex-col items-start justify-end">
          <div className="h-[40px] w-full" />
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="page-enter w-full min-h-screen flex flex-col items-start bg-[#F9F5EB]">
      <Nav />

      <main className="w-full flex flex-col items-start gap-[48px] p-[48px]">
        <section className="w-full flex items-stretch gap-[48px] h-[712px]">
          <div className="flex-1 min-w-0">
            <IntroImageCard />
          </div>
          <IntroText />
        </section>

        <section className="w-full flex items-start gap-[48px]">
          <ExperienceSection />
          <EducationAndSkills />
        </section>
      </main>

      <Footer />
    </div>
  );
}
