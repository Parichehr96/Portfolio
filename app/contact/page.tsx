"use client";

import { useIsMobile } from "../_components/useIsMobile";
import { fs } from "../_lib/typography";
import {
  CALENDAR_URL,
  EMAIL,
  PHONE_DISPLAY,
  SOCIALS,
  WHATSAPP_URL,
  type Social,
} from "../_data/contact";

/* === FIGMA DESIGN TOKENS (Contact, node 300:2277) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Outer flex-col gap-80, pt-80 pb-40 px-120 items-center.
   Bio Section header (gap-12, w=1272):
     - "Have something in mind?"  Solway Regular 60/66 tracking-2
     - "Let's talk about it."     Solway Regular 32/40 tracking-2
   Illustration (face crop, mirrors About): 816 × 816 absolute,
     left=calc(50% + 405px) translate-x-(-50%) top=178. Same
     `viewTransitionName: "hero-illustration"` as the other three
     pages → cross-page picture morph.
   Bio Container (h=665, gap-40, pr=634, pb=160, overflow-clip):
     - Mail block: "Mail me" / parichehr.t96@gmail.com + link-external
       icon (mailto:)
     - Text block: phone block (Text me / +31-...) sits next to two
       inline action chips for WhatsApp and Telegram (gap-32)
     - Social Links Container: "Stay with me" + 5 oval pill buttons
       (flex-1 h-88 rounded-100 border-2 #EDEAE4) — each social SVG
       is rendered at its intrinsic viewBox dimensions inside a
       40 × 40 wrapper, so it lands pixel-perfect on the design
       (LinkedIn 35.7 × 34.1, IG/Dribbble 35.7 × 35.7, Behance 40 × 40,
       Medium 33.3 × 29.7).
     - "BOOK A TIME SLOT?" CTA (underlined Solway Light 16/28 navy)
   Floating nav: rendered by ScaledShell (Contact active).
============================================================= */

const SOLWAY = "var(--font-solway), serif";

function ExternalChevronIcon() {
  return (
    <span className="themed-icon relative shrink-0 inline-flex items-center justify-center w-[24px] h-[24px]">
      <img
        src="/assets/icon-link-external.svg"
        alt=""
        width={24}
        height={24}
        className="block"
      />
    </span>
  );
}

/* Secondary-button-style social pill (Figma 516:8115 etc.). Fixed
   86.4 × 76.8 outline pill with a 28.8 × 28.8 themed icon and a 1.92 px
   cream-dark border. Hover applies a single cream wash via the
   shared `--color-cream-hover-overlay` token so it reads cleanly on
   both themes. */
const SOCIAL_PILL_W = 86.4;
const SOCIAL_PILL_H = 76.8;
const SOCIAL_PILL_ICON = 28.8;
const SOCIAL_PILL_BORDER = 1.92;

function SocialPill({ social }: { social: Social }) {
  const baseClass =
    "shrink-0 flex items-center justify-center rounded-[122px] border-solid bg-transparent transition-colors duration-200";
  const interactive =
    "hover:bg-[var(--color-cream-hover-overlay)] cursor-pointer";
  // 28.8 × 28.8 inner wrapper — the source SVGs were authored for a
  // 40 px viewBox so each per-icon `iconWidth/iconHeight` is scaled
  // down by 28.8/40 before being rendered. `themed-icon` swaps the
  // navy artwork to the cream/blue dark-mode variant.
  const inner = (
    <span
      className="themed-icon relative shrink-0 inline-flex items-center justify-center"
      style={{ width: SOCIAL_PILL_ICON, height: SOCIAL_PILL_ICON }}
    >
      <img
        src={social.src}
        alt=""
        width={social.iconWidth * (SOCIAL_PILL_ICON / 40)}
        height={social.iconHeight * (SOCIAL_PILL_ICON / 40)}
        className="block"
        style={
          social.verticalNudge
            ? { transform: `translateY(${social.verticalNudge})` }
            : undefined
        }
      />
    </span>
  );

  const style: React.CSSProperties = {
    width: SOCIAL_PILL_W,
    height: SOCIAL_PILL_H,
    paddingLeft: 28.8,
    paddingRight: 28.8,
    paddingTop: 14.4,
    paddingBottom: 14.4,
    borderWidth: SOCIAL_PILL_BORDER,
    borderColor: "var(--color-border-soft)",
  };

  if (!social.href) {
    return (
      <span aria-label={social.alt} className={baseClass} style={style}>
        {inner}
      </span>
    );
  }

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.alt}
      className={`${baseClass} ${interactive}`}
      style={style}
    >
      {inner}
    </a>
  );
}

