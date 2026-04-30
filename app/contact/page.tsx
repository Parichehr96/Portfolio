"use client";

/* === FIGMA DESIGN TOKENS (Contact, node 300:2277) ===
   Rendered inside ScaledShell (which handles the 1512 × 982 scale).
   Outer flex-col gap-80, pt-80 pb-40 px-120 items-center.
   Bio Section header (gap-12, w=1272):
     - "Have something in mind?"  Solway Regular 60/66 tracking-2
     - "Let's talk about it."     Solway Regular 32/40 tracking-2
   Illustration (face crop, mirror of About): 816×816 absolute,
     left=calc(50% + 371px) translate-x-(-50%) top=178. Same
     `viewTransitionName: "hero-illustration"` as the home + about +
     work pages → browser morphs the picture across all four pages.
   Bio Container (h=665, gap-40, pr=634, pb=160, overflow-clip):
     - Mail me / email             — Space Grotesk 16/24 + 32/40
     - Text me (WhatsApp, Telegram) / phone — same
     - Stay with me + 5 social icon buttons (105.6 × 105.6, 1.2 px
       border #EDEAE4, rounded 28.8, 48 × 48 icon centered)
     - "BOOK A TIME SLOT?" CTA underlined Solway Light 16/28 navy
   Floating nav: rendered by ScaledShell (Contact active).
============================================================= */

const SPACE_GROTESK = "var(--font-space-grotesk), sans-serif";

type Social = { src: string; alt: string };

const SOCIALS: Social[] = [
  { src: "/assets/icon-social-linkedin.svg", alt: "LinkedIn" },
  { src: "/assets/icon-social-instagram.svg", alt: "Instagram" },
  { src: "/assets/icon-social-dribbble.svg", alt: "Dribbble" },
  { src: "/assets/icon-social-behance.svg", alt: "Behance" },
  { src: "/assets/icon-social-medium.svg", alt: "Medium" },
];

function ContactInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-[12px] rounded-[24px] whitespace-nowrap">
      <p
        className="text-[#5A5D70]"
        style={{
          fontFamily: SPACE_GROTESK,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "0.15px",
        }}
      >
        {label}
      </p>
      <p
        className="text-[#1F2753]"
        style={{
          fontFamily: SPACE_GROTESK,
          fontWeight: 400,
          fontSize: 32,
          lineHeight: "40px",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function SocialButton({ src, alt }: Social) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: 105.6,
        height: 105.6,
        border: "1.2px solid #EDEAE4",
        borderRadius: 28.8,
        padding: 28.8,
      }}
    >
      <span className="relative shrink-0 inline-block" style={{ width: 48, height: 48 }}>
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full block"
        />
      </span>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      {/* Illustration (face crop) — mirror of About; positioned to the right.
          Same `viewTransitionName` as the other three pages so the picture
          smoothly morphs into and out of this corner during navigation. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "calc(50% + 371px)",
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
        {/* Bio Section header — gap-12 between the two greeting lines */}
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

        {/* Bio Container — content occupies the LEFT side; pr-634 reserves
            the right area where the absolute illustration overlaps. */}
        <div
          className="w-full flex flex-col items-start"
          style={{
            height: 665,
            paddingRight: 634,
            paddingBottom: 160,
            gap: 40,
          }}
        >
          <ContactInfo label="Mail me" value="parichehr.t96@gmail.com" />
          <ContactInfo
            label="Text me (WhatsApp, Telegram)"
            value="+31-657248971"
          />

          {/* Social Links Container */}
          <div className="w-full flex flex-col items-start gap-[16px]">
            <div className="w-full flex items-end justify-end">
              <div className="flex-1 min-w-0 flex flex-col items-start gap-[12px]">
                <p
                  className="w-full text-[#5A5D70]"
                  style={{
                    fontFamily: SPACE_GROTESK,
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                  }}
                >
                  Stay with me
                </p>
              </div>
            </div>
            <div className="flex items-start gap-[24px]">
              {SOCIALS.map((s) => (
                <SocialButton key={s.alt} src={s.src} alt={s.alt} />
              ))}
            </div>
          </div>

          {/* BOOK A TIME SLOT? CTA — no destination yet, render as a span */}
          <p
            className="w-full text-[#1F2753] shrink-0"
            style={{
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
