import Nav from "../_components/Nav";

/* === FIGMA DESIGN TOKENS (MacBook Pro 14" - 5, node 105:414) ===
   Layout:  Two-column section vertically centered in viewport,
            left = stacked Mail / Text cards (each 696×168 with p-40),
            right = Profiles card (696×360 with p-40).
   Cards:   bg #FEFBF5, rounded-40
   Type:    Title/large    22/28  (eyebrow: "Mail me", "Text me", "Stay with me")
            Headline/large 32/40  (detail: email, phone, "Profiles")
   Social:  5 buttons, 105.6×105.6 each, gap-24, rounded-24,
            border #EDEAE4, 48×48 icon centered (last 2 are empty placeholders).
============================================================= */

const ASSETS = {
  linkedin: "/assets/icon-linkedin.svg",
  instagram: "/assets/icon-instagram.svg",
  dribbble: "/assets/icon-dribbble.svg",
};

function ContactCard({ method, detail }: { method: string; detail: string }) {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] w-full h-[168px] flex flex-col items-start justify-center gap-[4px]">
      <p className="w-full text-[22px] leading-[28px] text-[#5A5D70]">
        {method}
      </p>
      <p className="w-full text-[32px] leading-[40px] text-[#1F2753]">
        {detail}
      </p>
    </div>
  );
}

function SocialButton({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="size-[106px] rounded-[24px] border border-solid border-[#EDEAE4] flex items-center justify-center shrink-0">
      {src && (
        <div className="relative size-[48px] shrink-0">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

function ProfilesCard() {
  return (
    <div className="bg-[#FEFBF5] rounded-[40px] p-[40px] flex-1 min-w-0 h-[360px] flex flex-col items-start justify-center gap-[40px]">
      <div className="w-full flex flex-col items-start gap-[12px]">
        <p className="w-full text-[22px] leading-[28px] text-[#5A5D70]">
          Stay with me
        </p>
        <p className="w-full text-[32px] leading-[40px] text-[#1F2753]">
          Profiles
        </p>
      </div>
      <div className="flex items-start gap-[24px] shrink-0">
        <SocialButton src={ASSETS.linkedin} alt="LinkedIn" />
        <SocialButton src={ASSETS.instagram} alt="Instagram" />
        <SocialButton src={ASSETS.dribbble} alt="Dribbble" />
        <SocialButton alt="" />
        <SocialButton alt="" />
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="page-enter w-full min-h-screen flex flex-col bg-[#F9F5EB]">
      <Nav />

      <main className="flex-1 w-full flex items-center justify-center px-[48px] pt-[24px] pb-[24px]">
        <div className="w-full flex items-start gap-[24px]">
          <div className="flex-1 min-w-0 flex flex-col items-start gap-[24px]">
            <ContactCard method="Mail me" detail="parichehr.t96@gmail.com" />
            <ContactCard method="Text me" detail="+31-657248971" />
          </div>
          <ProfilesCard />
        </div>
      </main>
    </div>
  );
}