function ContactDesktop() {
  return (
    <>
      {/* Illustration (face crop, mirror of About) — same `viewTransitionName`
          as the other three pages so the picture morphs across all four. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "calc(50% + 405px)",
          top: 178,
          width: 816,
          height: 816,
          transform: "translateX(-50%)",
          viewTransitionName: "hero-illustration",
          opacity: "var(--hero-illustration-opacity)",
        }}
      >
        <img
          src="/assets/illustration-contact.png"
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Page layout */}
      <div className="absolute inset-0 flex flex-col items-center pt-[80px] pb-[40px] px-[120px] gap-[80px]">
        {/* Bio Section header — stage 0 + 1 (top-left), with the
            stacked secondary buttons (theme + 1x) on the right per
            Figma 501:3782 / 501:3783. */}
        <div
          className="w-full flex flex-col items-start gap-[12px] text-[var(--color-text-primary)]"
          style={{ letterSpacing: "2px" }}
        >
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: fs(60),
              lineHeight: "66px",
              transformOrigin: "left center",
              ["--stage" as string]: 0,
            }}
          >
            Have something in mind?
          </p>
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: fs(32),
              lineHeight: "40px",
              transformOrigin: "left center",
              ["--stage" as string]: 1,
            }}
          >
            Let&rsquo;s talk about it.
          </p>
        </div>

        {/* Bio Container — stage 2 (mail/phone/social/CTA all bubble in
            together below the title). Illustration on the right is the
            matching layer. */}
        <div
          className="w-full flex flex-col items-start"
          style={{
            height: 665,
            paddingRight: 634,
            paddingBottom: 160,
            gap: 40,
          }}
        >
          {/* Mail block — stage 2. Clickable mailto: link.
              Inline `<span>` (not `<p>`) inside the `<a>` so the cursor
              stays a pointer over the entire row and there are no
              block-level interruptions to click handling. */}
          <div
            className="w-full flex flex-col items-start gap-[8px] rounded-[24px] anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 2,
            }}
          >
            <p
              className="text-[var(--color-text-secondary)] whitespace-nowrap"
              style={{
                fontSize: fs(16),
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
            >
              Mail me
            </p>
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Email ${EMAIL}`}
              className="inline-flex items-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              <span
                className="text-[var(--color-text-primary)] whitespace-nowrap"
                style={{ fontSize: fs(20), lineHeight: "28px" }}
              >
                {EMAIL}
              </span>
              <ExternalChevronIcon />
            </a>
          </div>

          {/* Phone block + WhatsApp chip — stage 3 (Telegram removed
              per Figma 300:2277). */}
          <div
            className="w-full flex items-end gap-[32px] rounded-[24px] anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 3,
            }}
          >
            <div className="shrink-0 flex flex-col items-start gap-[8px] whitespace-nowrap">
              <p
                className="text-[var(--color-text-secondary)]"
                style={{
                  fontSize: fs(16),
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                }}
              >
                Text me
              </p>
              <p
                className="text-[var(--color-text-primary)]"
                style={{ fontSize: fs(20), lineHeight: "28px" }}
              >
                {PHONE_DISPLAY}
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${PHONE_DISPLAY}`}
              className="shrink-0 inline-flex items-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              <span
                className="text-[var(--color-text-primary)] whitespace-nowrap"
                style={{
                  fontSize: fs(16),
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                }}
              >
                WhatsApp
              </span>
              <ExternalChevronIcon />
            </a>
          </div>

          {/* Social Links Container — header stage 4, each pill icon
              sub-stages 4.0..4.4 so they pop one-by-one. */}
          <div
            className="w-full flex flex-col items-start gap-[16px] anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 4,
            }}
          >
            <p
              className="w-full text-[var(--color-text-secondary)]"
              style={{
                fontSize: fs(16),
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
            >
              Stay with me
            </p>
            {/* Fixed-width 72 × 64 secondary buttons (Figma 516:8115)
                in a gap-32 row. Each `<span>` wrapper just carries the
                stage so SocialPill itself doesn't have to know about
                animation timing. */}
            <div className="flex items-start gap-[32px]">
              {SOCIALS.map((s, i) => (
                <span
                  key={s.alt}
                  className="anim-bubbly-grow shrink-0 flex"
                  style={{ ["--stage" as string]: 4 + (i + 1) * 0.3 }}
                >
                  <SocialPill social={s} />
                </span>
              ))}
            </div>
          </div>

          {/* BOOK A TIME SLOT? CTA — stage 7 (last). Opens the Google
              Calendar appointment page in a new tab. */}
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a time slot"
            className="w-full text-[var(--color-text-primary)] shrink-0 block cursor-pointer hover:opacity-70 transition-opacity duration-200 anim-bubbly-grow"
            style={{
              fontFamily: SOLWAY,
              fontWeight: 300,
              fontSize: fs(16),
              lineHeight: "28px",
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              transformOrigin: "left center",
              ["--stage" as string]: 7,
            }}
          >
            BOOK A TIME SLOT?
          </a>
        </div>
      </div>
    </>
  );
}

