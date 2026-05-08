import Image from "next/image";

/* WOW Figma 313:2794 — stakeholder-led cycle diagram. Rendered from a
   single Figma export; container hugs its native aspect ratio so it
   scales naturally inside any parent (full-width on phones, capped at
   680 on desktop). */

const NATIVE_WIDTH = 680;
const NATIVE_HEIGHT = 530;

export default function StakeholderDiagram() {
  return (
    <div
      className="relative shrink-0 overflow-hidden w-full"
      style={{
        maxWidth: NATIVE_WIDTH,
        aspectRatio: `${NATIVE_WIDTH} / ${NATIVE_HEIGHT}`,
      }}
    >
      <Image
        src="/assets/wow/stakeholder-cycle.png"
        alt="Stakeholder-led cycle vs user-centred cycle diagram"
        fill
        sizes="(max-width: 767px) 100vw, 680px"
        className="object-contain pointer-events-none"
      />
    </div>
  );
}
