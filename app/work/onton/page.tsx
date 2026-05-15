import CaseStudyHeader from "../../_components/CaseStudyHeader";
import { fs } from "../../_lib/typography";
import {
  BodyBlock,
  BodyText,
  ImageCaption,
  ImageFrame,
  ReflectionBlock,
  SectionTitle,
} from "../../_components/case-study/CaseStudyBody";

/* ONTON case study (Figma 313:2990).
   Header is the shared CaseStudyHeader; body sections below are
   specific to ONTON. CTAs: Get in touch (primary, → /contact),
   Telegram bot, Telegram Channel. */

const SOLWAY = "var(--font-solway), serif";
const NAVY = "#1F2753";
const CREAM = "#F9F5EB";

const TELEGRAM_BOT_URL = "https://t.me/theontonbot";
const TELEGRAM_CHANNEL_URL = "https://t.me/ontonlive";

export default function OntonCaseStudy() {
  return (
    <div className="bg-white relative w-full">
      <CaseStudyHeader
        title="ONTON"
        subtitle={'Designing the "Social-Chain" Bridge'}
        detailItems={[
          { label: "Role", value: "Product / UX Designer" },
          {
            label: "Timeline",
            value: "13 months · May 2024 – June 2025",
          },
          {
            label: "Team",
            value: "Sole designer, 1 lead, 4 developers, 3 marketers",
          },
          { label: "Client", value: "Pome group (Finnish studio)" },
          { label: "Tools", value: "Figma, Miro, FigJam, Metabase" },
          {
            label: "Status",
            value: "Shipped product · No longer active",
          },
        ]}
        heroImageSrc="/assets/onton/main.png"
        heroImageAlt="ONTON Telegram Mini App overview"
        heroImageObjectFit="cover"
        ctas={[
          {
            href: "/contact",
            iconSrc: "/assets/onton/icon-cta-chat.png",
            label: "Get in touch",
            variant: "primary",
            internal: true,
            uppercase: true,
          },
          {
            href: TELEGRAM_BOT_URL,
            iconSrc: "/assets/onton/icon-cta-token.png",
            label: "Telegram bot",
            variant: "secondary",
          },
          {
            href: TELEGRAM_CHANNEL_URL,
            iconSrc: "/assets/onton/icon-cta-telegram.png",
            label: "Telegram Channel",
            variant: "secondary",
          },
        ]}
      />

      <div
        className="cs-body-offset cs-body-padding w-full flex flex-col items-start"
        style={{ gap: 64 }}
      >
        {/* Problem */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="The Problem: Community Lives in Chat, Trust Lives on the Blockchain"
              size="xl"
            />
            <BodyText>
              This is the story of how we turned Telegram conversations into
              verified experiences.
            </BodyText>
            <BodyText>
              In the TON ecosystem, crypto communities organise through
              Telegram — but verifying identity, distributing proof-of-
              attendance badges, and rewarding real participation is
              fragmented across off-chain chat and on-chain wallets. Token
              hunters game the system; genuine attendees miss out; organisers
              spend hours on administrative work that should be invisible.
            </BodyText>
            <BodyText>
              When I joined in May 2024, the product was a legacy Telegram
              bot serving 87 daily active users. It worked, but barely. The
              flows weren&rsquo;t architecturally designed — they had grown
              organically without a design system, brand identity, or
              consistent interaction patterns.
            </BodyText>
            <BodyText>
              The company wanted to pivot from the legacy bot to a Telegram
              Mini App. I was brought on as the sole designer to lead that
              transition.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <ImageFrame
              src="/assets/onton/section-event-flow.png"
              alt="Mini App event participation screens after multiple iterations"
              bg={CREAM}
            />
            <ImageCaption>
              Mini App event screens after multiple iterations
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
              I was the only designer for the full 13 months. Other designers
              joined briefly — usually for about a month — but rarely got
              through onboarding before leaving. I maintained roughly 90 % of
              all design output myself.
            </BodyText>
            <BodyText>
              My responsibilities covered the full scope: I initiated the
              design system, defined the feature list, sketched wireframes,
              designed high-fidelity interfaces, and iterated on flows
              continuously based on analytics and user feedback. I worked
              directly with the founder (who also acted as product manager)
              and four engineers, handing off detailed Figma specs and
              reviewing implementation against the design.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Research Insights */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Research Insights" size="lg" />
            <SectionTitle text="The Token Hunter Problem" size="md" />
            <BodyText>
              The marketing team had investigators embedded in TON community
              hubs across five countries. They spent time with real
              community members — observing behaviour, gathering feedback,
              and reporting insights back to the team.
            </BodyText>
            <BodyText>
              The most important finding reshaped how I thought about the
              product: the majority of users weren&rsquo;t attending events
              for the events. They were hunting badges and tokens, hoping
              these proof-of-attendance assets would eventually convert to
              real cryptocurrency value.
            </BodyText>
            <BodyText>This created a two-sided design problem:</BodyText>
            <BodyText>
              <strong>For organisers:</strong> How do you verify that
              attendees actually showed up, without creating an
              administrative burden?
            </BodyText>
            <BodyText>
              <strong>For participants:</strong> How do you make wallet
              connection and badge claiming feel safe — inside an
              environment (Telegram) where external links and wallet prompts
              are associated with scams and &ldquo;drainers&rdquo;?
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <div
              className="w-full flex flex-col items-center"
              style={{
                backgroundColor: NAVY,
                borderRadius: 20,
                padding: "40px 32px",
                gap: 24,
              }}
            >
              <p
                className="w-full text-center"
                style={{
                  color: CREAM,
                  fontFamily: SOLWAY,
                  fontWeight: 700,
                  fontSize: fs(24),
                  lineHeight: "32px",
                  letterSpacing: "0.15px",
                  margin: 0,
                }}
              >
                Participants &amp; Organizers
              </p>
              <img
                src="/assets/onton/two-sided-diagram.png"
                alt="Two-sided trust problem diagram — organisers vs. participants"
                className="block w-full h-auto"
              />
            </div>
            <ImageCaption>
              Diagram: the two-sided trust problem — organisers vs.
              participants
            </ImageCaption>
          </div>
        </section>

        {/* Design Principles */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Design Principles" size="lg" />
            <BodyText>
              Three principles emerged from the research and guided
              decisions throughout the project:
            </BodyText>
            <BodyText>
              <strong>1. If it&rsquo;s not in the chat, it&rsquo;s not
              happening.</strong> Users live in Telegram. Every flow needed
              to feel native — no external links, no app switching, no new
              mental models.
            </BodyText>
            <BodyText>
              <strong>2. Security through familiarity.</strong> Wallet
              connection and verification had to feel like standard system
              behaviour, not a crypto-specific interaction. Reduce jargon,
              increase trust.
            </BodyText>
            <BodyText>
              <strong>3. Simplify by default, expand by choice.</strong> Not
              every organiser needs advanced features. The default flow
              should be fast and general; complexity should be opt-in.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Legacy System */}
        <section className="w-full flex flex-col items-start">
          <div className="cs-section-row">
            <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 16 }}>
              <BodyBlock>
                <SectionTitle text="The Legacy System: What I Started With" size="lg" />
                <BodyText>
                  The existing bot had two core flows: organisers could
                  create events, and participants could join them.
                </BodyText>
                <BodyText>
                  Event creation required the organiser to set: name,
                  description, date / time, event type (online / offline),
                  venue location, capacity, category, whether the event
                  required a password for badge claiming, and whether
                  registration needed a form submission with organiser
                  approval.
                </BodyText>
                <BodyText>
                  Participation surfaced this information and let users
                  register. But the interface was a command-line-style bot
                  — no visual hierarchy, no brand consistency, no designed
                  flows. Users typed commands rather than navigating an
                  interface.
                </BodyText>
                <BodyText>
                  The system worked for a small community, but
                  couldn&rsquo;t scale. There was no infrastructure for
                  in-app wallet connection, no way to expand features
                  without breaking existing flows, and no design language
                  to build on.
                </BodyText>
              </BodyBlock>
            </div>
            <div
              className="w-full md:w-[360px] md:shrink-0 flex flex-col"
              style={{ gap: 16 }}
            >
              <ImageFrame
                src="/assets/onton/legacy-bot.png"
                alt="Legacy ONTON Telegram bot interaction flow"
                bg={CREAM}
              />
              <ImageCaption>
                Legacy bot interaction flow — command-based, unstructured
              </ImageCaption>
            </div>
          </div>
        </section>

        {/* Key Design Decisions */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <SectionTitle text="Key Design Decisions" size="xl" />

          {/* 1. Design System */}
          <BodyBlock>
            <SectionTitle text="1. Design System Aligned with Telegram" size="lg" />
            <BodyText>
              To make the Mini App feel native rather than foreign, I built
              the design system around Telegram&rsquo;s own visual language
              — matching its colours, spacing patterns, and general
              appearance. This was a deliberate constraint: users should
              feel like they&rsquo;re still inside Telegram, not visiting an
              external product.
            </BodyText>
            <BodyText>
              The exception was the event ticket itself — I used
              glassmorphic card styling specifically to create a moment of
              visual distinction. Telegram didn&rsquo;t offer anything like
              it, so there were no existing expectations to break. The
              ticket needed to feel &ldquo;ownable,&rdquo; like a
              collectible rather than a receipt, and the glass treatment
              gave it the right material weight.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <ImageFrame
              src="/assets/onton/event-screens.png"
              alt="Event participation flow — Telegram-vibed components plus glassmorphic ticket"
              bg={CREAM}
            />
            <ImageCaption>
              Event participation: Telegram-vibed components + glassmorphic
              ticket card. Event list → Event Details → Ticket
            </ImageCaption>
          </div>

          {/* 2. Wallet Connection */}
          <BodyBlock>
            <SectionTitle
              text="2. Wallet Connection as a Native Moment"
              size="lg"
            />
            <BodyText>
              The biggest trust barrier was wallet connection. In the
              crypto space, pop-ups asking users to connect wallets are
              strongly associated with scams. I worked with the dev team to
              implement TON Connect as a nested flow — the wallet prompt
              appeared like a native system alert rather than an external
              redirect, so users could connect without leaving the
              conversation.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <ImageFrame
              src="/assets/onton/wallet-connect.png"
              alt={'Wallet connection flow: tap "Join" → native-feeling wallet prompt → verified'}
              bg={NAVY}
            />
            <ImageCaption>
              Wallet connection flow: tap &ldquo;Join&rdquo; → native-
              feeling wallet prompt → verified
            </ImageCaption>
          </div>

          {/* 3. Password Pivot */}
          <BodyBlock>
            <SectionTitle
              text="3. The Password Pivot: From Notification to Confirmation"
              size="lg"
            />
            <BodyText>
              To combat token hunters sending bots to claim badges without
              attending, we introduced a password system. The organiser
              could set a password, then trigger a push notification during
              the event — attendees had a two-minute window to enter it and
              claim their badge.
            </BodyText>
            <BodyText>
              It failed. Users complained about missing the notification
              despite being physically present. The time pressure created
              anxiety rather than security. People felt punished for being
              in the room but not watching their phone at the right moment.
            </BodyText>
            <BodyText>
              We pivoted to a simpler model: the password remained active
              throughout the entire event duration. Attendees could confirm
              at any point. It was less &ldquo;secure&rdquo; in theory, but
              far more humane in practice — and it eliminated the
              complaints entirely.
            </BodyText>
          </BodyBlock>

          {/* 4. Event Creation */}
          <BodyBlock>
            <SectionTitle
              text="4. Event Creation: Simplifying a Complex Flow"
              size="lg"
            />
            <BodyText>
              The creation flow carried a lot of options — password, forms,
              capacity, categories, online / offline toggle, location. For
              power users running large community events, these were
              essential. For someone organising a casual meetup, they were
              overwhelming.
            </BodyText>
            <BodyText>
              Looking back, one of my clearest regrets is not implementing
              a progressive disclosure pattern earlier: a simplified default
              creation flow with advanced features hidden behind toggles
              (off by default). I eventually understood this, but the
              insight came later than it should have.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <ImageFrame
              src="/assets/onton/event-creation.png"
              alt="Paid event creation flow — key screens with annotation"
              bg={CREAM}
            />
            <ImageCaption>
              Paid event creation flow — key screens with annotation on
              complexity points
            </ImageCaption>
          </div>
        </section>

        {/* Impact */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Impact" size="xl" />
            <BodyText>
              Over 13 months, the product grew from a small legacy bot to
              a functioning platform:
            </BodyText>
          </BodyBlock>

          {/* Metrics table — three columns: Metric / Before / After */}
          <div
            className="w-full flex flex-col px-[20px] py-[24px] md:px-[40px] md:py-[32px]"
            style={{
              backgroundColor: CREAM,
              borderRadius: 20,
              gap: 12,
              fontFamily: SOLWAY,
              color: NAVY,
              fontSize: fs(16),
              lineHeight: "24px",
              letterSpacing: "0.5px",
            }}
          >
            <div
              className="w-full flex items-center"
              style={{
                fontWeight: 700,
                paddingBottom: 12,
                borderBottom: `1px solid ${NAVY}`,
              }}
            >
              <span style={{ flex: 1, minWidth: 0 }}>Metric</span>
              <span className="w-[80px] md:w-[200px] text-right shrink-0">
                Before
              </span>
              <span className="w-[80px] md:w-[200px] text-right shrink-0">
                After
              </span>
            </div>
            {[
              ["Daily Active Users", "87", "~1,500 (17× growth)"],
              ["Total User Profiles", "—", "30,000+"],
              [
                "Event Creation Time",
                "3 min 34 sec",
                "2 min 17 sec (36 % reduction)",
              ],
            ].map(([metric, before, after]) => (
              <div
                key={metric}
                className="w-full flex items-center"
                style={{ paddingTop: 8, paddingBottom: 8 }}
              >
                <span style={{ flex: 1, minWidth: 0 }}>{metric}</span>
                <span className="w-[80px] md:w-[200px] text-right shrink-0">
                  {before}
                </span>
                <span className="w-[80px] md:w-[200px] text-right shrink-0">
                  {after}
                </span>
              </div>
            ))}
          </div>

          <BodyText>
            The 30-second claim for the participant join flow — from chat
            message to verified ticket — was measured across multiple users
            after the new ticket interface was implemented.
          </BodyText>

          {/* KPI table — two columns: KPI / How It's Measured */}
          <div
            className="w-full flex flex-col px-[20px] py-[24px] md:px-[40px] md:py-[32px]"
            style={{
              backgroundColor: CREAM,
              borderRadius: 20,
              gap: 12,
              fontFamily: SOLWAY,
              color: NAVY,
              fontSize: fs(16),
              lineHeight: "24px",
              letterSpacing: "0.5px",
            }}
          >
            <div
              className="w-full flex items-start"
              style={{
                fontWeight: 700,
                paddingBottom: 12,
                borderBottom: `1px solid ${NAVY}`,
              }}
            >
              <span className="w-[160px] md:w-[260px] shrink-0">KPI</span>
              <span className="flex-1" style={{ minWidth: 0 }}>
                How It&rsquo;s Measured
              </span>
            </div>
            {[
              [
                "Task Completion Time",
                "Time taken for each step and total event creation time.",
              ],
              [
                "Task Success Rate",
                "% of users who complete each task without assistance.",
              ],
              [
                "Error Rate",
                "Number of misclicks, form-submission errors, or moments of confusion.",
              ],
              [
                "User Satisfaction",
                "Post-task ratings (1–5 scale) and qualitative feedback.",
              ],
              [
                "Cognitive Load",
                "Observed hesitation, pauses, and confidence levels (e.g. “Where do I click next?”).",
              ],
              [
                "Feature Discovery Rate",
                "% of users who successfully find and use key features like “Spin to Win,” NFT gating, or templates.",
              ],
              [
                "NPS-style Recommendation",
                '"Would you recommend this tool to others to create events?" (scale 0–10).',
              ],
            ].map(([kpi, how]) => (
              <div
                key={kpi}
                className="w-full flex items-start"
                style={{ paddingTop: 8, paddingBottom: 8 }}
              >
                <span
                  className="w-[160px] md:w-[260px] shrink-0"
                  style={{ fontWeight: 500 }}
                >
                  {kpi}
                </span>
                <span className="flex-1" style={{ minWidth: 0 }}>
                  {how}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Project status */}
        <section className="w-full flex flex-col items-start">
          <BodyBlock>
            <SectionTitle text="What Happened to the Project" size="lg" />
            <BodyText>
              I want to be transparent: the business was on a downward
              trajectory, and shortly after I exited, the project failed.
              The service is no longer available, though the website,
              campaign tokens, and code repository still exist.
            </BodyText>
            <BodyText>
              This doesn&rsquo;t diminish the design work. The product
              shipped, served real users, and grew significantly during its
              lifespan. But it&rsquo;s a reminder that good design
              doesn&rsquo;t guarantee business survival — and I think
              it&rsquo;s important to say that honestly.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Reflection */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 20 }}
        >
          <SectionTitle text="Reflection" size="lg" />
          <ReflectionBlock title="What worked">
            The Telegram-native design system was the right call. By
            constraining the visual language to match Telegram&rsquo;s
            patterns, we removed the &ldquo;this feels foreign&rdquo;
            friction that kills adoption in Mini Apps. The glassmorphic
            ticket was a calculated exception — differentiation in the one
            place where users wanted something to feel ownable.
            <br />
            <br />
            The password pivot is the interaction decision I&rsquo;m most
            confident about. Choosing usability over theoretical security
            — and responding to real complaints rather than defending the
            original design — was the right instinct.
          </ReflectionBlock>
          <ReflectionBlock title="What I'd do differently">
            I&rsquo;d implement progressive disclosure in event creation
            much earlier. The toggle-based approach (simple by default,
            complex by choice) would have made the platform more accessible
            to casual organisers from day one rather than serving only
            power users.
            <br />
            <br />
            I&rsquo;d also invest more in simplifying the attendance flow
            without compromising badge security. The tension between making
            it easy for real attendees and hard for bots is a design
            problem I didn&rsquo;t fully resolve.
          </ReflectionBlock>
          <ReflectionBlock title="What I took forward">
            <span style={{ display: "block", marginBottom: 24 }}>
              Thirteen months as a solo designer under constant time
              pressure — shipping features, iterating on feedback,
              maintaining consistency across a growing product — taught me
              that I can design functional, intuitive interfaces fast.
            </span>
            But more importantly, it taught me to stay grounded in user
            evidence even when the runway is short. The clearest
            improvements came not from polish, but from honestly observing
            where real people got stuck and choosing humane defaults over
            clever ones.
          </ReflectionBlock>
        </section>
      </div>
    </div>
  );
}
