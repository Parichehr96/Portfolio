"use client";

import { useIsMobile } from "../_components/useIsMobile";
import {
  CALENDAR_URL,
  EMAIL,
  PHONE_DISPLAY,
  SOCIALS,
  TELEGRAM_URL,
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
    <span className="relative shrink-0 inline-flex items-center justify-center w-[24px] h-[24px]">
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

function SocialPill({ social }: { social: Social }) {
  const baseClass =
    "flex-1 min-w-0 flex items-center justify-center rounded-[100px] border-2 border-solid border-[#EDEAE4] bg-white transition-colors duration-200";
  const interactive = "hover:bg-[#F9F5EB]";
  // 40 × 40 inner wrapper, with the SVG rendered at its intrinsic
  // viewBox size and centered. Result matches Figma's nested-inset
  // composition pixel-for-pixel without hand-tuned per-icon CSS.
  const inner = (
    <span
      className="relative shrink-0 inline-flex items-center justify-center"
      style={{ width: 40, height: 40 }}
    >
      <img
        src={social.src}
        alt=""
        width={social.iconWidth}
        height={social.iconHeight}
        className="block"
      />
    </span>
  );

  if (!social.href) {
    return (
      <span
        aria-label={social.alt}
        className={baseClass}
        style={{
          height: 88,
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
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
      style={{
        height: 88,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 12,
        paddingBottom: 12,
      }}
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
        {/* Bio Section header — stage 0 + 1 (top-left) */}
        <div
          className="w-full flex flex-col items-start gap-[12px] text-[#1F2753]"
          style={{ letterSpacing: "2px" }}
        >
          <p
            className="w-full anim-bubbly-grow"
            style={{
              fontSize: 60,
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
              fontSize: 32,
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
              className="text-[#5A5D70] whitespace-nowrap"
              style={{
                fontSize: 16,
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
                className="text-[#1F2753] whitespace-nowrap"
                style={{ fontSize: 20, lineHeight: "28px" }}
              >
                {EMAIL}
              </span>
              <ExternalChevronIcon />
            </a>
          </div>

          {/* Phone block + WhatsApp / Telegram chips — stage 3 */}
          <div
            className="w-full flex items-end gap-[32px] rounded-[24px] anim-bubbly-grow"
            style={{
              transformOrigin: "left top",
              ["--stage" as string]: 3,
            }}
          >
            <div className="shrink-0 flex flex-col items-start gap-[8px] whitespace-nowrap">
              <p
                className="text-[#5A5D70]"
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                }}
              >
                Text me
              </p>
              <p
                className="text-[#1F2753]"
                style={{ fontSize: 20, lineHeight: "28px" }}
              >
                {PHONE_DISPLAY}
              </p>
            </div>
            <div className="shrink-0 flex items-start gap-[32px]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${PHONE_DISPLAY}`}
                className="inline-flex items-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
              >
                <span
                  className="text-[#1F2753] whitespace-nowrap"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                  }}
                >
                  WhatsApp
                </span>
                <ExternalChevronIcon />
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Telegram ${PHONE_DISPLAY}`}
                className="inline-flex items-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
              >
                <span
                  className="text-[#1F2753] whitespace-nowrap"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                  }}
                >
                  Telegram
                </span>
                <ExternalChevronIcon />
              </a>
            </div>
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
              className="w-full text-[#5A5D70]"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
            >
              Stay with me
            </p>
            <div className="w-full flex items-start gap-[32px]">
              {SOCIALS.map((s, i) => (
                <span
                  key={s.alt}
                  className="anim-bubbly-grow flex-1 flex"
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
            className="w-full text-[#1F2753] shrink-0 block cursor-pointer hover:opacity-70 transition-opacity duration-200 anim-bubbly-grow"
            style={{
              fontFamily: SOLWAY,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: "28px",
              textDecoration: "underline",
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
   Stacked layout, no illustration. Mail block, phone block, social
   pills (62 × 62 each, wrap to 2 rows on narrow viewports), then
   "BOOK A TIME SLOT?" as a single underline link.
   Type scales:
     - Title       Solway Regular 32/40 navy
     - Sub         Solway Regular 16/20 navy
     - Field label Solway Regular 14/24 grey-navy
     - Field value Solway Regular 18/28 navy
     - CTA         Solway Light 16/28 navy underline */
function MobileSocialPill({ social }: { social: Social }) {
  const baseClass =
    "shrink-0 flex items-center justify-center bg-white border-[#EDEAE4] border border-solid transition-colors duration-200";
  const inner = (
    <span
      className="relative shrink-0 inline-flex items-center justify-center"
      style={{ width: 24, height: 24 }}
    >
      <img
        src={social.src}
        alt=""
        width={social.iconWidth * (24 / 40)}
        height={social.iconHeight * (24 / 40)}
        className="block"
      />
    </span>
  );
  const sizeStyle = {
    width: 62,
    height: 62,
    borderRadius: 17.28,
    padding: 17.28,
  } as const;
  if (!social.href) {
    return (
      <span aria-label={social.alt} className={baseClass} style={sizeStyle}>
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
      className={`${baseClass} hover:bg-[#F9F5EB]`}
      style={sizeStyle}
    >
      {inner}
    </a>
  );
}

function ContactMobile() {
  return (
    <div className="absolute inset-0 flex flex-col items-center pt-[64px] pb-[120px] px-[16px] gap-[40px]">
      {/* Title section */}
      <div className="w-full flex flex-col items-start gap-[8px] shrink-0 text-[#1F2753]">
        <p
          className="w-full anim-bubbly-grow"
          style={{
            fontSize: 32,
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
            fontSize: 16,
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
        {/* Mail block */}
        <div
          className="w-full flex flex-col items-start gap-[4px] anim-bubbly-grow"
          style={{
            transformOrigin: "left top",
            ["--stage" as string]: 2,
          }}
        >
          <p
            className="w-full text-[#5A5D70]"
            style={{
              fontSize: 14,
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            Mail me
          </p>
          <a
            href={`mailto:${EMAIL}`}
            aria-label={`Email ${EMAIL}`}
            className="w-full text-[#1F2753] hover:opacity-70 transition-opacity duration-200"
            style={{
              fontSize: 18,
              lineHeight: "28px",
            }}
          >
            {EMAIL}
          </a>
        </div>

        {/* Phone block */}
        <div
          className="w-full flex flex-col items-start gap-[4px] anim-bubbly-grow"
          style={{
            transformOrigin: "left top",
            ["--stage" as string]: 3,
          }}
        >
          <p
            className="w-full text-[#5A5D70]"
            style={{
              fontSize: 14,
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            Text me (WhatsApp, Telegram)
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${PHONE_DISPLAY}`}
            className="w-full text-[#1F2753] hover:opacity-70 transition-opacity duration-200"
            style={{
              fontSize: 18,
              lineHeight: "28px",
            }}
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Social Links */}
        <div
          className="w-full flex flex-col items-start gap-[16px] anim-bubbly-grow"
          style={{
            transformOrigin: "left top",
            ["--stage" as string]: 4,
          }}
        >
          <p
            className="w-full text-[#5A5D70]"
            style={{
              fontSize: 14,
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            Stay with me
          </p>
          <div
            className="w-full flex flex-wrap items-start"
            style={{ rowGap: 12, columnGap: 12 }}
          >
            {SOCIALS.map((s, i) => (
              <span
                key={s.alt}
                className="anim-bubbly-grow"
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
          className="w-full text-[#1F2753] cursor-pointer hover:opacity-70 transition-opacity duration-200 anim-bubbly-grow"
          style={{
            fontFamily: SOLWAY,
            fontWeight: 300,
            fontSize: 16,
            lineHeight: "28px",
            textDecoration: "underline",
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
