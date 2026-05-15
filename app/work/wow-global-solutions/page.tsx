import Image from "next/image";
import CaseStudyHeader from "../../_components/CaseStudyHeader";
import {
  BodyBlock,
  BodyText,
  ImageFrame,
  ReflectionBlock,
  SectionTitle,
} from "../../_components/case-study/CaseStudyBody";
import { color, font } from "../../_lib/tokens";
import CompetitorBlock from "./_components/CompetitorBlock";
import PhaseImageBlock from "./_components/PhaseImageBlock";
import RequestImagesBlock from "./_components/RequestImagesBlock";
import StakeholderDiagram from "./_components/StakeholderDiagram";
import SystemBlock from "./_components/SystemBlock";
import SystemSummaryBlock from "./_components/SystemSummaryBlock";
import { fs } from "../../_lib/typography";

/* WOW Global Solution case study (Figma 313:2747).
   Server Component — the only client island is the morphing
   <CaseStudyHeader /> below. Every body section is shipped as static
   HTML with no JS payload. */

const NAVY = color.navy;
const CREAM_LIGHTER = color.creamLight;
const SOLWAY = font.solway;

const LINKEDIN_URL =
  "https://www.linkedin.com/company/wow-global-solutions-inc-/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BKhCx65vZSOGssCvUkhDxfQ%3D%3D";
const HR_CASE_STUDY_URL =
  "https://www.behance.net/gallery/197828723/WOW-HR-module-system";
const DS_CASE_STUDY_URL =
  "https://www.behance.net/gallery/195643297/Design-System-Case-Study-Connect2WOW";

