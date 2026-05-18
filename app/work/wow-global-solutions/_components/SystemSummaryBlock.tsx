import Image from "next/image";
import ScaleToFit from "../../../_components/case-study/ScaleToFit";

/* WOW Figma 313:2880-ish — 908×694 collage of Summary / Image Content /
   Image Details / Guide images on a card-surface backdrop (cream in
   light, navy in dark per Figma 580:5010-5020 — every tile uses the
   same surface token so they read as one material). */

const SURFACE_CARD = "var(--color-surface-card)";

const NATIVE_WIDTH = 908;
const NATIVE_HEIGHT = 694;

const cardCommon: React.CSSProperties = {
  backgroundColor: SURFACE_CARD,
  border: `0.9px solid ${SURFACE_CARD}`,
  borderRadius: 20,
  overflow: "hidden",
};

export default function SystemSummaryBlock() {
  return (
    <ScaleToFit nativeWidth={NATIVE_WIDTH} nativeHeight={NATIVE_HEIGHT}>
      <div
        className="shrink-0 relative overflow-hidden"
        style={{
          width: NATIVE_WIDTH,
          height: NATIVE_HEIGHT,
          borderRadius: 8,
        }}
      >
        <div
          className="absolute flex items-center"
          style={{
            left: "50%",
            top: "calc(50% + 0.5px)",
            transform: "translate(-50%, -50%)",
            gap: 7.2,
            height: 668,
            width: 886,
          }}
        >
          <div
            className="flex flex-col items-start h-full"
            style={{ gap: 9, width: 337 }}
          >
            <div
              className="flex-1 w-full flex items-center justify-center"
              style={cardCommon}
            >
              <Image
                src="/assets/wow/guide-1.png"
                alt=""
                width={261}
                height={263}
                className="object-contain"
                style={{ width: 260.01, height: 263.25 }}
                sizes="260px"
              />
            </div>
            <div
              className="flex-1 w-full flex items-center justify-center"
              style={cardCommon}
            >
              <Image
                src="/assets/wow/guide-2.png"
                alt=""
                width={261}
                height={271}
                className="object-contain"
                style={{ width: 260.82, height: 271.35 }}
                sizes="260px"
              />
            </div>
          </div>
          <div
            className="flex-1 flex flex-col items-center h-full"
            style={{ gap: 7.2 }}
          >
            <div
              className="flex-1 w-full flex items-center justify-center"
              style={cardCommon}
            >
              <Image
                src="/assets/wow/summary.png"
                alt=""
                width={378}
                height={273}
                className="object-contain"
                style={{ width: 378.27, height: 272.97 }}
                sizes="378px"
              />
            </div>
            <div
              className="w-full flex items-start"
              style={{ gap: 7.2, height: 333 }}
            >
              <div
                className="flex-1 h-full flex items-center justify-center"
                style={cardCommon}
              >
                <Image
                  src="/assets/wow/image-content.png"
                  alt=""
                  width={215}
                  height={254}
                  className="object-contain"
                  style={{ width: 215.46, height: 253.53 }}
                  sizes="215px"
                />
              </div>
              <div
                className="flex-1 h-full flex items-center justify-center"
                style={cardCommon}
              >
                <Image
                  src="/assets/wow/image-details.png"
                  alt=""
                  width={190}
                  height={266}
                  className="object-contain"
                  style={{ width: 189.54, height: 265.68 }}
                  sizes="190px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaleToFit>
  );
}
