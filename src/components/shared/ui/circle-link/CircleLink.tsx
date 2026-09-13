/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */

interface CircleLinkProps {
  imgPath: string;
  linkHref: string;
  imgAltText: string;
}

/**
 * Angular: shared/components/ui/circle-link.
 * Round social link with a circular blue "ink" fill that grows on hover (clip-path circle).
 */
export default function CircleLink({ imgPath, linkHref, imgAltText }: CircleLinkProps) {
  return (
    <div className="group">
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-10 w-10 overflow-hidden rounded-[100px] border border-solid border-main-white text-main-white"
      >
        <img
          src={imgPath}
          alt={imgAltText}
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute top-1/2 left-1/2 z-[5] h-full w-full -translate-x-1/2 -translate-y-1/2 bg-main-blue transition-all duration-300 ease-in-out [clip-path:circle(10px_at_20px_50px)] group-hover:[clip-path:circle(40px_at_20px_20px)]" />
      </a>
    </div>
  );
}