/* === Mobile (Figma 312:2580) ===
   Stacked layout, no illustration. Mail / phone are inline
   `<email/phone> + ↗` links (matching desktop's mailto/WhatsApp
   chips). Socials are 4 wrapping flex pills (LinkedIn, Dribbble,
   Behance, Medium — Instagram and Telegram removed per latest
   Figma). "BOOK A TIME SLOT?" closes the column.
   Type scales:
     - Title       Solway Regular 32/40 navy
     - Sub         Solway Regular 16/20 navy
     - Field label Solway Regular 14/24 grey-navy
     - Field value Solway Regular 16/24 navy tracking-0.5 (Body/large)
     - CTA         Solway Light 16/28 navy underline */
function MobileSocialPill({ social }: { social: Social }) {
  // Wrapping flex pill matching Figma 312:2693: bg-white,
  // 0.72 px cream-dark border, flex-1 min-w-px so 4 pills share the
  // row width with `gap-x: 16` and wrap to a second row when the
  // viewport gets narrow. Inner icon is 24 × 24, scaled from the
  // SVG's intrinsic 40 × 40 viewBox.
  const baseClass =
    "flex-1 min-w-0 flex items-center justify-center bg-transparent transition-colors duration-200";
  const inner = (
    <span
      className="themed-icon relative shrink-0 inline-flex items-center justify-center"
      style={{ width: 24, height: 24 }}
    >
      <img
        src={social.src}
        alt=""
        width={social.iconWidth * (24 / 40)}
        height={social.iconHeight * (24 / 40)}
        className="block"
        style={
          social.verticalNudge
            ? { transform: `translateY(${social.verticalNudge})` }
            : undefined
        }
      />
    </span>
  );
  const style: React.CSSProperties = {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 122,
    border: "0.72px solid var(--color-border-soft)",
  };
  if (!social.href) {
    return (
      <span aria-label={social.alt} className={baseClass} style={style}>
        {inner}
      </span>
    );
  }
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.alt}
      className={`${baseClass} hover:bg-[var(--color-cream-hover-overlay)]`}
      style={style}
    >
      {inner}
    </a>
  );
}

function ExternalChevronIconSmall() {
  return (
    <span className="themed-icon relative shrink-0 inline-flex items-center justify-center w-[24px] h-[24px]">
      <img
        src="/assets/icon-link-external.svg"
        alt=""
        width={24}
        height={24}
        className="block"
      />
    </span>
  );
}

