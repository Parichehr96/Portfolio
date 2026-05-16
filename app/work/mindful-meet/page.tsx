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

/* Mindful Meet case study (Figma 313:3257). Same shell as ONTON: shared
   morphing header + body primitives. CTAs: Get in touch (primary →
   /contact), Research Report, Prototype. The Research/Prototype links
   are placeholders until the live URLs are supplied. */

const SOLWAY = "var(--font-solway), serif";
const NAVY = "#1F2753";
const CREAM = "#F9F5EB";

const RESEARCH_REPORT_URL =
  "https://medium.com/@parichehr.t96/mindful-meet-c07bbc648ac3";
const PROTOTYPE_URL = "https://linear-give-41714666.figma.site/";

export default function MindfulMeetCaseStudy() {
  return (
    <div className="bg-[var(--color-bg-page)] relative w-full">
      <CaseStudyHeader
        title="Mindful Meet"
        subtitle="Eco-Conscious Meeting Lifecycle Design"
        detailItems={[
          {
            label: "Role",
            value: "Interaction Designer — sole prototype builder in a 4-person team",
          },
          {
            label: "Timeline",
            value: "8 weeks · Oct 2025 – Dec 2025",
          },
          { label: "Team", value: "4 designers" },
          { label: "Client", value: "HvA Master’s Interaction Design" },
          { label: "Tools", value: "Figma, Figma Make, Miro" },
          {
            label: "Status",
            value: "High-fidelity working prototype · Exhibited at TH/NGS Con",
          },
        ]}
        heroImageSrc="/assets/mindful-meet/main.png"
        heroImageAlt="Mindful Meet calendar prototype overview"
        heroImageObjectFit="cover"
        ctas={[
          {
            href: "/contact",
            iconSrc: "/assets/mindful-meet/icon-cta-chat.svg",
            label: "Get in touch",
            variant: "primary",
            internal: true,
            uppercase: true,
          },
          {
            href: RESEARCH_REPORT_URL,
            iconSrc: "/assets/mindful-meet/icon-cta-research.svg",
            label: "Research Report",
            variant: "secondary",
          },
          {
            href: PROTOTYPE_URL,
            iconSrc: "/assets/mindful-meet/icon-cta-prototype.svg",
            label: "Prototype",
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
              text="The Problem: Meetings That Cost More Than Time"
              size="xl"
            />
            <BodyText>
              Online meetings feel effortless to schedule. That
              frictionlessness is the problem.
            </BodyText>
            <BodyText>
              The average professional spends 2.6 hours per day in
              meetings. A single one-hour video call consumes 7.2 GB of
              data. Multiply that across an organisation, and the digital
              carbon footprint of meeting culture becomes enormous — yet
              completely invisible to the people generating it.
            </BodyText>
            <BodyText>
              But this isn&rsquo;t just an environmental story. Our
              research revealed what we called the multi-layer effect:
              meeting overload simultaneously drives burnout, fragments
              focus, and creates unequal participation. The carbon cost
              and the human cost share the same root — we schedule
              meetings without ever feeling their weight.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <ImageFrame
              src="/assets/mindful-meet/multi-layer-effect.png"
              alt="Multi-layer effect diagram — online meetings cascading into mental health, carbon emissions, productivity, and business culture"
              bg={CREAM}
            />
            <ImageCaption>
              Multi-layer effect diagram — online meetings → Mental
              Health / Carbon Emissions / Productivity / Business culture
            </ImageCaption>
          </div>
        </section>

        {/* Research */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Research: Why Sustainability Fails at Work" size="lg" />
            <BodyText>
              Two workshops with 10 participants and three expert
              interviews with professionals at Vandebron and Jungleminds
              surfaced a consistent pattern.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <ImageFrame
              src="/assets/mindful-meet/expert-interviews.png"
              alt="Expert interview portraits"
              bg={CREAM}
              padding={16}
            />
            <ImageCaption>
              Expert interview portraits: Ladislav Učovský, Jeffrey Van
              Den Dungen Bille, Robbert De Kruijff
            </ImageCaption>
          </div>
          <BodyBlock>
            <BodyText>
              People don&rsquo;t ignore sustainability because they
              don&rsquo;t care. They ignore it because it&rsquo;s never
              made personally relevant at the moment of decision. In
              professional settings, sustainability competes with
              deadlines, team dynamics, and calendar pressure — and it
              always loses.
            </BodyText>
            <BodyText>
              This became our primary design constraint: make the invisible
              cost visible inside the tool people already use, without
              adding guilt or friction.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Design Principles */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Design Principles" size="lg" />
            <BodyText>
              Three principles guided every decision throughout the
              project:
            </BodyText>
            <BodyText>
              <strong>1. Present but overrideable.</strong> Never block the
              user. Show the cost, but let them decide. The distinction
              between informing people and restricting them shaped every
              interaction.
            </BodyText>
            <BodyText>
              <strong>2. Aspiration over guilt.</strong> Every expert named
              guilt as the reason sustainability tools fail at work.
              Feedback should frame positive contribution, not punishment.
            </BodyText>
            <BodyText>
              <strong>3. No new habits required.</strong> Embed into the
              existing workflow — the calendar people already open every
              morning. No new platform, no onboarding, no behaviour change
              required.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Ideation */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Ideation: Two Concepts Killed With Reason" size="lg" />
          </BodyBlock>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 24 }}
          >
            {[
              { src: "crazy8-digital-diet.png", label: "Digital Diet" },
              {
                src: "crazy8-competition-dashboard.png",
                label: "Competition Dashboard",
              },
              { src: "crazy8-co2-calendar.png", label: "CO₂ Calendar" },
            ].map((item) => (
              <div
                key={item.label}
                className="w-full flex flex-col"
                style={{ gap: 12 }}
              >
                <ImageFrame
                  src={`/assets/mindful-meet/${item.src}`}
                  alt={`Crazy 8 sketch: ${item.label}`}
                  bg={CREAM}
                />
                <p
                  className="w-full text-center"
                  style={{
                    color: NAVY,
                    fontFamily: SOLWAY,
                    fontWeight: 700,
                    fontSize: fs(16),
                    lineHeight: "24px",
                    letterSpacing: "0.5px",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <ImageCaption>
            Crazy 8 brainstorming result — Top 3 ideas
          </ImageCaption>
          <BodyBlock>
            <BodyText>
              We developed three concepts. Two were dropped — and the
              reasoning mattered as much as the one we chose.
            </BodyText>
            <BodyText>
              <strong>Department leaderboard</strong> — dropped because
              inherent role differences (video-heavy vs. text-heavy work)
              made any comparison unfair. A gameable leaderboard creates
              resentment, not behaviour change.
            </BodyText>
            <BodyText>
              <strong>Avatar diet</strong> — a persistent avatar whose body
              reflected data consumption. We dropped this after recognising
              it borrowed harmful body-shaming tropes. Linking weight gain
              to &ldquo;bad&rdquo; digital behaviour amplifies a real-
              world harm. Catching that before it got prototyped and
              shipped was one of the most important calls we made.
              Environmental design can&rsquo;t solve one problem by
              creating another.
            </BodyText>
            <BodyText>
              <strong>CO₂ Calendar</strong> — the concept we moved forward
              with: embedding carbon and bandwidth awareness directly into
              the scheduling tool.
            </BodyText>
          </BodyBlock>
        </section>

        {/* What I Designed */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <SectionTitle text="What I Designed" size="xl" />
          <BodyBlock>
            <BodyText>
              While the team of four shared research and strategy, I
              designed and built the entire product prototype — the
              calendar interface, interaction system, and three dynamic
              video modes.
            </BodyText>
          </BodyBlock>

          {/* The Calendar — Before and After */}
          <BodyBlock>
            <SectionTitle text="The Calendar — Before and After Meetings" size="lg" />
          </BodyBlock>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 24 }}
          >
            {[
              { src: "calendar-before.png", label: "Before" },
              { src: "calendar-after.png", label: "After" },
            ].map((item) => (
              <div
                key={item.label}
                className="w-full flex flex-col"
                style={{ gap: 12 }}
              >
                <ImageFrame
                  src={`/assets/mindful-meet/${item.src}`}
                  alt={`Calendar concept — ${item.label}`}
                  bg={CREAM}
                />
                <p
                  className="w-full text-center"
                  style={{
                    color: NAVY,
                    fontFamily: SOLWAY,
                    fontWeight: 700,
                    fontSize: fs(16),
                    lineHeight: "24px",
                    letterSpacing: "0.5px",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <ImageCaption>
            Early simple calendar concept vs. final dark-mode calendar
            prototype
          </ImageCaption>
          <BodyBlock>
            <BodyText>
              We started with a simple calendar overlay — an extra
              indicator on a standard calendar view. But that raised a
              cascade of design questions that shaped the final product:
            </BodyText>
            <BodyText>
              • How do we distinguish online meetings from offline tasks?
              <br />• What should the default daily limit be?
              <br />• What happens when someone reaches their limit?
              <br />• Do we block them — or trust them?
            </BodyText>
          </BodyBlock>

          {/* Daily Meeting Budget */}
          <BodyBlock>
            <SectionTitle text="Daily Meeting Budget" size="lg" />
            <BodyText>
              The core feature: a soft daily cap (default 3 hours, derived
              from the 2.6-hour professional average) that makes digital
              meeting time feel finite. It&rsquo;s not a hard block.
              Exceeding it is a visible, conscious choice.
            </BodyText>
            <BodyText>
              When a guest has no remaining budget, the tool suggests
              rescheduling — but never prevents the meeting.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <ImageFrame
              src="/assets/mindful-meet/daily-budget.png"
              alt="Daily budget indicator on calendar — approaching and exceeding limit states"
              bg={CREAM}
              padding={16}
            />
            <ImageCaption>
              Daily budget indicator on calendar — approaching and
              exceeding limit states
            </ImageCaption>
          </div>

          {/* Weekly Summary */}
          <BodyBlock>
            <SectionTitle text="Weekly Summary" size="lg" />
            <BodyText>
              Translates meeting time into personal benchmarks and peer
              context — showing positive contribution data rather than
              deficit metrics. The framing shifted from &ldquo;you used
              too much&rdquo; to &ldquo;here&rsquo;s what you saved.&rdquo;
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: 16 }}
          >
            <div
              className="w-full flex justify-center"
              style={{
                backgroundColor: CREAM,
                borderRadius: 20,
                padding: 32,
              }}
            >
              <div
                className="flex flex-wrap justify-center"
                style={{ gap: 48 }}
              >
                {["weekly-1.png", "weekly-2.png", "weekly-3.png"].map(
                  (src) => (
                    <img
                      key={src}
                      src={`/assets/mindful-meet/${src}`}
                      alt="Weekly summary nudge variant"
                      className="block h-auto"
                      style={{ width: 192, maxWidth: "100%" }}
                    />
                  )
                )}
              </div>
            </div>
            <ImageCaption>
              Weekly summary nudge card + three-state motivational message
              variants
            </ImageCaption>
          </div>

          {/* Borrow Budget Pivot */}
          <BodyBlock>
            <SectionTitle
              text="A Pivot Worth Naming: From Borrow Budget to Supportive Nudge"
              size="lg"
            />
            <BodyText>
              An early version let users borrow budget from colleagues. In
              testing, multiple users pushed back. Some said they&rsquo;d
              need to exceed on heavy days but still wanted to see the
              data. One tester put it directly: borrowing limits felt like
              an invasion of their autonomy.
            </BodyText>
            <BodyText>
              We pivoted to a supportive model: when someone exceeds their
              budget, the tool nudges with alternatives — rescheduling,
              shortening, or switching to async. Present but overrideable.
              The user stays in control.
            </BodyText>
          </BodyBlock>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 24 }}
          >
            {[
              { src: "borrow-before.png", label: "Before" },
              { src: "borrow-after.png", label: "After" },
            ].map((item) => (
              <div
                key={item.label}
                className="w-full flex flex-col"
                style={{ gap: 12 }}
              >
                <ImageFrame
                  src={`/assets/mindful-meet/${item.src}`}
                  alt={`Borrow Budget — ${item.label}`}
                  bg={CREAM}
                />
                <p
                  className="w-full text-center"
                  style={{
                    color: NAVY,
                    fontFamily: SOLWAY,
                    fontWeight: 700,
                    fontSize: fs(16),
                    lineHeight: "24px",
                    letterSpacing: "0.5px",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <ImageCaption>
            Borrow Budget: before (restrictive modal) → after (supportive
            rescheduling nudge)
          </ImageCaption>

          {/* Three Video Modes */}
          <BodyBlock>
            <SectionTitle text="Three Video Modes — During Meetings" size="lg" />
            <BodyText>
              Why do we broadcast 4K video for a standup the same way we
              do for a client presentation? Mindful Meet introduces three
              dynamic modes that adapt to meeting intensity:
            </BodyText>
          </BodyBlock>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 24 }}
          >
            {[
              { src: "video-low-res.png", label: "Low-Resolution" },
              { src: "video-light.png", label: "Light On / Off" },
              { src: "video-pixelated.png", label: "Pixelated" },
            ].map((item) => (
              <div
                key={item.label}
                className="w-full flex flex-col"
                style={{ gap: 12 }}
              >
                <ImageFrame
                  src={`/assets/mindful-meet/${item.src}`}
                  alt={`Video mode — ${item.label}`}
                  bg={CREAM}
                />
                <p
                  className="w-full text-center"
                  style={{
                    color: NAVY,
                    fontFamily: SOLWAY,
                    fontWeight: 700,
                    fontSize: fs(16),
                    lineHeight: "24px",
                    letterSpacing: "0.5px",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <ImageCaption>
            Low-resolution, Light On/Off, and Pixelation modes — side by
            side
          </ImageCaption>

          {/* Modes table */}
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
              <span className="w-[140px] md:w-[200px] shrink-0">Mode</span>
              <span className="flex-1" style={{ minWidth: 0 }}>
                How It Works
              </span>
              <span className="w-[120px] md:w-[200px] text-right shrink-0">
                Data Saved
              </span>
            </div>
            {[
              [
                "Low-Resolution",
                "Auto-reduces quality for inactive participants",
                "600× less (12 MB/hr)",
              ],
              [
                "Light On / Off",
                "Dims inactive participants; brightens when speaking",
                "3× less (2,400 MB/hr)",
              ],
              [
                "Pixelation",
                "Reduces video to minimum recognisable form",
                "40× less (180 MB/hr)",
              ],
            ].map(([mode, how, saved]) => (
              <div
                key={mode}
                className="w-full flex items-start"
                style={{ paddingTop: 8, paddingBottom: 8 }}
              >
                <span
                  className="w-[140px] md:w-[200px] shrink-0"
                  style={{ fontWeight: 500 }}
                >
                  {mode}
                </span>
                <span className="flex-1" style={{ minWidth: 0 }}>
                  {how}
                </span>
                <span className="w-[120px] md:w-[200px] text-right shrink-0">
                  {saved}
                </span>
              </div>
            ))}
          </div>

          <div className="cs-section-row" style={{ alignItems: "center" }}>
            <div
              className="w-full md:w-[520px] md:shrink-0 flex flex-col"
              style={{ gap: 16 }}
            >
              <ImageFrame
                src="/assets/mindful-meet/bubble-diagram.png"
                alt="Nested bubble diagram comparing data usage from 7.2 GB to 12 MB"
                bg={CREAM}
                padding={32}
              />
              <ImageCaption>
                Data comparison: nested bubble diagram — 7.2 GB → 2,400
                MB → 180 MB → 12 MB
              </ImageCaption>
            </div>
            <div className="flex-1 min-w-0">
              <BodyBlock>
                <BodyText>
                  A key design challenge here was differentiating these
                  from existing video filters or simple time-tracking
                  features. These aren&rsquo;t cosmetic — they&rsquo;re
                  functional reductions tied to real data savings, and
                  the visual design needed to communicate that
                  distinction clearly.
                </BodyText>
              </BodyBlock>
            </div>
          </div>
        </section>

        {/* Testing & Iteration */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Testing &amp; Iteration" size="lg" />
            <BodyText>
              Four crit sessions and a Feedback Feast shaped the design
              iteratively. Each round had a clear turning point:
            </BodyText>
            <BodyText>
              <strong>Crit 1</strong> → Reframed away from CO₂ guilt
              toward positive scarcity. Early versions made users feel
              blamed — the tone needed to reward reduction, not punish
              usage.
            </BodyText>
            <BodyText>
              <strong>Crit 2</strong> → Added peer benchmarking and
              personalised contribution data. Feedback was blunt:
              &ldquo;it&rsquo;s boring, make it motivating.&rdquo;
              Comparison context made the data feel meaningful.
            </BodyText>
            <BodyText>
              <strong>Crit 3</strong> → Developed the video modes.
              Reviewers challenged us: &ldquo;show how the call itself can
              be different, not just the calendar.&rdquo;
            </BodyText>
            <BodyText>
              Usability testing revealed that when participants saw the
              budget indicators and noticed their remaining time, they
              would actively review their schedule — reconsidering
              meetings that weren&rsquo;t essential or could be moved.
              Some testers overrode the limit; some increased their daily
              cap; others shortened or rescheduled. All three behaviours
              confirmed the design intent: awareness changes decisions,
              even when the constraint is soft.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Exhibition */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <div className="cs-section-row">
            <div
              className="w-full md:w-[480px] md:shrink-0 flex flex-col"
              style={{ gap: 16 }}
            >
              <ImageFrame
                src="/assets/mindful-meet/thngs-con.png"
                alt={'TH/NGS Con: team at the exhibition stand — "Less meeting, more focus" poster'}
                bg={CREAM}
                padding={24}
              />
              <ImageCaption>
                TH/NGS Con: The exhibition stand
              </ImageCaption>
            </div>
            <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 16 }}>
              <BodyBlock>
                <SectionTitle text="Exhibition: TH/NGS Con" size="lg" />
                <BodyText>
                  At TH/NGS Con, design leads from Miro, Clever Franke, and
                  TPXimpact reviewed the work. The strongest feedback
                  centred on reinforcing the positive feeling of reducing
                  hours — not counting down to a limit, but celebrating
                  the space people reclaim. Gamification was suggested as
                  one mechanism, but the deeper insight was about
                  emotional framing: reduction should feel like a reward,
                  not a restriction. This became the clearest next
                  direction for the product.
                </BodyText>
              </BodyBlock>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 20 }}
        >
          <SectionTitle text="Reflection" size="lg" />
          <ReflectionBlock title="What worked">
            The most important design decision was keeping the budget
            soft. Making the constraint defeatable by design — and
            framing feedback through aspiration rather than blame — is
            what made this feel usable instead of invasive. Every expert
            and tester confirmed: guilt kills adoption.
            <br />
            <br />
            Killing the avatar concept on ethical grounds also mattered.
            It&rsquo;s the kind of call that&rsquo;s easy to skip under
            time pressure. We didn&rsquo;t.
          </ReflectionBlock>
          <ReflectionBlock title="What I'd do differently">
            The budget algorithm needs stress-testing against recurring
            meetings — heavy weeks with fixed commitments could make the
            budget feel punishing rather than helpful. Calendar API
            integration also needs more depth to reliably distinguish
            video calls from other calendar events.
          </ReflectionBlock>
          <ReflectionBlock title="What I took forward">
            This wasn&rsquo;t my first fully functional high-fidelity
            prototype built under real time pressure, but it shifted how I
            work. The biggest lesson: visualise ideas faster to fully
            comprehend the details. Seeing the working prototype revealed
            interaction problems that static mockups never would have. I
            now push to build and test earlier in every project — it
            makes me faster and more flexible on design decisions, and
            it&rsquo;s a habit I&rsquo;ve carried into every project
            since.
          </ReflectionBlock>
        </section>
      </div>
    </div>
  );
}
