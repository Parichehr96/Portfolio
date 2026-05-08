import Image from "next/image";
import ScaleToFit from "../../../_components/case-study/ScaleToFit";
import { color } from "../../../_lib/tokens";

/* WOW Figma 333:3440 — designed at the desktop body width (1272 wide,
   800 tall). Three request-flow images positioned in a top-row +
   bottom-center layout. The bottom of image 3 is intentionally clipped
   by the container's overflow:hidden. */

const CREAM_LIGHTER = color.creamLight;

const NATIVE_WIDTH = 1272;
const NATIVE_HEIGHT = 800;

export default function RequestImagesBlock() {
  return (
    <ScaleToFit nativeWidth={NATIVE_WIDTH} nativeHeight={NATIVE_HEIGHT}>
      <div
        className="relative overflow-hidden"
        style={{
          width: NATIVE_WIDTH,
          height: NATIVE_HEIGHT,
          backgroundColor: CREAM_LIGHTER,
          borderRadius: 20,
        }}
      >
        <Image
          src="/assets/wow/request-1.png"
          alt=""
          width={644}
          height={432}
          className="absolute object-cover"
          style={{ left: -14, top: 0.5, width: 644, height: 432 }}
          sizes="644px"
        />
        <Image
          src="/assets/wow/request-2.png"
          alt=""
          width={610}
          height={432}
          className="absolute object-cover"
          style={{ left: 652, top: 0.5, width: 610, height: 432 }}
          sizes="610px"
        />
        <Image
          src="/assets/wow/request-3.png"
          alt=""
          width={970}
          height={456}
          className="absolute object-cover"
          style={{ left: 151, top: 449.5, width: 970, height: 456 }}
          sizes="970px"
        />
      </div>
    </ScaleToFit>
  );
}
