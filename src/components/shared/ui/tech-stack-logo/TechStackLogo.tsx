/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import type { TechLogo } from "@/types/model";

/**
 * Angular: shared/components/ui/tech-stack-logo.
 * The transition is only declared on hover (as in the SCSS), so un-hovering snaps back.
 * `self-start`: in Angular the grid item was the <app-tech-stack-logo> host and this div
 * sat at the top of it; without the host, the div would stretch and centre its content.
 */
export default function TechStackLogo({ imgPath, imgAltText, name }: TechLogo) {
  return (
    <div className="group flex flex-col items-center justify-center gap-1 self-start">
      <img
        src={imgPath}
        alt={imgAltText}
        loading="lazy"
        className="h-[72px] w-[72px] grayscale-[0.8] group-hover:scale-[0.85] group-hover:grayscale-0 group-hover:transition-all group-hover:duration-100 group-hover:ease-in touch:grayscale-0"
      />
      <span className="text-center font-bricolage text-[18px] font-normal">{name}</span>
    </div>
  );
}
