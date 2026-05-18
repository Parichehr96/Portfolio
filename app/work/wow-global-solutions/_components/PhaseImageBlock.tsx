import Image from "next/image";
import ScaleToFit from "../../../_components/case-study/ScaleToFit";
import { font } from "../../../_lib/tokens";
import { fs } from "../../../_lib/typography";

/* WOW Figma 313:2841 — 908×800 card container with two-column
   nested navy panels (Style Guide tab + Guides image left, two
   Component images stacked right). The outer card uses the
   theme-aware --color-surface-card token so the panel reads cream
   on light and navy on dark per Figma 580:4977 without per-theme
   forks here.

   Composition is absolute-positioned at native pixel coordinates;
   ScaleToFit lets it render at native size on desktop and scale down
   gracefully on narrower viewports without rebuilding the layout. */

// Outer card surface flips cream-light → navy via the theme token
// per Figma 580:4977. Inner navy / navy-dark panels are decorative
// imagery framing — they stay the same in both themes (Figma keeps
// them at the same navy values on dark) so the design reads as a
// single material with the imagery as the only differentiation.
const SURFACE_CARD = "var(--color-surface-card)";
const PANEL = "var(--color-navy)";
const PANEL_DARK = "var(--color-navy-dark)";
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
          backgroundColor: SURFACE_CARD,
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
                  backgroundColor: PANEL_DARK,
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
                  fontSize: fs(32),
                  lineHeight: "40px",
                }}
              >
                <span style={{ color: PANEL_DARK }}>Style </span>
                <span style={{ color: "#FFFFFF" }}>Guid</span>
              </p>
            </div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ backgroundColor: PANEL, borderRadius: 20, width: 345 }}
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
              style={{ backgroundColor: PANEL, borderRadius: 20, width: 491 }}
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
                backgroundColor: PANEL,
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
