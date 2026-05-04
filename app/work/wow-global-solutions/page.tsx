"use client";

import CaseStudyHeader, {
  MC2_HEIGHT,
} from "../../_components/CaseStudyHeader";

/* WOW Global Solution case study (Figma 313:2747).
   The header is the shared CaseStudyHeader (MainCard) component — see
   app/_components/CaseStudyHeader.tsx for the morph behaviour. Body
   sections below are specific to WOW. */

const SOLWAY = "var(--font-solway), serif";
const NAVY = "#1F2753";
const NAVY_DARK = "#1B2249";
const CREAM = "#F9F5EB";
const CREAM_LIGHTER = "#FEFBF5";
const GRAY_NAVY = "#5A5D70";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/wow-global-solutions-inc-/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BKhCx65vZSOGssCvUkhDxfQ%3D%3D";
const HR_CASE_STUDY_URL =
  "https://www.behance.net/gallery/197828723/WOW-HR-module-system";
const DS_CASE_STUDY_URL =
  "https://www.behance.net/gallery/195643297/Design-System-Case-Study-Connect2WOW";

function SectionTitle({
  text,
  size = "lg",
}: {
  text: string;
  size?: "xl" | "lg" | "md";
}) {
  const sizeMap = {
    xl: { fontSize: 32, lineHeight: "40px", fontWeight: 700 },
    lg: { fontSize: 28, lineHeight: "36px", fontWeight: 700 },
    md: { fontSize: 24, lineHeight: "32px", fontWeight: 700 },
  } as const;
  const s = sizeMap[size];
  return (
    <p
      className="w-full"
      style={{
        color: NAVY,
        fontFamily: SOLWAY,
        ...s,
      }}
    >
      {text}
    </p>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="w-full"
      style={{
        color: NAVY,
        fontFamily: SOLWAY,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        letterSpacing: "0.5px",
      }}
    >
      {children}
    </p>
  );
}

function BodyBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full flex flex-col"
      style={{
        gap: 16,
        color: NAVY,
        fontFamily: SOLWAY,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        letterSpacing: "0.5px",
      }}
    >
      {children}
    </div>
  );
}

function ImageFrame({
  src,
  alt,
  height,
  bg = CREAM_LIGHTER,
  rounded = 20,
  padding = 0,
  imgStyle,
}: {
  src: string;
  alt: string;
  height: number;
  bg?: string;
  rounded?: number;
  padding?: number;
  imgStyle?: React.CSSProperties;
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: bg,
        height,
        borderRadius: rounded,
        padding,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="block"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          ...imgStyle,
        }}
      />
    </div>
  );
}

/* ---------- Stakeholder cycle diagram (313:2794) ----------
   Rendered from a single Figma export rather than reassembled from
   per-vector SVG fragments — pixel-perfect and immune to Figma's
   asset-URL churn. */
function StakeholderDiagram() {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: 680, height: 530 }}
    >
      <img
        src="/assets/wow/stakeholder-cycle.png"
        alt="Stakeholder-led cycle vs user-centred cycle diagram"
        className="absolute inset-0 w-full h-full object-contain block pointer-events-none"
      />
    </div>
  );
}

/* ---------- Competitor analysis card ---------- */
function CompetitorCard({
  name,
  strength,
  strengthDetail,
  gap,
  whatWeTook,
  whatWeTookDetail,
}: {
  name: string;
  strength: string;
  strengthDetail: string;
  gap: string;
  whatWeTook: string;
  whatWeTookDetail: string;
}) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ width: 281.379, gap: 32 }}
    >
      {/* Name banner */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          backgroundColor: NAVY,
          height: 78,
          borderRadius: 12,
          padding: 8,
        }}
      >
        <p
          className="text-center"
          style={{
            color: CREAM_LIGHTER,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 28,
            lineHeight: "36px",
          }}
        >
          {name}
        </p>
      </div>
      <CardField label="STRENGTH" title={strength} subtitle={strengthDetail} />
      <CardDivider />
      <CardField label="GAP" subtitle={gap} />
      <CardDivider />
      <CardField label="WHAT WE TOOK" title={whatWeTook} subtitle={whatWeTookDetail} />
    </div>
  );
}