function ContactMobile() {
  return (
    <div className="absolute inset-0 flex flex-col items-center pt-[64px] pb-[120px] px-[16px] gap-[40px]">
      {/* Title section */}
      <div className="w-full flex flex-col items-start gap-[8px] shrink-0 text-[var(--color-text-primary)]">
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontSize: fs(32),
            lineHeight: "40px",
            transformOrigin: "left center",
            ["--stage" as string]: 0,
          }}
        >
          Have something in mind?
        </p>
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontSize: fs(16),
            lineHeight: "20px",
            transformOrigin: "left center",
            ["--stage" as string]: 1,
          }}
        >
          Let&rsquo;s talk about it.
        </p>
      </div>

      {/* Bio Container */}
      <div className="w-full flex-1 min-h-0 flex flex-col items-center gap-[40px] overflow-hidden">
        {/* Mail block — label + email link with link-external icon
            (Figma 429:3480). */}
        <div
          className="w-full flex flex-col items-start gap-[8px] anim-bubbly-grow"
          style={{
            transformOrigin: "left top",
            ["--stage" as string]: 2,
          }}
        >
          <p
            className="w-full text-[var(--color-text-secondary)] whitespace-nowrap"
            style={{
              fontSize: fs(14),
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            Mail me
          </p>
          <a
            href={`mailto:${EMAIL}`}
            aria-label={`Email ${EMAIL}`}
            className="inline-flex items-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
          >
            <span
              className="text-[var(--color-text-primary)] whitespace-nowrap"
              style={{
                fontSize: fs(16),
                lineHeight: "24px",
                letterSpacing: "0.5px",
              }}
            >
              {EMAIL}
            </span>
            <ExternalChevronIconSmall />
          </a>
        </div>

        {/* Phone block — label + number on the left, WhatsApp chip on
            the right (Figma 429:3486; Telegram removed). */}
        <div
          className="w-full flex items-end gap-[32px] anim-bubbly-grow"
          style={{
            transformOrigin: "left top",
            ["--stage" as string]: 3,
          }}
        >
          <div className="shrink-0 flex flex-col items-start gap-[8px] whitespace-nowrap">
            <p
              className="text-[var(--color-text-secondary)]"
              style={{
                fontSize: fs(14),
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
            >
              Text me
            </p>
            <p
              className="text-[var(--color-text-primary)]"
              style={{
                fontSize: fs(16),
                lineHeight: "24px",
                letterSpacing: "0.5px",
              }}
            >
              {PHONE_DISPLAY}
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${PHONE_DISPLAY}`}
            className="shrink-0 inline-flex items-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
          >
            <span
              className="text-[var(--color-text-primary)] whitespace-nowrap"
              style={{
                fontSize: fs(16),
                lineHeight: "24px",
                letterSpacing: "0.5px",
              }}
            >
              WhatsApp
            </span>
            <ExternalChevronIconSmall />
          </a>
        </div>

        {/* Social Links — 4 wrapping pills (Figma 312:2692) */}
        <div
          className="w-full flex flex-col items-start gap-[16px] anim-bubbly-grow"
          style={{
            transformOrigin: "left top",
            ["--stage" as string]: 4,
          }}
        >
          <p
            className="w-full text-[var(--color-text-secondary)]"
            style={{
              fontSize: fs(14),
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            Stay with me
          </p>
          <div
            className="w-full flex flex-wrap items-start"
            style={{ rowGap: 24, columnGap: 16 }}
          >
            {SOCIALS.map((s, i) => (
              <span
                key={s.alt}
                className="anim-bubbly-grow flex-1 min-w-0 flex"
                style={{ ["--stage" as string]: 4 + (i + 1) * 0.3 }}
              >
                <MobileSocialPill social={s} />
              </span>
            ))}
          </div>
        </div>

        {/* BOOK A TIME SLOT? */}
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a time slot"
          className="w-full text-[var(--color-text-primary)] cursor-pointer hover:opacity-70 transition-opacity duration-200 anim-bubbly-grow"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 300,
            fontSize: fs(16),
            lineHeight: "28px",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            transformOrigin: "left center",
            ["--stage" as string]: 7,
          }}
        >
          BOOK A TIME SLOT?
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  const isMobile = useIsMobile();
  return isMobile ? <ContactMobile /> : <ContactDesktop />;
}
