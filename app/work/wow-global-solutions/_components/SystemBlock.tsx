import Image from "next/image";
import ScaleToFit from "../../../_components/case-study/ScaleToFit";

/* WOW Figma 313:2855 — designed at the desktop body width (~1272 wide,
   800 tall) with a 3-column collage of system images. Two columns are
   on dark navy backgrounds. Outer surface flips with theme via
   --color-surface-card (cream in light, navy in dark per Figma
   580:4991). The two inner navy-dark image holders stay at
   --color-navy-dark in both themes so they remain visually distinct
   from the surface in light, and slightly darker than the surface
   in dark. */

const SURFACE_CARD = "var(--color-surface-card)";
const PANEL_DARK = "var(--color-navy-dark)";

const NATIVE_WIDTH = 1272;
const NATIVE_HEIGHT = 800;

export default function SystemBlock() {
  return (
    <ScaleToFit nativeWidth={NATIVE_WIDTH} nativeHeight={NATIVE_HEIGHT}>
      <div
        className="relative overflow-hidden"
        style={{
          width: NATIVE_WIDTH,
          height: NATIVE_HEIGHT,
          backgroundColor: SURFACE_CARD,
          borderRadius: 20,
        }}
      >
        <div
          className="absolute flex items-center"
          style={{ left: 76, top: 29.5, gap: 2, height: 742 }}
        >
          <div
            className="overflow-hidden relative"
            style={{ borderRadius: 8, width: 473, height: "100%" }}
          >
            <Image
              src="/assets/wow/system.png"
              alt=""
              fill
              sizes="473px"
              className="object-cover"
            />
          </div>
          <div
            className="flex flex-col items-start h-full"
            style={{ gap: 2, width: 342.5 }}
          >
            <div
              className="flex-1 flex items-start w-full overflow-hidden relative"
              style={{ backgroundColor: PANEL_DARK, borderRadius: 8 }}
            >
              <Image
                src="/assets/wow/system-details-1.png"
                alt=""
                width={342}
                height={380}
                className="block w-full object-contain"
                sizes="342px"
                style={{ height: 380 }}
              />
            </div>
            <div
              className="flex-1 w-full overflow-hidden relative"
              style={{ borderRadius: 8 }}
            >
              <Image
                src="/assets/wow/system-details-2.png"
                alt=""
                fill
                sizes="342px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-start h-full" style={{ gap: 2 }}>
            <div
              className="flex-1 flex items-start overflow-hidden relative"
              style={{
                backgroundColor: PANEL_DARK,
                borderRadius: 8,
                width: 300,
              }}
            >
              <Image
                src="/assets/wow/system-guide-1.png"
                alt=""
                width={300}
                height={375}
                className="block w-full object-contain"
                sizes="300px"
                style={{ height: 375 }}
              />
            </div>
            <div
              className="flex-1 overflow-hidden relative"
              style={{ borderRadius: 8, width: 300 }}
            >
              <Image
                src="/assets/wow/system-guide-2.png"
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </ScaleToFit>
  );
}