function CardField({
  label,
  title,
  subtitle,
}: {
  label: string;
  title?: string;
  subtitle: string;
}) {
  return (
    <div className="w-full flex flex-col items-start gap-[16px]">
      <p
        className="w-full"
        style={{
          color: GRAY_NAVY,
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: "0.25px",
        }}
      >
        {label}
      </p>
      <div className="w-full flex flex-col items-center gap-[8px] text-center">
        {title && (
          <p
            className="w-full"
            style={{
              color: NAVY,
              fontFamily: SOLWAY,
              fontWeight: 700,
              fontSize: 16,
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            {title}
          </p>
        )}
        <p
          className="w-full"
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "20px",
            letterSpacing: "0.1px",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function CardDivider() {
  return (
    <span
      aria-hidden
      className="w-full"
      style={{ height: 1, backgroundColor: "#E0DFDC" }}
    />
  );
}

function CompetitorBlock() {
  return (
    <div
      className="w-full overflow-hidden flex flex-col items-center relative"
      style={{
        backgroundColor: CREAM_LIGHTER,
        borderRadius: 8,
        padding: "44px 30px",
        gap: 32,
      }}
    >
      <div className="flex flex-col items-center text-center" style={{ gap: 8 }}>
        <p
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 24,
            lineHeight: "32px",
          }}
        >
          What we borrowed from each
        </p>
        <p
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          Competitor analysis → design decisions in WOW&rsquo;s HR module
        </p>
      </div>
      <div
        className="flex items-start justify-center w-full"
        style={{ gap: 90 }}
      >
        <CompetitorCard
          name="BambooHR"
          strength="Complete HRIS"
          strengthDetail="Native payroll and benefits in one place"
          gap="Weak on engagement and customisation"
          whatWeTook="Payroll and profile data patterns"
          whatWeTookDetail="Field structure for salary and working hours"
        />
        <CompetitorCard
          name="Personio"
          strength="Process automation"
          strengthDetail="Strong compliance and workflow logic"
          gap="Underserves culture and social side"
          whatWeTook="Multi-role approval and handoff"
          whatWeTookDetail="Shape of the Request for Resources flow"
        />
        <CompetitorCard
          name="Bob"
          strength="Employee experience"
          strengthDetail="Compensation and social as core"
          gap="Costly and lighter on compliance depth"
          whatWeTook="Feed as connective tissue"
          whatWeTookDetail="Keeping users in the loop across a complex platform"
        />
      </div>
    </div>
  );
}

/* ---------- Phase 1 image collages ---------- */
function PhaseImageBlock() {
  // 313:2841 — 908×800 cream-lighter container with two-column nested
  // navy panels (Style Guide tab + Guides image left, two Component
  // images stacked right).
  return (
    <div
      className="shrink-0 relative overflow-hidden"
      style={{
        width: 908,
        height: 800,
        backgroundColor: CREAM_LIGHTER,
        borderRadius: 8,
      }}
    >
      <div
        className="absolute flex items-end"
        style={{ left: 32, top: 29.5, gap: 8, height: 742, width: 844 }}
      >
        <div
          className="flex flex-col items-center h-full"
          style={{ gap: 16 }}
        >
          <div
            className="relative"
            style={{ height: 96, width: 345 }}
            aria-hidden
          >
            <div
              className="absolute"
              style={{
                left: 181,
                top: 0,
                width: 164,
                height: 96,
                backgroundColor: NAVY_DARK,
                borderRadius: 20,
              }}
            />
            <p
              className="absolute"
              style={{
                left: 97,
                top: 28,
                width: 204,
                fontFamily: SOLWAY,
                fontSize: 32,
                lineHeight: "40px",
              }}
            >
              <span style={{ color: NAVY_DARK }}>Style </span>
              <span style={{ color: "#FFFFFF" }}>Guid</span>
            </p>
          </div>
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              backgroundColor: NAVY,
              borderRadius: 20,
              width: 345,
            }}
          >
            <img
              src="/assets/wow/guides.png"
              alt=""
              className="block"
              style={{ width: 151, height: 538, objectFit: "contain" }}
            />
          </div>
        </div>
        <div
          className="flex flex-col items-center h-full"
          style={{ gap: 8 }}
        >
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              backgroundColor: NAVY,
              borderRadius: 20,
              width: 491,
            }}
          >
            <img
              src="/assets/wow/component-1.png"
              alt=""
              className="block"
              style={{ width: 340, height: 182, objectFit: "contain" }}
            />
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              backgroundColor: NAVY,
              borderRadius: 20,
              width: 491,
              height: 430,
            }}
          >
            <img
              src="/assets/wow/component-2.png"
              alt=""
              className="block"
              style={{ width: 461, height: 350, objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemBlock() {
  // 313:2855 — 800h cream container with a 3-column collage of system
  // images, two of them on dark navy backgrounds.
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: CREAM, height: 800, borderRadius: 20 }}
    >
      <div
        className="absolute flex items-center"
        style={{ left: 76, top: 29.5, gap: 2, height: 742 }}
      >
        <div
          className="overflow-hidden"
          style={{ borderRadius: 8, width: 473, height: "100%" }}
        >
          <img
            src="/assets/wow/system.png"
            alt=""
            className="block w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className="flex flex-col items-start h-full"
          style={{ gap: 2, width: 342.5 }}
        >
          <div
            className="flex-1 flex items-start w-full overflow-hidden"
            style={{ backgroundColor: NAVY_DARK, borderRadius: 8 }}
          >
            <img
              src="/assets/wow/system-details-1.png"
              alt=""
              className="block w-full"
              style={{ height: 380, objectFit: "contain" }}
            />
          </div>
          <div
            className="flex-1 w-full overflow-hidden"
            style={{ borderRadius: 8 }}
          >
            <img
              src="/assets/wow/system-details-2.png"
              alt=""
              className="block w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex flex-col items-start h-full" style={{ gap: 2 }}>
          <div
            className="flex-1 flex items-start overflow-hidden"
            style={{ backgroundColor: NAVY_DARK, borderRadius: 8, width: 300 }}
          >
            <img
              src="/assets/wow/system-guide-1.png"
              alt=""
              className="block w-full"
              style={{ height: 375, objectFit: "contain" }}
            />
          </div>
          <div
            className="flex-1 overflow-hidden"
            style={{ borderRadius: 8, width: 300 }}
          >
            <img
              src="/assets/wow/system-guide-2.png"
              alt=""
              className="block w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemSummaryBlock() {
  // 313:2880-ish — 908×694 collage of Summary / Image Content / Image
  // Details / Guide images on a cream-tinted backdrop.
  const cardCommon: React.CSSProperties = {
    backgroundColor: CREAM,
    border: `0.9px solid ${CREAM}`,
    borderRadius: 20,
    overflow: "hidden",
  };
  return (
    <div
      className="shrink-0 relative overflow-hidden"
      style={{ width: 908, height: 694, borderRadius: 8 }}
    >
      <div
        className="absolute flex items-center"
        style={{
          left: "50%",
          top: "calc(50% + 0.5px)",
          transform: "translate(-50%, -50%)",
          gap: 7.2,
          height: 668,
          width: 886,
        }}
      >
        <div
          className="flex flex-col items-start h-full"
          style={{ gap: 9, width: 337 }}
        >
          <div
            className="flex-1 w-full flex items-center justify-center"
            style={cardCommon}
          >
            <img
              src="/assets/wow/guide-1.png"
              alt=""
              style={{ width: 260.01, height: 263.25, objectFit: "contain" }}
            />
          </div>
          <div
            className="flex-1 w-full flex items-center justify-center"
            style={cardCommon}
          >
            <img
              src="/assets/wow/guide-2.png"
              alt=""
              style={{ width: 260.82, height: 271.35, objectFit: "contain" }}
            />
          </div>
        </div>
        <div
          className="flex-1 flex flex-col items-center h-full"
          style={{ gap: 7.2 }}
        >
          <div
            className="flex-1 w-full flex items-center justify-center"
            style={cardCommon}
          >
            <img
              src="/assets/wow/summary.png"
              alt=""
              style={{ width: 378.27, height: 272.97, objectFit: "contain" }}
            />
          </div>
          <div
            className="w-full flex items-start"
            style={{ gap: 7.2, height: 333 }}
          >
            <div
              className="flex-1 h-full flex items-center justify-center"
              style={cardCommon}
            >
              <img
                src="/assets/wow/image-content.png"
                alt=""
                style={{
                  width: 215.46,
                  height: 253.53,
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              className="flex-1 h-full flex items-center justify-center"
              style={cardCommon}
            >
              <img
                src="/assets/wow/image-details.png"
                alt=""
                style={{
                  width: 189.54,
                  height: 265.68,
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestImagesBlock() {
  // 333:3440 — 800h cream-lighter container with three request flow
  // images positioned in a top-row + bottom-center layout.
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: CREAM_LIGHTER, height: 800, borderRadius: 20 }}
    >
      <img
        src="/assets/wow/request-1.png"
        alt=""
        className="absolute"
        style={{
          left: -14,
          top: 0.5,
          width: 644,
          height: 432,
          objectFit: "cover",
        }}
      />
      <img
        src="/assets/wow/request-2.png"
        alt=""
        className="absolute"
        style={{
          left: 652,
          top: 0.5,
          width: 610,
          height: 432,
          objectFit: "cover",
        }}
      />
      <img
        src="/assets/wow/request-3.png"
        alt=""
        className="absolute"
        style={{
          left: 151,
          top: 449.5,
          width: 970,
          height: 456,
          objectFit: "cover",
        }}
      />
    </div>
  );
}

/* ---------- Page ---------- */

export default function WowCaseStudy() {
  return (
    <div className="bg-white relative w-full">
      <CaseStudyHeader
        title="WOW Global Solution"
        subtitle="Enterprise Resource Planning for Oil & Gas Projects"
        detailItems={[
          { label: "Role", value: "Product / UX Designer" },
          { label: "Timeline", value: "17 months · May 2021 – September 2022" },
          { label: "Team", value: "3 designers, 1 lead, 11 developers, PM" },
          {
            label: "Client",
            value: "EPFC Corp. (Canadian oil & gas company)",
          },
          { label: "Tools", value: "Figma, Miro, FigJam" },
          { label: "Status", value: "Shut down before reaching end users" },
        ]}
        heroImageSrc="/assets/wow/main.png"
        heroImageAlt="WOW Global Solution platform overview"
        ctas={[
          {
            href: "/contact",
            iconSrc: "/assets/wow/icon-cta-chat.svg",
            label: "Get in touch",
            variant: "primary",
            internal: true,
            uppercase: true,
          },
          {
            href: HR_CASE_STUDY_URL,
            iconSrc: "/assets/wow/icon-cta-briefcase.svg",
            label: "Case study (HR Module)",
            variant: "secondary",
          },
          {
            href: DS_CASE_STUDY_URL,
            iconSrc: "/assets/wow/icon-cta-browser.svg",
            label: "Case study (Design System)",
            variant: "secondary",
          },
          {
            href: LINKEDIN_URL,
            iconSrc: "/assets/wow/icon-cta-linkedin.svg",
            label: "Company's Linkedin",
            variant: "secondary",
          },
        ]}
      />

      {/* Body — offset by 100vh + MC2_HEIGHT so the card has room to be
          MC1-sized at the top, then transition to MC2 as content rises. */}
      <div
        className="w-full flex flex-col items-start"
        style={{
          marginTop: `calc(100vh + ${MC2_HEIGHT}px)`,
          paddingLeft: 120,
          paddingRight: 120,
          paddingTop: 80,
          paddingBottom: 80,
          gap: 64,
        }}
      >
        {/* Introduction */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="The Problem: An Industry Running on Fragmentation"
              size="xl"
            />
            <BodyText>
              Oil and gas companies in North America manage projects across
              upstream, midstream, and downstream operations — often using
              disconnected manual systems, separate modules per department,
              and no shared digital infrastructure. The result is
              administrative inefficiency at every layer: HR, scheduling,
              safety, communication, and project handovers.
            </BodyText>
            <BodyText>
              EPFC Corp. had a functioning legacy system but wanted to
              consolidate everything into a single scalable platform. Our
              team was brought on to redesign and expand it — building a
              unified ERP dashboard that could handle the full operational
              lifecycle.
            </BodyText>
            <BodyText>
              The scope was enormous: HR management, calendar and meetings,
              document editing, company and personal profiles, education
              and certifications, inter-company connections, notifications,
              messaging, privacy controls, and an administration panel to
              govern it all.
            </BodyText>
          </BodyBlock>
          <ImageFrame
            src="/assets/wow/introduction.png"
            alt="WOW dashboard overview"
            height={800}
            imgStyle={{ objectFit: "cover" }}
          />
        </section>

        {/* Role */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <div
            className="w-full flex items-start"
            style={{ gap: 40 }}
          >
            <div
              className="shrink-0 overflow-hidden relative"
              style={{
                backgroundColor: CREAM_LIGHTER,
                width: 780,
                height: 672,
                borderRadius: 20,
              }}
            >
              <img
                src="/assets/wow/role.png"
                alt="Role"
                className="absolute"
                style={{
                  left: 49,
                  top: 37.5,
                  width: 758,
                  height: 735,
                  objectFit: "cover",
                }}
              />
            </div>
            <BodyBlock>
              <SectionTitle text="My Role" size="lg" />
              <BodyText>
                I was one of three designers. Our lead supervised the first
                six months — the design system phase — then left and was
                never replaced. From that point, the remaining two of us
                carried the full design workload across all modules.
              </BodyText>
              <BodyText>
                My responsibilities included: contributing to the design
                system (guidelines, styles, components with use cases and
                edge cases, patterns), designing complete interaction flows
                across multiple modules, presenting to and iterating with
                the stakeholder, and conducting competitive analysis to
                inform feature design.
              </BodyText>
            </BodyBlock>
          </div>
          <BodyText>
            I worked most extensively on the HR module, the connection
            module, the profile section and notification details, and the
            calendar and meeting module — though the team collectively
            touched every part of the platform.
          </BodyText>
        </section>

        {/* Constraint */}
        <section
          className="w-full flex items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="The Core Constraint: Designing Without Users"
              size="lg"
            />
            <BodyText>
              This needs to be stated upfront because it shaped everything.
            </BodyText>
            <BodyText>
              We had no access to end users. Not during research, not
              during design, not during validation. The project ran agile
              in planning and delivery, but there was zero customer
              involvement at any stage. Every design decision was validated
              by a single stakeholder — the CEO of EPFC — who brought his
              own domain expertise or consulted experts within his company
              and relayed their input back to us.
            </BodyText>
          </BodyBlock>
          <div
            className="shrink-0 overflow-hidden flex flex-col items-start"
            style={{
              backgroundColor: CREAM_LIGHTER,
              padding: 40,
              borderRadius: 20,
            }}
          >
            <StakeholderDiagram />
          </div>
        </section>

        <BodyBlock>
          <BodyText>
            Our daily cycle looked like this: we&rsquo;d present refined
            flows and high-fidelity interface designs in morning meetings.
            The stakeholder would confirm, adjust, or redirect based on his
            experience. We&rsquo;d iterate and return the next day.
          </BodyText>
          <BodyText>
            We tried to compensate. We tested flows with colleagues
            internally, but they were tech professionals — not oil field
            workers, HR managers, or industrial technicians. We referenced
            best practices and existing patterns from the design system.
            But we could never truly validate. The whole design team felt
            this tension throughout the project, and it&rsquo;s ultimately
            why we left.
          </BodyText>
        </BodyBlock>

        {/* Phase 1 */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 12 }}
        >
          <SectionTitle
            text="Phase 1: The Design System (Months 1–6)"
            size="md"
          />
          <div className="w-full flex items-center" style={{ gap: 40 }}>
            <BodyText>
              Before touching any product flows, we spent six months
              building the design system. For a platform this complex —
              dozens of modules, multiple user roles, dense data —
              consistency wasn&rsquo;t optional. Without it, the product
              would have felt like ten different apps stitched together.
            </BodyText>
            <PhaseImageBlock />
          </div>
          <SystemBlock />
          <BodyText>
            We studied established systems like Material, Carbon, and
            Polaris, then built our own adapted to the platform&rsquo;s
            needs. It included component libraries with documented use
            cases and edge cases, accessibility guidelines (contrast
            checking became easier with Figma&rsquo;s built-in tools), and
            pattern definitions that evolved as we encountered new
            requirements during the design phase.
          </BodyText>
          <div className="w-full flex items-center" style={{ gap: 40 }}>
            <SystemSummaryBlock />
            <BodyText>
              The system wasn&rsquo;t static. Some patterns needed
              adjustment as we moved into more complex modules, and we
              added variants where the original components couldn&rsquo;t
              accommodate new contexts. It was a living system — which is
              what made it useful across such a wide surface area.
            </BodyText>
          </div>
        </section>

        {/* Phase 2 + HR Module + Competitor */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="Phase 2: Module Design (Months 7–17)"
              size="md"
            />
            <BodyText>
              With the design system in place, we moved into designing
              flows across the platform&rsquo;s modules. I&rsquo;ll focus
              on the areas where I did the most significant work.
            </BodyText>
          </BodyBlock>
          <BodyBlock>
            <SectionTitle text="The HR Module" size="xl" />
            <BodyText>
              HR was the largest and most demanding module. It touched
              every user in the system — from HR professionals and hiring
              managers to industrial workers and corporate staff — which
              made it the natural core of the data architecture.
            </BodyText>
            <BodyText>
              The module covered: organisational charts, onboarding and
              offboarding, job posting and seeking, the employment process,
              payments and salary, insurance, working hours, documents,
              and performance reviews.
            </BodyText>
            <BodyText>
              Some sections — profiles, payment, working hours, documents —
              had strong existing patterns from platforms like BambooHR,
              Personio, and Bob that we could reference and adapt. We
              analysed all three systematically:
            </BodyText>
            <ul
              className="w-full"
              style={{
                color: NAVY,
                fontFamily: SOLWAY,
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "24px",
                letterSpacing: "0.5px",
                listStyle: "disc",
                paddingLeft: 24,
              }}
            >
              <li>
                BambooHR offered the most complete feature set for North
                American SMBs, including native payroll, but lacked
                engagement features.
              </li>
              <li>
                Personio was strongest in process automation and compliance,
                but underserved the cultural side of employee experience.
              </li>
              <li>
                Bob treated compensation and workforce planning as core
                features and prioritised employee happiness and social
                connection.
              </li>
            </ul>
            <BodyText>
              But sections like the organisational chart, digital
              onboarding/offboarding, and performance review had few
              reliable precedents for this industry context. These required
              us to design from first principles — mapping stakeholder
              requirements against what we understood of the user roles,
              then iterating with the stakeholder until the logic held.
            </BodyText>
          </BodyBlock>
          <CompetitorBlock />
        </section>

        {/* Request for Resources */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="Request for Resources: A Workflow in Detail"
              size="lg"
            />
            <BodyText>
              I&rsquo;m highlighting this flow because it demonstrates the
              complexity of multi-stakeholder logic in the system — and
              because it went through more iterations than almost any
              other part of the product.
            </BodyText>
            <BodyText>
              The workflow manages job postings and talent acquisition. It
              involves at minimum four distinct user roles: the project
              manager requesting a resource, the HR specialist processing
              the request, the hiring manager evaluating candidates, and
              the hiring manager&rsquo;s superior confirming the need. Each
              handoff required clear authority definitions and confirmation
              hierarchies — and those hierarchies shifted multiple times
              during design, forcing us to restructure the flow repeatedly.
            </BodyText>
          </BodyBlock>
          <BodyBlock>
            <SectionTitle text="The flow works like this:" size="lg" />
            <BodyText>
              A project manager submits a resource request, which routes to
              HR for strategic approval. Once validated, the system
              publishes the vacancy to the community portal. HR and the
              hiring manager collaborate to review applicants based on
              their profiles. When a candidate is selected, the system
              triggers automated notifications for digital documentation.
              Finally, the HR manager facilitates onboarding — generating
              contracts and credentials to integrate the new hire.
            </BodyText>
            <BodyText>
              The challenge wasn&rsquo;t mapping these steps — it was
              designing each handoff so that authority was clear, no step
              was ambiguous, and the flow could accommodate the
              organisational hierarchies of different company structures.
            </BodyText>
          </BodyBlock>
          <RequestImagesBlock />
        </section>

        {/* Feed */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="The Feed: Keeping Users in the Loop" size="lg" />
            <BodyText>
              One feature I&rsquo;m particularly confident about was the
              feed section, which was added later in the process. In a
              platform this large — with dozens of modules and deep menu
              structures — users can easily lose context about what&rsquo;s
              happening around them. The feed served as a persistent
              surface that kept users aware of relevant activity across the
              platform without requiring them to navigate into each module
              individually.
            </BodyText>
          </BodyBlock>
          <ImageFrame
            src="/assets/wow/request-2.png"
            alt="Feed section"
            height={800}
            bg={CREAM_LIGHTER}
            imgStyle={{ objectFit: "contain" }}
          />
        </section>

        {/* Project status */}
        <section className="w-full flex flex-col items-start">
          <BodyBlock>
            <SectionTitle text="What Happened to the Project" size="lg" />
            <BodyText>
              The project was shut down after four years of development —
              before any end users ever used it. The platform had grown
              into something vast and complex, and I believe that scale
              itself became the obstacle. The investment was so deep that
              questioning the direction became increasingly difficult for
              the board.
            </BodyText>
            <BodyText>
              I left after 17 months, along with most of the design team.
              The core reason was the same tension we&rsquo;d felt from the
              start: we were designing an enormous system based entirely
              on stakeholder assumptions, with no ability to validate with
              real users. The work was technically strong, but we
              couldn&rsquo;t confirm whether it actually solved the
              problems it was meant to solve.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Reflection */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 20 }}
        >
          <SectionTitle text="Reflection" size="lg" />
          <ReflectionBlock title="I'd do completely differently">
            If I started this project today, I would build the simplest
            possible flows first, test the general concept with real or
            representative users, and only then expand into the full
            system. The depth of detail we reached was impressive as design
            craft — but without testing along the way, every layer added
            was another assumption stacked on top of unvalidated
            foundations.
          </ReflectionBlock>
          <ReflectionBlock title="I'm most confident about">
            The design system was the right investment. Without it, a
            platform of this scope would have collapsed into visual and
            interaction inconsistency within weeks. And the feed section —
            added later — solved a real navigation problem by giving users
            a persistent anchor point in a complex environment.
          </ReflectionBlock>
          <ReflectionBlock title="This project taught me">
            <span style={{ display: "block", marginBottom: 24 }}>
              I learned an enormous amount about enterprise UX: design
              systems at scale, complex multi-role workflows, modular
              architecture, industrial process design, accessibility, and
              how to maintain consistency across a product surface this
              large.
            </span>
            But the deepest lesson was simpler: it doesn&rsquo;t matter how
            it looks, what it does, or how it could change things — unless
            it&rsquo;s actually used. Everything we designed was based on
            knowledge and experience, but also on assumptions and biases
            that were never tested or confirmed. This project made me a
            fundamentally different designer. Every project I&rsquo;ve
            taken on since starts with the question: how do we get this in
            front of real people as early as possible?
          </ReflectionBlock>
        </section>
      </div>
    </div>
  );
}

function ReflectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-start" style={{ gap: 8 }}>
      <p
        className="w-full"
        style={{
          color: NAVY_DARK,
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 500,
          fontSize: 28,
          lineHeight: "38px",
        }}
      >
        {title}
      </p>
      <p
        className="w-full"
        style={{
          color: NAVY,
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "0.5px",
        }}
      >
        {children}
      </p>
    </div>
  );
}
