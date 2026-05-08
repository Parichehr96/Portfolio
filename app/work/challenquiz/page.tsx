import CaseStudyHeader from "../../_components/CaseStudyHeader";
import {
  BodyBlock,
  BodyText,
  ImageCaption,
  ImageFrame,
  ReflectionBlock,
  SectionTitle,
} from "../../_components/case-study/CaseStudyBody";
import ResearchDiagram from "./_research-diagram";

/* Challenquiz case study (Figma 313:3079).
   Header is the shared CaseStudyHeader; body sections below are
   specific to Challenquiz. Three CTAs: Get in touch (primary, →
   /contact), Telegram Channel, Figma File. */

const SOLWAY = "var(--font-solway), serif";
const NAVY = "#1F2753";
const CREAM = "#F9F5EB";

const TELEGRAM_URL = "https://t.me/Challenquiz";
const FIGMA_FILE_URL =
  "https://www.figma.com/design/6grX5EnZZJWMbaoVGQW4Gc/CHALLENQUIZ?node-id=1-4&t=lW9GZwwbKeTvGYma-1";

/* ---------- Page ---------- */

export default function ChallenquizCaseStudy() {
  return (
    <div className="bg-white relative w-full">
      <CaseStudyHeader
        title="Challenquiz"
        subtitle="Redesigning a Gamified Quiz App on Telegram"
        detailItems={[
          {
            label: "Role",
            value:
              "Product Designer — UX flows, UI, information architecture, in-game experience",
          },
          {
            label: "Timeline",
            value: "6 months · December 2023 – May 2024",
          },
          {
            label: "Team",
            value: "2 designers (myself and Niloufar Davoudi)",
          },
          { label: "Client", value: "Pome group (Finish studio)" },
          { label: "Tools", value: "Figma" },
          {
            label: "Status",
            value: "Redesign partially shipped · Project no longer active",
          },
        ]}
        heroImageSrc="/assets/challenquiz/section-multiples.png"
        heroImageAlt="Challenquiz redesigned mobile experience"
        ctas={[
          {
            href: "/contact",
            iconSrc: "/assets/challenquiz/icon-cta-chat.svg",
            label: "Get in touch",
            variant: "primary",
            internal: true,
            uppercase: true,
          },
          {
            href: TELEGRAM_URL,
            iconSrc: "/assets/challenquiz/icon-cta-telegram.svg",
            label: "Telegram Channel",
            variant: "secondary",
          },
          {
            href: FIGMA_FILE_URL,
            iconSrc: "/assets/challenquiz/icon-cta-figma.svg",
            label: "Figma File",
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
              text="The Problem: Users Couldn't Figure Out How to Play"
              size="xl"
            />
            <BodyText>
              Challenquiz is a gamified quiz app built on Telegram where
              users compete in real-time trivia challenges, earn tokens,
              and climb leaderboards. The concept was engaging — but the
              existing product was losing users at the most critical
              moments: starting a game and finding what they wanted to do.
            </BodyText>
            <BodyText>
              The legacy version had a cluttered layout, no onboarding
              explanation, and — most critically — a game initiation flow
              that silently failed users at the moment they were most
              motivated to play. People were dropping off before ever
              experiencing what made the app interesting.
            </BodyText>
            <BodyText>
              My teammate and I were brought on to redesign the entire
              experience: navigation, onboarding, in-game interface,
              profiles, and the wallet and leaderboard systems.
            </BodyText>
          </BodyBlock>
          <div className="w-full flex flex-col items-center" style={{ gap: 16 }}>
            <ImageFrame
              src="/assets/challenquiz/section-comparison-generic.png"
              alt="Old system list-based menu vs. new structured tab navigation"
              bg={CREAM}
            />
            <ImageCaption>
              Old system: list-based menu, no visual hierarchy vs. New
              system: structured tab navigation
            </ImageCaption>
          </div>
        </section>

        {/* Research */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Research: Where Users Were Getting Lost" size="lg" />
            <BodyText>
              We tested the original app version with eight real users,
              observing their journeys and noting where they struggled.
              We also gathered additional insights through a marketing
              agent who spoke with community members for direct feedback.
            </BodyText>
            <BodyText>
              The findings were consistent. Three problems stood out:
            </BodyText>
            <BodyText>
              <strong>1. Game initiation was invisible.</strong> This was
              the biggest issue. After selecting a quiz, users needed to
              wait for other participants to join — but nothing on the
              screen explained this. Once enough players joined, the user
              then had to tap a small &ldquo;Start&rdquo; button — which
              they had no reason to expect would appear. People exited
              before they ever played a game, assuming the app was broken
              or the feature didn&rsquo;t work.
            </BodyText>
            <BodyText>
              <strong>
                2. Users didn&rsquo;t understand what happens during or
                after a game.
              </strong>{" "}
              The flow from joining a quiz to seeing results had no visual
              feedback, no progress indication, and no clear state
              changes. Users felt lost throughout the experience.
            </BodyText>
            <BodyText>
              <strong>3. Core features were buried.</strong> The old menu
              was a simple vertical list (Play, Leaderboard, Transactions,
              Games, Wallet). Users couldn&rsquo;t find features like
              sharing or their game history. There was no sense of what
              the app offered without scrolling and tapping into each
              section.
            </BodyText>
          </BodyBlock>
          <div className="w-full flex flex-col items-start" style={{ gap: 16 }}>
            <ResearchDiagram />
            <ImageCaption>
              User journey map: drop-off points highlighted at game
              selection and initiation
            </ImageCaption>
          </div>
        </section>

        {/* Competitor Analysis — text left + images stacked right (Figma
            layout 353:2806). Two image-only exports avoid the duplicated
            text the previous full-section screenshot included. */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <div className="cs-section-row">
            <BodyBlock>
              <SectionTitle text="Competitor Analysis" size="lg" />
              <BodyText>
                We studied existing quiz and gamification apps — including
                QuizBot and tap-to-earn games popular in the Telegram
                ecosystem — to understand navigation patterns and engagement
                mechanics.
              </BodyText>
              <BodyText>Two key takeaways shaped our direction:</BodyText>
              <BodyText>
                Most successful gamification apps keep all core features
                visible on a single screen or within a persistent navigation
                bar — sometimes with as many as seven tabs. Immediate access
                matters. Users need to see what they can do without digging.
              </BodyText>
              <BodyText>
                Colour coding and high-contrast visual feedback are powerful
                engagement tools in gamified contexts. The legacy
                Challenquiz used minimal colour differentiation, which made
                state changes (correct answer, wrong answer, time running
                out) feel unclear and unrewarding.
              </BodyText>
            </BodyBlock>
            <div
              className="shrink-0 flex flex-col w-full md:w-[645px]"
              style={{ gap: 12 }}
            >
              <img
                src="/assets/challenquiz/competitor-quizbot.png"
                alt="QuizBot — a Telegram-native quiz app reference"
                className="block w-full h-auto"
                style={{ borderRadius: 12 }}
              />
              <img
                src="/assets/challenquiz/competitor-hamster.png"
                alt="Tap-to-earn hamster game UI reference"
                className="block w-full h-auto"
                style={{ borderRadius: 12 }}
              />
            </div>
          </div>
          <ImageCaption>
            Competitor reference: navigation patterns and colour usage in
            gamified apps
          </ImageCaption>
        </section>

        {/* Key Design Decisions header */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 24 }}
        >
          <SectionTitle text="Key Design Decisions" size="xl" />
        </section>

        {/* 1. Navigation */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="1. Navigation: From Hidden List to Persistent Tab Bar"
              size="lg"
            />
            <BodyText>
              The old system used a stacked text menu — users tapped into
              a list to access Play, Leaderboard, Transactions, Games, or
              Wallet. Nothing was visible at a glance, and features like
              sharing were effectively invisible.
            </BodyText>
            <BodyText>
              We restructured the navigation into a bottom tab bar with
              four primary sections: Profile, Challenges, Wallet, and
              Leaderboard. This was driven directly by the competitor
              analysis: gamification apps succeed when users can see all
              their options without thinking.
            </BodyText>
            <BodyText>
              We considered a single-page layout that surfaces everything
              at once — common in apps built around a central character
              or tamagotchi-style mechanic — but Challenquiz didn&rsquo;t
              have that focal point. The tab bar gave us the best balance
              between immediate access and grouping related features.
            </BodyText>
          </BodyBlock>
          <div className="w-full flex flex-col items-center" style={{ gap: 16 }}>
            <ImageFrame
              src="/assets/challenquiz/section-nav-comparison.png"
              alt="Before: vertical list menu vs. After: bottom tab bar with grouped features"
              bg={CREAM}
            />
            <ImageCaption>
              Before: vertical list menu → After: bottom tab bar with
              grouped features
            </ImageCaption>
          </div>
        </section>

        {/* 2. Game Initiation Flow */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="2. Fixing the Game Initiation Flow" size="lg" />
            <BodyText>
              This was the most impactful change. The old flow worked
              like this: user selects a quiz → lands on a screen →
              nothing visibly happens → other players join silently →
              user must tap &ldquo;Start&rdquo; without being prompted.
              Most users never reached the game.
            </BodyText>
            <BodyText>
              We redesigned it to make every state visible and every
              action clear:
            </BodyText>
            <BodyText>
              The challenge card now shows how many players have joined
              out of the required total (e.g., &ldquo;6/10
              players&rdquo;). Users can see the lobby filling up in real
              time. The &ldquo;Join&rdquo; button is prominent and
              colour-coded so the next action is unambiguous, and once
              the lobby is full the &ldquo;Start&rdquo; button surfaces
              automatically with an explanatory note.
            </BodyText>
            <BodyText>
              The goal was simple: at no point should a user wonder
              &ldquo;what&rsquo;s happening?&rdquo; or &ldquo;what do I
              do next?&rdquo;
            </BodyText>
          </BodyBlock>
          <div className="w-full flex flex-col items-center" style={{ gap: 16 }}>
            <ImageFrame
              src="/assets/challenquiz/section-game-flow-comparison.png"
              alt="Game initiation: old silent flow vs. new flow with player count, join state, and active feedback"
              bg={CREAM}
            />
            <ImageCaption>
              Game initiation: old silent flow vs. new flow with player
              count, join state, and active feedback
            </ImageCaption>
          </div>
        </section>

        {/* 3. Onboarding */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="3. Onboarding: From Data Collection to Orientation"
              size="lg"
            />
            <BodyText>
              The old app had no splash screen and no explanation of how
              the app worked. Onboarding consisted entirely of asking for
              user information and moving on. Users entered the app
              without understanding what it did or how to start.
            </BodyText>
            <BodyText>
              We designed an onboarding flow that introduced the core
              concepts — how to join a challenge, what happens during a
              game, how scoring works, and what tokens are for — using
              the new colour system and visual storytelling instead of
              walls of text.
            </BodyText>
          </BodyBlock>
          <div className="w-full flex flex-col items-center" style={{ gap: 16 }}>
            <ImageFrame
              src="/assets/challenquiz/section-onboarding-comparison.png"
              alt="Old onboarding form fields vs. new illustrated step-through"
              bg={CREAM}
            />
            <ImageCaption>
              Old onboarding: form fields only → New onboarding:
              illustrated step-through with app explanation
            </ImageCaption>
          </div>
        </section>

        {/* 4. In-Game Experience */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle
              text="4. In-Game Experience: Colour as Communication"
              size="lg"
            />
            <BodyText>
              We redesigned the entire in-game interface. The quiz
              gameplay now uses colour-coded answer cards — each
              player&rsquo;s selection is visible in real time with
              distinct colour states for correct, incorrect, selected,
              and timed-out answers.
            </BodyText>
            <BodyText>
              The old version gave users little to no feedback during
              gameplay. The new version ensures that every second of the
              quiz feels active and informative.
            </BodyText>
          </BodyBlock>
          <div className="w-full flex flex-col items-center" style={{ gap: 16 }}>
            <ImageFrame
              src="/assets/challenquiz/section-ingame-comparison.png"
              alt="In-game: old static question layout vs. new colour-coded real-time interface"
              bg={CREAM}
            />
            <ImageCaption>
              In-game: old static question layout vs. new colour-coded
              real-time interface
            </ImageCaption>
          </div>
        </section>

        {/* 5. Profile */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="5. Profile and Personalisation" size="lg" />
            <BodyText>
              The legacy app had no profile section. Users couldn&rsquo;t
              track their quiz history, see their performance trends, or
              set personal goals.
            </BodyText>
            <BodyText>
              We introduced a dedicated profile with game history, score
              tracking, avatar customisation, language preferences, and
              notification settings. This gave users a reason to return
              beyond just playing — they could now see their progression
              and personalise their experience.
            </BodyText>
          </BodyBlock>
          <div className="w-full flex flex-col items-center" style={{ gap: 16 }}>
            <ImageFrame
              src="/assets/challenquiz/section-profile-comparison.png"
              alt="Profile section: game history, scoreboard, avatar, preferences"
              bg={CREAM}
            />
            <ImageCaption>
              Profile section: game history, scoreboard, avatar,
              preferences
            </ImageCaption>
          </div>
        </section>

        {/* Growth */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 40 }}
        >
          <BodyBlock>
            <SectionTitle text="Growth During the Redesign Period" size="lg" />
            <BodyText>
              During the period the redesign was being rolled out (March
              to September 2024), the platform showed significant growth:
            </BodyText>
          </BodyBlock>
          <div
            className="w-full flex flex-col px-[20px] py-[24px] md:px-[40px] md:py-[32px]"
            style={{
              backgroundColor: CREAM,
              borderRadius: 20,
              gap: 12,
              fontFamily: SOLWAY,
              color: NAVY,
              fontSize: 16,
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
                March 2024
              </span>
              <span className="w-[80px] md:w-[200px] text-right shrink-0">
                September 2024
              </span>
            </div>
            {[
              ["Total Users", "5,615", "11,444"],
              ["Connected Wallets", "681", "1,836"],
              ["Users with 1+ Finished Game", "535", "1,451"],
              ["Finished Games", "1,835", "5,275"],
              ["Referrals", "194", "1,268"],
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
            I want to be honest about attribution: these numbers reflect
            overall platform growth during a period when marketing
            campaigns were also active. I can&rsquo;t isolate the design
            impact from other factors. What I can say is that retention
            and game completion rates moved in the right direction
            alongside the rollout, and we received fewer support
            messages about &ldquo;the app being broken&rdquo; — which had
            been a constant problem before.
          </BodyText>
        </section>

        {/* Project Status */}
        <section className="w-full flex flex-col items-start">
          <BodyBlock>
            <SectionTitle text="What Happened to the Project" size="lg" />
            <BodyText>
              The project was not funded long-term and didn&rsquo;t
              survive beyond the initial period. The work I did here led
              directly to my role on ONTON — the same stakeholder brought
              me on to a larger product based on what we built here.
            </BodyText>
          </BodyBlock>
        </section>

        {/* Reflection */}
        <section
          className="w-full flex flex-col items-start"
          style={{ gap: 20 }}
        >
          <SectionTitle text="Reflection" size="lg" />
          <ReflectionBlock title="What I'm most confident about">
            The navigation restructure and the game initiation redesign
            were the right calls. They addressed the two clearest user
            problems — not knowing what the app offers, and not being
            able to start playing — with straightforward, evidence-based
            solutions. Sometimes the most impactful design work
            isn&rsquo;t innovative; it&rsquo;s making the obvious thing
            actually work.
          </ReflectionBlock>
          <ReflectionBlock title="What I'd do differently">
            <span style={{ display: "block", marginBottom: 24 }}>
              I&rsquo;d push for a clearer business model from the start.
              The product had real user engagement but no sustainable
              revenue path, which is ultimately why it didn&rsquo;t
              survive. As a designer, I&rsquo;ve learned to ask harder
              questions about business viability early — not because
              it&rsquo;s my responsibility alone, but because designing
              features for a product that can&rsquo;t sustain itself is
              time I&rsquo;d rather spend differently.
            </span>
            I&rsquo;d also build in more structured measurement. We could
            see the growth data, but we didn&rsquo;t have proper
            before/after metrics on specific flows (like drop-off rates
            at game initiation) that would have let us quantify the
            design impact precisely.
          </ReflectionBlock>
          <ReflectionBlock title="What I took forward">
            This project sharpened my ability to diagnose invisible UX
            failures — problems that don&rsquo;t look like bugs but
            silently drive users away. The game initiation issue
            wasn&rsquo;t a technical error; it was a communication
            failure. The app worked correctly; it just never told users
            what was happening. That distinction — between something
            being broken and something being unexplained — is one I now
            look for in every product I touch.
          </ReflectionBlock>
        </section>
      </div>
    </div>
  );
}