export default function WowCaseStudy() {
  return (
    <div className="bg-white relative w-full">
      <CaseStudyHeader
        title="WOW Global Solution"
        subtitle="Enterprise Resource Planning for Oil & Gas Projects"
        detailItems={[
          { label: "Role", value: "Product / UX Designer" },
          {
            label: "Timeline",
            value: "17 months · May 2021 – September 2022",
          },
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

      {/* Body — desktop: offset by 100vh + MC2_HEIGHT so the morphing
          card has room to be MC1-sized at the top, then transitions
          to MC2 as content rises. Mobile: header is in normal flow,
          so margin-top is 0 (handled by the CSS class). */}
      <div
        className="cs-body-offset cs-body-padding w-full flex flex-col items-start"
        style={{ gap: 64 }}
      >
        <Introduction />
        <RoleSection />
        <ConstraintSection />
        <DailyCycleNote />
        <Phase1DesignSystem />
        <Phase2HRModule />
        <RequestForResources />
        <FeedSection />
        <ProjectStatus />
        <ReflectionSection />
      </div>
    </div>
  );
}

/* ---------- Body sections (page-local; one section per function so the
   default export above reads as an outline of the case study) ---------- */

function Introduction() {
  return (
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
          disconnected manual systems, separate modules per department, and
          no shared digital infrastructure. The result is administrative
          inefficiency at every layer: HR, scheduling, safety,
          communication, and project handovers.
        </BodyText>
        <BodyText>
          EPFC Corp. had a functioning legacy system but wanted to
          consolidate everything into a single scalable platform. Our team
          was brought on to redesign and expand it — building a unified ERP
          dashboard that could handle the full operational lifecycle.
        </BodyText>
        <BodyText>
          The scope was enormous: HR management, calendar and meetings,
          document editing, company and personal profiles, education and
          certifications, inter-company connections, notifications,
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
  );
}

function RoleSection() {
  return (
    <section
      className="w-full flex flex-col items-start"
      style={{ gap: 40 }}
    >
      <div className="cs-section-row">
        <div
          className="shrink-0 overflow-hidden relative w-full md:w-[780px] aspect-[780/672] md:aspect-auto md:h-[672px]"
          style={{ backgroundColor: CREAM_LIGHTER, borderRadius: 20 }}
        >
          <Image
            src="/assets/wow/role.png"
            alt="Role"
            fill
            sizes="(max-width: 767px) 100vw, 758px"
            className="object-cover"
          />
        </div>
        <BodyBlock>
          <SectionTitle text="My Role" size="lg" />
          <BodyText>
            I was one of three designers. Our lead supervised the first six
            months — the design system phase — then left and was never
            replaced. From that point, the remaining two of us carried the
            full design workload across all modules.
          </BodyText>
          <BodyText>
            My responsibilities included: contributing to the design system
            (guidelines, styles, components with use cases and edge cases,
            patterns), designing complete interaction flows across multiple
            modules, presenting to and iterating with the stakeholder, and
            conducting competitive analysis to inform feature design.
          </BodyText>
        </BodyBlock>
      </div>
      <BodyText>
        I worked most extensively on the HR module, the connection module,
        the profile section and notification details, and the calendar and
        meeting module — though the team collectively touched every part of
        the platform.
      </BodyText>
    </section>
  );
}

function ConstraintSection() {
  return (
    <section className="cs-section-row">
      <BodyBlock>
        <SectionTitle
          text="The Core Constraint: Designing Without Users"
          size="lg"
        />
        <BodyText>
          This needs to be stated upfront because it shaped everything.
        </BodyText>
        <BodyText>
          We had no access to end users. Not during research, not during
          design, not during validation. The project ran agile in planning
          and delivery, but there was zero customer involvement at any
          stage. Every design decision was validated by a single
          stakeholder — the CEO of EPFC — who brought his own domain
          expertise or consulted experts within his company and relayed
          their input back to us.
        </BodyText>
      </BodyBlock>
      <div
        className="shrink-0 overflow-hidden flex flex-col items-start w-full md:w-auto"
        style={{
          backgroundColor: CREAM_LIGHTER,
          padding: 24,
          borderRadius: 20,
        }}
      >
        <StakeholderDiagram />
      </div>
    </section>
  );
}

function DailyCycleNote() {
  return (
    <BodyBlock>
      <BodyText>
        Our daily cycle looked like this: we&rsquo;d present refined flows
        and high-fidelity interface designs in morning meetings. The
        stakeholder would confirm, adjust, or redirect based on his
        experience. We&rsquo;d iterate and return the next day.
      </BodyText>
      <BodyText>
        We tried to compensate. We tested flows with colleagues internally,
        but they were tech professionals — not oil field workers, HR
        managers, or industrial technicians. We referenced best practices
        and existing patterns from the design system. But we could never
        truly validate. The whole design team felt this tension throughout
        the project, and it&rsquo;s ultimately why we left.
      </BodyText>
    </BodyBlock>
  );
}

function Phase1DesignSystem() {
  return (
    <section
      className="w-full flex flex-col items-start"
      style={{ gap: 12 }}
    >
      <SectionTitle
        text="Phase 1: The Design System (Months 1–6)"
        size="md"
      />
      <div className="cs-section-row md:items-center">
        <BodyText>
          Before touching any product flows, we spent six months building
          the design system. For a platform this complex — dozens of
          modules, multiple user roles, dense data — consistency
          wasn&rsquo;t optional. Without it, the product would have felt
          like ten different apps stitched together.
        </BodyText>
        <PhaseImageBlock />
      </div>
      <SystemBlock />
      <BodyText>
        We studied established systems like Material, Carbon, and Polaris,
        then built our own adapted to the platform&rsquo;s needs. It
        included component libraries with documented use cases and edge
        cases, accessibility guidelines (contrast checking became easier
        with Figma&rsquo;s built-in tools), and pattern definitions that
        evolved as we encountered new requirements during the design phase.
      </BodyText>
      <div className="cs-section-row md:items-center">
        <SystemSummaryBlock />
        <BodyText>
          The system wasn&rsquo;t static. Some patterns needed adjustment
          as we moved into more complex modules, and we added variants
          where the original components couldn&rsquo;t accommodate new
          contexts. It was a living system — which is what made it useful
          across such a wide surface area.
        </BodyText>
      </div>
    </section>
  );
}

function Phase2HRModule() {
  return (
    <section
      className="w-full flex flex-col items-start"
      style={{ gap: 40 }}
    >
      <BodyBlock>
        <SectionTitle text="Phase 2: Module Design (Months 7–17)" size="md" />
        <BodyText>
          With the design system in place, we moved into designing flows
          across the platform&rsquo;s modules. I&rsquo;ll focus on the
          areas where I did the most significant work.
        </BodyText>
      </BodyBlock>
      <BodyBlock>
        <SectionTitle text="The HR Module" size="xl" />
        <BodyText>
          HR was the largest and most demanding module. It touched every
          user in the system — from HR professionals and hiring managers to
          industrial workers and corporate staff — which made it the
          natural core of the data architecture.
        </BodyText>
        <BodyText>
          The module covered: organisational charts, onboarding and
          offboarding, job posting and seeking, the employment process,
          payments and salary, insurance, working hours, documents, and
          performance reviews.
        </BodyText>
        <BodyText>
          Some sections — profiles, payment, working hours, documents —
          had strong existing patterns from platforms like BambooHR,
          Personio, and Bob that we could reference and adapt. We analysed
          all three systematically:
        </BodyText>
        <ul
          className="w-full"
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: fs(16),
            lineHeight: "24px",
            letterSpacing: "0.5px",
            listStyle: "disc",
            paddingLeft: 24,
          }}
        >
          <li>
            BambooHR offered the most complete feature set for North
            American SMBs, including native payroll, but lacked engagement
            features.
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
          onboarding/offboarding, and performance review had few reliable
          precedents for this industry context. These required us to design
          from first principles — mapping stakeholder requirements against
          what we understood of the user roles, then iterating with the
          stakeholder until the logic held.
        </BodyText>
      </BodyBlock>
      <CompetitorBlock />
    </section>
  );
}

