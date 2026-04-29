import { Fragment } from "react";
import Nav from "./_components/Nav";

/* === FIGMA DESIGN TOKENS (MacBook Pro 14" - 1, node 78:22) ===
   Font:    Space Grotesk — weight 400 throughout
   Colors:  Navy        #1F2753
            Navy Dark   #1B2249
            Navy Darker #111323
            Gray Navy   #5A5D70
            Cream       #F9F5EB   (page bg)
            Cream Light #FEFBF5   (card bg)
            Cream Dark  #EDEAE4   (social icon btn border)
   Type:    Headline/large  32/40   (stat value)
            Title/large     22/28   (logo, card titles, "Profiles")
            Body/large      16/24   (body, nav items, Stay with me, company)
            Body/medium     14/20   (company strip label)
            Display/small   36/40   (hero title)
   Layout:  1512 frame, card p-40, radius 40 / 60 / 32 / 24
============================================================= */

const ASSETS = {
  placeholder: "/assets/frame8.png",
  arrow: "/assets/icon-arrow.svg",
  star: "/assets/icon-star.svg",
  linkedin: "/assets/icon-linkedin.svg",
  instagram: "/assets/icon-instagram.svg",
  dribbble: "/assets/icon-dribbble.svg",
};

function ArrowButton() {
  return (
    <div className="flex items-center justify-center size-[48px] shrink-0">
      <div className="-rotate-90 flex items-center justify-center">
        <img
          src={ASSETS.arrow}
          alt=""
          width={42}
          height={40.691}
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] flex items-end gap-[24px] w-full h-full">
      <div className="flex-1 min-w-0 h-full rounded-bl-[32px] rounded-br-[32px] rounded-tl-[32px] overflow-hidden relative">
        <img
          src={ASSETS.placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 h-full flex flex-col items-center gap-[24px]">
        <p className="w-full text-[16px] leading-[24px] tracking-[0.5px] text-[#5A5D70]">
          Greetings! I&rsquo;m
        </p>
        <p className="w-full text-[36px] leading-[40px] text-[#1F2753]">
          Parichehr Talebzadeh
        </p>
        <p className="w-full text-[16px] leading-[24px] tracking-[0.5px] text-[#5A5D70]">
          I have years of experience designing digital products, which contains
          interaction, experience, interface, design system, and content, within
          a product team.
        </p>
        <div className="flex-1 flex items-end justify-end w-full min-h-0">
          <ArrowButton />
        </div>
      </div>
    </div>
  );
}

const COMPANY_ITEMS: Array<{ label: string; company: string }> = [
  { label: "Product Designer at", company: "RdSysCo" },
  { label: "Design Engineer at", company: "Ezam" },
  { label: "Design lead at", company: "ONTON" },
  { label: "Interaction Design MSc at", company: "HVA" },
  { label: "Product Designer at", company: "Challenquiz" },
];

function CompanyStripCopy({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {COMPANY_ITEMS.map((it, i) => (
        <Fragment key={`${keyPrefix}-${it.company}-${i}`}>
          <div className="flex items-center gap-[8px] shrink-0 whitespace-nowrap">
            <p className="text-[14px] leading-[20px] tracking-[0.25px] text-[#5A5D70]">
              {it.label}
            </p>
            <p className="text-[16px] leading-[24px] tracking-[0.5px] text-[#1F2753]">
              {it.company}
            </p>
          </div>
          <div className="relative size-[20px] shrink-0">
            <img
              src={ASSETS.star}
              alt=""
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </Fragment>
      ))}
    </>
  );
}

function CompanyStrip() {
  return (
    <div className="bg-[#FEFBF5] rounded-[60px] px-[40px] py-[32px] w-full h-[88px] shrink-0 flex items-center justify-center overflow-hidden">
      <div
        className="marquee-track flex items-center shrink-0"
        aria-label="Work history"
      >
        <CompanyStripCopy keyPrefix="a" />
        <CompanyStripCopy keyPrefix="b" />
      </div>
    </div>
  );
}

function FeatureCard({ title }: { title: string }) {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] flex-1 min-w-0 h-full flex flex-col items-start justify-end gap-[24px]">
      <div className="w-full flex-1 min-h-[120px] rounded-[32px] overflow-hidden relative">
        <img
          src={ASSETS.placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex items-end justify-end gap-[12px]">
        <div className="flex-1 min-w-0 flex flex-col items-start gap-[12px]">
          <p className="w-full text-[22px] leading-[28px] text-[#1F2753]">
            {title}
          </p>
        </div>
        <ArrowButton />
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] flex-1 min-w-0 h-[156px] p-[40px] flex flex-col items-start justify-end">
      <div className="w-full h-[88px] flex flex-col items-center justify-center gap-[8px] shrink-0 whitespace-nowrap">
        <p className="text-[32px] leading-[40px] text-[#1F2753]">{value}</p>
        <p className="text-[16px] leading-[24px] tracking-[0.5px] text-[#5A5D70]">
          {label}
        </p>
      </div>
    </div>
  );
}

function SocialIconButton({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="border border-solid border-[#EDEAE4] rounded-[24px] p-[24px] flex items-center shrink-0">
      <div className="relative size-[28px] shrink-0">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

function ProfilesCard() {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] flex-1 min-w-0 h-[156px] flex items-center gap-[24px]">
      <div className="flex-1 min-w-0 flex flex-col items-start gap-[12px]">
        <p className="w-full text-[16px] leading-[24px] tracking-[0.5px] text-[#5A5D70]">
          Stay with me
        </p>
        <p className="w-full text-[22px] leading-[28px] text-[#1F2753]">
          Profiles
        </p>
      </div>
      <div className="flex items-start gap-[24px] shrink-0">
        <SocialIconButton src={ASSETS.linkedin} alt="LinkedIn" />
        <SocialIconButton src={ASSETS.instagram} alt="Instagram" />
        <SocialIconButton src={ASSETS.dribbble} alt="Dribbble" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="page-enter w-full min-h-screen flex flex-col items-start gap-[24px] bg-[#F9F5EB]">
      <Nav />

      <main
        className="w-full flex flex-col items-start gap-[24px] px-[48px]"
        style={{ paddingTop: "var(--main-pt)", paddingBottom: "var(--main-pb)" }}
      >
        <div
          className="w-full flex items-start gap-[24px]"
          style={{ height: "clamp(420px, calc(100vh - var(--top-row-offset)), 523px)" }}
        >
          <div className="flex-1 min-w-0 h-full">
            <HeroCard />
          </div>
          <div className="flex-1 min-w-0 h-full flex flex-col items-start gap-[24px]">
            <CompanyStrip />
            <div className="w-full flex items-start gap-[24px] flex-1 min-h-0">
              <FeatureCard title="Know ME More" />
              <FeatureCard title="Projects" />
            </div>
          </div>
        </div>

        <div className="w-full flex items-start gap-[24px]">
          <div className="flex-1 min-w-0 flex items-center gap-[24px]">
            <StatCard value="+5" label="years of experience" />
            <StatCard value="+12" label="Clients worldwide" />
          </div>
          <ProfilesCard />
        </div>
      </main>
    </div>
  );
}
