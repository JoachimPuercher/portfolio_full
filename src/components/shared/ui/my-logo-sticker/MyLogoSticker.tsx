/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */

interface MyLogoStickerProps {
  stickerImgPath: string;
  logoImgPath: string;
  /** Unique id for the SVG text path (Angular reused "textCircle" twice on one page). */
  textPathId?: string;
}

/**
 * Angular: shared/components/ui/my-logo-sticker.
 * Round sticker with the logo and circular text ("Joachim - Frontend Developer").
 */
export default function MyLogoSticker({ stickerImgPath, logoImgPath, textPathId = "textCircle" }: MyLogoStickerProps) {
  return (
    <div className="relative h-full w-full">
      <img src={stickerImgPath} alt="logo sticker" loading="lazy" className="absolute h-full w-full" />
      <img
        src={logoImgPath}
        alt="my logo"
        loading="lazy"
        className="absolute top-1/2 left-1/2 h-[55%] w-[55%] [transform:translate(-50%,-50%)_rotate(15deg)]"
      />
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-[95%] w-[95%] [transform:translate(-49.5%,-50%)]"
      >
        <defs>
          <path id={textPathId} d="M 80,80 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0" />
        </defs>
        <text fontSize="14" fill="black" fontWeight="600" style={{ fontFamily: "var(--font-bricolage)" }}>
          <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
            Joachim - Frontend Developer - Joachim - Frontend Developer -
          </textPath>
        </text>
      </svg>
    </div>
  );
}