function RequestForResources() {
  return (
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
          complexity of multi-stakeholder logic in the system — and because
          it went through more iterations than almost any other part of
          the product.
        </BodyText>
        <BodyText>
          The workflow manages job postings and talent acquisition. It
          involves at minimum four distinct user roles: the project manager
          requesting a resource, the HR specialist processing the request,
          the hiring manager evaluating candidates, and the hiring
          manager&rsquo;s superior confirming the need. Each handoff
          required clear authority definitions and confirmation
          hierarchies — and those hierarchies shifted multiple times during
          design, forcing us to restructure the flow repeatedly.
        </BodyText>
      </BodyBlock>
      <BodyBlock>
        <SectionTitle text="The flow works like this:" size="lg" />
        <BodyText>
          A project manager submits a resource request, which routes to HR
          for strategic approval. Once validated, the system publishes the
          vacancy to the community portal. HR and the hiring manager
          collaborate to review applicants based on their profiles. When a
          candidate is selected, the system triggers automated
          notifications for digital documentation. Finally, the HR manager
          facilitates onboarding — generating contracts and credentials to
          integrate the new hire.
        </BodyText>
        <BodyText>
          The challenge wasn&rsquo;t mapping these steps — it was designing
          each handoff so that authority was clear, no step was ambiguous,
          and the flow could accommodate the organisational hierarchies of
          different company structures.
        </BodyText>
      </BodyBlock>
      <RequestImagesBlock />
    </section>
  );
}

function FeedSection() {
  return (
    <section
      className="w-full flex flex-col items-start"
      style={{ gap: 40 }}
    >
      <BodyBlock>
        <SectionTitle text="The Feed: Keeping Users in the Loop" size="lg" />
        <BodyText>
          One feature I&rsquo;m particularly confident about was the feed
          section, which was added later in the process. In a platform
          this large — with dozens of modules and deep menu structures —
          users can easily lose context about what&rsquo;s happening around
          them. The feed served as a persistent surface that kept users
          aware of relevant activity across the platform without requiring
          them to navigate into each module individually.
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
  );
}

function ProjectStatus() {
  return (
    <section className="w-full flex flex-col items-start">
      <BodyBlock>
        <SectionTitle text="What Happened to the Project" size="lg" />
        <BodyText>
          The project was shut down after four years of development —
          before any end users ever used it. The platform had grown into
          something vast and complex, and I believe that scale itself
          became the obstacle. The investment was so deep that questioning
          the direction became increasingly difficult for the board.
        </BodyText>
        <BodyText>
          I left after 17 months, along with most of the design team. The
          core reason was the same tension we&rsquo;d felt from the start:
          we were designing an enormous system based entirely on
          stakeholder assumptions, with no ability to validate with real
          users. The work was technically strong, but we couldn&rsquo;t
          confirm whether it actually solved the problems it was meant to
          solve.
        </BodyText>
      </BodyBlock>
    </section>
  );
}

function ReflectionSection() {
  return (
    <section
      className="w-full flex flex-col items-start"
      style={{ gap: 20 }}
    >
      <SectionTitle text="Reflection" size="lg" />
      <ReflectionBlock title="I'd do completely differently">
        If I started this project today, I would build the simplest
        possible flows first, test the general concept with real or
        representative users, and only then expand into the full system.
        The depth of detail we reached was impressive as design craft —
        but without testing along the way, every layer added was another
        assumption stacked on top of unvalidated foundations.
      </ReflectionBlock>
      <ReflectionBlock title="I'm most confident about">
        The design system was the right investment. Without it, a platform
        of this scope would have collapsed into visual and interaction
        inconsistency within weeks. And the feed section — added later —
        solved a real navigation problem by giving users a persistent
        anchor point in a complex environment.
      </ReflectionBlock>
      <ReflectionBlock title="This project taught me">
        <span style={{ display: "block", marginBottom: 24 }}>
          I learned an enormous amount about enterprise UX: design systems
          at scale, complex multi-role workflows, modular architecture,
          industrial process design, accessibility, and how to maintain
          consistency across a product surface this large.
        </span>
        But the deepest lesson was simpler: it doesn&rsquo;t matter how it
        looks, what it does, or how it could change things — unless
        it&rsquo;s actually used. Everything we designed was based on
        knowledge and experience, but also on assumptions and biases that
        were never tested or confirmed. This project made me a
        fundamentally different designer. Every project I&rsquo;ve taken
        on since starts with the question: how do we get this in front of
        real people as early as possible?
      </ReflectionBlock>
    </section>
  );
}
