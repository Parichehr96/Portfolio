"use client";

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
       (flex-1 h-88 rounded-100 border-2 #EDEAE4) for LinkedIn /
       Instagram / Dribbble / Behance / Medium with 40 × 40 icons
     - "BOOK A TIME SLOT?" CTA (underlined Solway Light 16/28 navy)
   Floating nav: rendered by ScaledShell (Contact active).
============================================================= */

const SOLWAY = "var(--font-solway), serif";

const EMAIL = "parichehr.t96@gmail.com";
const PHONE_DISPLAY = "+31-657248971";
// WhatsApp wants international digits with no `+` or punctuation; Telegram
// accepts the `+` form. Phone number is +31 6 5724 8971.
const WHATSAPP_URL = "https://wa.me/31657248971";
const TELEGRAM_URL = "https://t.me/+31657248971";

type Social = {
  /** Optional href — when omitted the button renders as a non-clickable
   *  visual placeholder (currently used for Instagram per request). */
  href?: string;
  src: string;
  alt: string;
};

const SOCIALS: Social[] = [
  {
    href: "https://www.linkedin.com/in/parichehr-talebzadeh/",
    src: "/assets/icon-social-linkedin.svg",
    alt: "LinkedIn",
  },
  {
    src: "/assets/icon-social-instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://dribbble.com/PariUXD",
    src: "/assets/icon-social-dribbble.svg",
    alt: "Dribbble",
  },
  {
    href: "https://www.behance.net/pariuxd",
    src: "/assets/icon-social-behance.svg",
    alt: "Behance",
  },
  {
    href: "https://medium.com/@pariuxd",
    src: "/assets/icon-social-medium.svg",
    alt: "Medium",
  },
];

function ExternalChevronIcon() {
  return (
    <span className="relative shrink-0 inline-block w-[24px] h-[24px]">
      <img
        src="/assets/icon-link-external.svg"
        alt=""
        className="absolute inset-0 w-full h-full block"
      />
    </span>
  );
}

function SocialPill({ social }: { social: Social }) {
  const baseClass =
    "flex-1 min-w-0 flex items-center justify-center rounded-[100px] border-2 border-solid border-[#EDEAE4] bg-white transition-colors duration-200";
  const interactive = "hover:bg-[#F9F5EB]";
  const inner = (
    <span
      className="relative shrink-0 inline-block"
      style={{ width: 40, height: 40 }}
    >
      <img
        src={social.src}
        alt=""
        className="absolute inset-0 w-full h-full block"
      />
    </span>
  );

  if (!social.href) {
    return (
      <span
        aria-label={social.alt}
        className={baseClass}
        style={{ height: 88, paddingLeft: 2, paddingRight: 2, paddingTop: 12, paddingBottom: 12 }}
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
      style={{ height: 88, paddingLeft: 2, paddingRight: 2, paddingTop: 12, paddingBottom: 12 }}
    >
      {inner}
    </a>
  );
}

export default function Contact() {
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
        {/* Bio Section header */}
        <div
          className="w-full flex flex-col items-start gap-[12px] text-[#1F2753]"
          style={{ letterSpacing: "2px" }}
        >
          <p
            className="w-full"
            style={{ fontSize: 60, lineHeight: "66px" }}
          >
            Have something in mind?
          </p>
          <p
            className="w-full"
            style={{ fontSize: 32, lineHeight: "40px" }}
          >
            Let&rsquo;s talk about it.
          </p>
        </div>

        {/* Bio Container — content left, illustration overlaps right */}
        <div
          className="w-full flex flex-col items-start"
          style={{
            height: 665,
            paddingRight: 634,
            paddingBottom: 160,
            gap: 40,
          }}
        >
          {/* Mail block — clickable mailto: link */}
          <div className="w-full flex flex-col items-start gap-[8px] rounded-[24px]">
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
              className="flex items-center"
            >
              <p
                className="text-[#1F2753] whitespace-nowrap"
                style={{ fontSize: 20, lineHeight: "28px" }}
              >
                {EMAIL}
              </p>
              <ExternalChevronIcon />
            </a>
          </div>

          {/* Phone block + WhatsApp / Telegram chips */}
          <div className="w-full flex items-end gap-[32px] rounded-[24px]">
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
                className="flex items-center"
              >
                <p
                  className="text-[#1F2753] whitespace-nowrap"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                  }}
                >
                  WhatsApp
                </p>
                <ExternalChevronIcon />
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Telegram ${PHONE_DISPLAY}`}
                className="flex items-center"
              >
                <p
                  className="text-[#1F2753] whitespace-nowrap"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                  }}
                >
                  Telegram
                </p>
                <ExternalChevronIcon />
              </a>
            </div>
          </div>

          {/* Social Links Container */}
          <div className="w-full flex flex-col items-start gap-[16px]">
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
              {SOCIALS.map((s) => (
                <SocialPill key={s.alt} social={s} />
              ))}
            </div>
          </div>

          {/* BOOK A TIME SLOT? CTA — no destination yet, render as a span */}
          <p
            className="w-full text-[#1F2753] shrink-0"
            style={{
              fontFamily: SOLWAY,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: "28px",
              textDecoration: "underline",
              textDecorationStyle: "solid",
            }}
          >
            BOOK A TIME SLOT?
          </p>
        </div>
      </div>
    </>
  );
}
