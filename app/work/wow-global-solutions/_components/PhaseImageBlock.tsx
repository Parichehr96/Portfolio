import Image from "next/image";
import ScaleToFit from "../../../_components/case-study/ScaleToFit";
import { color, font } from "../../../_lib/tokens";

/* WOW Figma 313:2841 — 908×800 cream-lighter container with two-column
   nested navy panels (Style Guide tab + Guides image left, two
   Component images stacked right).

   Composition is absolute-positioned at native pixel coordinates;
   ScaleToFit lets it render at native size on desktop and scale down
   gracefully on narrower viewports without rebuilding the layout. */

const NAVY = color.navy;
const NAVY_DARK = color.navyDark;
const CREAM_LIGHTER = color.creamLight;
const SOLWAY = font.solway;

const NATIVE_WIDTH = 908;
const NATIVE_HEIGHT = 800;

export default function PhaseImageBlock() {
  return (
    <ScaleToFit nativeWidth={NATIVE_WIDTH} nativeHeight={NATIVE_HEIGHT}>
      <div
        className="shrink-0 relative overflow-hidden"
        style={{
          width: NATIVE_WIDTH,
          height: NATIVE_HEIGHT,
          backgroundColor: CREAM_LIGHTER,
          borderRadius: 8,
        }}
      >
        <div
          className="absolute flex items-end"
          style={{ left: 32, top: 29.5, gap: 8, height: 742, width: 844 }}
        >
          <div
            className="flex flex-col items-center h-full"
            style={{ gap: 16 }}
          >
            <div
              className="relative"
              style={{ height: 96, width: 345 }}
              aria-hidden
            >
              <div
                className="absolute"
                style={{
                  left: 181,
                  top: 0,
                  width: 164,
                  height: 96,
                  backgroundColor: NAVY_DARK,
                  borderRadius: 20,
                }}
              />
              <p
                className="absolute"
                style={{
                  left: 97,
                  top: 28,
                  width: 204,
                  fontFamily: SOLWAY,
                  fontSize: 32,
                  lineHeight: "40px",
                }}
              >
                <span style={{ color: NAVY_DARK }}>Style </span>
                <span style={{ color: "#FFFFFF" }}>Guid</span>
              </p>
            </div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ backgroundColor: NAVY, borderRadius: 20, width: 345 }}
            >
              <Image
                src="/assets/wow/guides.png"
                alt=""
                width={151}
                height={538}
                className="block object-contain"
                sizes="151px"
              />
            </div>
          </div>
          <div className="flex flex-col items-center h-full" style={{ gap: 8 }}>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ backgroundColor: NAVY, borderRadius: 20, width: 491 }}
            >
              <Image
                src="/assets/wow/component-1.png"
                alt=""
                width={340}
                height={182}
                className="block object-contain"
                sizes="340px"
              />
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                backgroundColor: NAVY,
                borderRadius: 20,
                width: 491,
                height: 430,
              }}
            >
              <Image
                src="/assets/wow/component-2.png"
                alt=""
                width={461}
                height={350}
                className="block object-contain"
                sizes="461px"
              />
            </div>
          </div>
        </div>
      </div>
    </ScaleToFit>
  );
}
