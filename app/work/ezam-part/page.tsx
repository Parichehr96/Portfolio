import CaseStudyHeader from "../../_components/CaseStudyHeader";
import {
  BodyBlock,
  BodyText,
  ImageCaption,
  ReflectionBlock,
  SectionTitle,
} from "../../_components/case-study/CaseStudyBody";

/* Ezam Part case study (Figma 313:3185). Same shell as ONTON / Mindful
   Meet — shared morphing header + body primitives. CTAs: Get in touch
   (primary → /contact), Company's Website, Company's Linkedin. */

const SOLWAY = "var(--font-solway), serif";
const NAVY = "#1F2753";
const CREAM = "#F9F5EB";

const COMPANY_WEBSITE_URL = "https://ezamonline.com/";
const COMPANY_LINKEDIN_URL =
  "https://www.linkedin.com/company/ezam-automotive-parts-group/";

export default function EzamPartCaseStudy() {
  return (
    <div className="bg-white relative w-full">
      <CaseStudyHeader
        title="Ezam Part"
        subtitle="Unifying an Auto Parts Manufacturer’s Digital Ecosystem"
        detailItems={[
          {
            label: "Role",
            value:
              "Sole Product Designer — strategy, design system, UX flows, UI",
          },
          {
            label: "Timeline",
            value: "8 months · November 2022 – June 2023",
          },
          {
            label: "Team",
            value:
              "1 designer (me), product manager, product owner, stakeholder",
          },
          {
            label: "Client",
            value:
              "Ezam Group (one of Iran’s largest auto parts manufacturers and distributors)",
          },
          { label: "Tools", value: "Figma, Miro" },
          { label: "Status", value: "Live at ezamonline.com" },
        ]}
        heroImageSrc="/assets/ezam-part/main.png"
        heroImageAlt="Ezam Part platform overview"
        heroImageObjectFit="cover"
        ctas={[
          {
            href: "/contact",
            iconSrc: "/assets/ezam-part/icon-cta-chat.svg",
            label: "Get in touch",
            variant: "primary",
            internal: true,
            uppercase: true,
          },
          {
            href: COMPANY_WEBSITE_URL,
            iconSrc: "/assets/ezam-part/icon-cta-website.svg",
            label: "Company’s Website",
            variant: "secondary",
          },
          {
            href: COMPANY_LINKEDIN_URL,
            iconSrc: "/assets/ezam-part/icon-cta-linkedin.svg",
            label: "Company’s Linkedin",
            variant: "secondary",
          },
        ]}
      />

      <div
        className="cs-body-offset cs-body-padding w-full flex flex-col items-start"
        style={{ gap: 64 }}
      >
        {/* The Problem */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="The Problem: A Major Manufacturer With a Fragmented Digital Presence"
              size="xl"
            />
            <BodyText>
              Ezam is one of Iran&rsquo;s largest auto parts manufacturers
              and distributors. The company sells in bulk to local storage
              hubs and branches, who then distribute parts to repair shops
              and end users across the country.
            </BodyText>
            <BodyText>
              The business was strong, but the digital presence
              wasn&rsquo;t matching it. News, blog content, product
              catalogues, media, and corporate information were scattered
              across disconnected landing pages with inconsistent branding
              and no shared structure. Customers couldn&rsquo;t easily
              find products. Agents had no centralised tools. Repair shops
              had no way to interact with the network at all.
            </BodyText>
            <BodyText>
              The holding company funded a digital agency to fix this, and
              I was brought in as the sole designer to lead the redesign
              across three connected products: a unified consumer website,
              an agent dashboard, and a repairman mobile app.
            </BodyText>
          </BodyBlock>

          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            {/* Diagonal split: cream (top-left, "After") meets navy
                (bottom-right, "Before"). After image sits on the cream
                side at left=5.42%, before image on the navy side at
                left=65.17%. Positions/sizes are percentage-based off
                the original 1272×800 Figma frame so the layout scales
                cleanly across breakpoints. */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "1272 / 800",
                borderRadius: 8,
                background: `linear-gradient(237.66deg, ${CREAM} 0%, ${CREAM} 49.662%, ${NAVY} 49.761%, ${NAVY} 99.522%)`,
              }}
            >
              <div
                className="absolute overflow-hidden"
                style={{
                  left: "5.42%",
                  top: "7.5%",
                  width: "29.32%",
                  height: "173.25%",
                }}
              >
                <img
                  src="/assets/ezam-part/after.png"
                  alt="After: unified ezampart.com homepage"
                  className="block w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p
                className="absolute"
                style={{
                  left: "47.72%",
                  top: "8.25%",
                  color: "#111323",
                  fontFamily: SOLWAY,
                  fontWeight: 400,
                  fontSize: "clamp(12px, 1.7vw, 22px)",
                  lineHeight: "1.27",
                  whiteSpace: "nowrap",
                  margin: 0,
                }}
              >
                After
              </p>
              <div
                className="absolute overflow-hidden"
                style={{
                  left: "65.17%",
                  top: "2.375%",
                  width: "29.32%",
                  height: "97.625%",
                }}
              >
                <img
                  src="/assets/ezam-part/before.png"
                  alt="Before: scattered legacy landing pages"
                  className="block w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <p
                className="absolute"
                style={{
                  left: "47.25%",
                  top: "88.125%",
                  color: "#FFFFFF",
                  fontFamily: SOLWAY,
                  fontWeight: 400,
                  fontSize: "clamp(12px, 1.7vw, 22px)",
                  lineHeight: "1.27",
                  whiteSpace: "nowrap",
                  margin: 0,
                }}
              >
                Before
              </p>
            </div>
            <ImageCaption>
              Before: scattered legacy landing pages vs. After: unified
              ezampart.com homepage
            </ImageCaption>
          </div>
        </section>

        {/* My Role */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="My Role" size="lg" />
            <BodyText>
              I worked as the only designer in a team of four — alongside
              the stakeholder, product manager, and product owner. My
              responsibilities covered the full design scope: strategy,
              content structure, design system, user flows, and final
              interfaces across web and mobile, in both consumer and
              professional contexts.
            </BodyText>
            <BodyText>
              The platform was designed for RTL (right-to-left) Farsi,
              intended for launch in Iran. I&rsquo;m a native Farsi
              speaker, which made the language layer straightforward.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Research */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="Research: Three Audiences, Three Different Needs"
              size="lg"
            />
            <BodyText>
              The platform had to serve three very different user groups,
              and understanding what each one actually needed was the
              foundation of every design decision.
            </BodyText>
            <BodyText>
              <strong>End consumers</strong> browse for parts when
              something breaks. They want to find the right component for
              their specific car quickly, without needing to know
              technical part numbers or industry terminology.
            </BodyText>
            <BodyText>
              <strong>Agents</strong> distribute products regionally. They
              were the most operationally complex group: they manage
              their own repositories manually, deal with regional demand
              mismatches (a part that sells well in one city might sit
              unused in another), and needed a reason to participate in
              the new fulfilment model.
            </BodyText>
            <BodyText>
              The agent piece was critical. Shops and customers both
              benefit from the new system, but agents bear the
              operational cost — they need to hold stock and dispatch
              parts on demand. So we designed the agent dashboard with a
              specific incentive: a parts exchange feature, letting
              agents trade slow-moving stock for items that sell better
              in their region.
            </BodyText>
            <BodyText>
              <strong>Repair shops</strong> need parts on demand.
              Currently, when a customer brings in a broken car, the shop
              tells them what&rsquo;s needed, and the customer has to
              source the part themselves. We wanted to flip that —
              letting the repairman request the part directly from the
              nearest agent, who delivers it to the shop quickly. Shops
              loved this idea immediately because it meant they could
              hold less inventory.
            </BodyText>
          </BodyBlock>

          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <img
              src="/assets/ezam-part/mind-map.png"
              alt="Three-audience map: consumer, repair shop, and agent — needs and incentives"
              className="block w-full h-auto"
            />
            <ImageCaption>
              Three-audience map: consumer / repair shop / agent — needs
              and incentives
            </ImageCaption>
          </div>
        </section>

        {/* Competitor Analysis */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Competitor Analysis" size="lg" />
            <BodyText>
              I studied major international and domestic auto parts
              platforms — Bosch, Valeo, Crouse, and Iran Khodro — to
              understand both content structure and selling flows.
            </BodyText>
            <BodyText>
              The most useful reference was <strong>Bosch</strong>. Their
              selling flow was the cleanest example of how to structure a
              parts catalogue around what the user actually knows (their
              car, their problem) rather than around how the manufacturer
              organises its inventory (part categories, SKUs). That
              insight directly shaped the &ldquo;Select Your Car&rdquo;
              filter, which I&rsquo;ll come back to below.
            </BodyText>
            <BodyText>
              The other competitors had cleaner unified websites than
              Ezam&rsquo;s existing landing pages — confirming that the
              first move had to be consolidation. Before designing any
              new features, the scattered legacy pages needed to be
              brought under one branded roof.
            </BodyText>
          </BodyBlock>

          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <img
              src="/assets/ezam-part/competitor-analysis.png"
              alt="Competitor reference — Bosch, Valeo, Crouse, Iran Khodro"
              className="block w-full h-auto"
            />
            <ImageCaption>
              Competitor reference: Bosch, Valeo, Crouse, Iran Khodro —
              structural patterns
            </ImageCaption>
          </div>
        </section>

        {/* Strategy */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Strategy: Three Connected Products" size="lg" />
            <BodyText>
              Rather than treating this as a website redesign, we
              approached it as a connected ecosystem with three products
              that needed to work together:
            </BodyText>
            <BodyText>
              <strong>1. The consumer website (ezampart.com)</strong> —
              unified product catalogue, brand content, agent locator,
              and direct purchasing.
            </BodyText>
            <BodyText>
              <strong>2. The agent dashboard</strong> — a unified ERP for
              agents to manage inventory, fulfil repair shop requests,
              and exchange stock with other agents in different regions.
            </BodyText>
            <BodyText>
              <strong>3. The repairman mobile app</strong> — letting
              repair shops request parts directly from the nearest agent
              on demand.
            </BodyText>
            <BodyText>
              I designed a single design system covering all three
              products to maintain consistency across the ecosystem. Even
              though only the website launched during my time on the
              project, the design system was built to scale into the
              dashboard and app from day one.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Shipping */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="What Shipped and What Didn’t" size="lg" />
            <BodyText>
              This is something I want to be transparent about: I
              designed a complete ecosystem, but only one third of it
              became real during my involvement. The strategic work — the
              agent incentive model, the parts exchange, the on-demand
              fulfilment flow — exists as designs and documentation, not
              as a running product.
            </BodyText>
            <BodyText>
              The website launched at <strong>ezampart.com</strong> and
              is live today. The agent dashboard and repairman app were
              designed and ready, but development on those products
              started after I left the company. I don&rsquo;t have
              visibility into whether they were eventually built.
            </BodyText>
          </BodyBlock>

          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <img
              src="/assets/ezam-part/live-preview.png"
              alt="Live ezampart.com homepage, product detail, and agent locator"
              className="block w-full h-auto"
            />
            <ImageCaption>
              Live: ezampart.com homepage + product detail + agent locator
            </ImageCaption>
          </div>
        </section>

        {/* Reflection */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 20 }}
        >
          <SectionTitle text="Reflection" size="lg" />
          <ReflectionBlock title="What I’m confident about">
            Unifying everything into a single platform was the right call.
            Before this project, Ezam&rsquo;s digital presence was
            scattered across disconnected pages with no shared identity.
            Bringing it together — and designing the system to scale into
            agent and repairman tools — gave the business a foundation it
            didn&rsquo;t have before. The website is still live three
            years later, which suggests the structure has held.
          </ReflectionBlock>
          <ReflectionBlock title="What I’d do differently">
            I&rsquo;d push harder for prototype testing on the smaller
            flows — even informally. I designed the entire ecosystem
            based on stakeholder input, competitor research, and
            strategic logic, but I didn&rsquo;t have the authority to run
            usability tests before launch. Looking back, I should have
            built quick prototypes of key flows (like the Select Your Car
            filter, or the agent exchange interface) and tested them with
            even a handful of representative users. The cost would have
            been minimal and the validation would have been valuable.
            <br />
            <br />
            This is a lesson that has stayed with me: even when the
            project structure doesn&rsquo;t formally include user
            testing, a designer can and should create informal
            opportunities to put the work in front of real people. Asking
            permission isn&rsquo;t always the right move — sometimes you
            just need to do it.
          </ReflectionBlock>
          <ReflectionBlock title="What I took forward">
            This project taught me how to design across a connected
            ecosystem rather than for a single product. Holding three
            audiences (consumer, professional, B2B), three platforms
            (web, dashboard, mobile app), and one shared design system in
            mind simultaneously is a discipline I now apply to every
            multi-product brief. The work also reinforced that the most
            strategically important design decisions often live in the
            products users never see — the agent dashboard mattered more
            to the business model than the consumer website did, even
            though the website got all the visibility.
          </ReflectionBlock>
        </section>
      </div>
    </div>
  );
}
