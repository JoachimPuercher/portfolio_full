import { LOGO_PATH, LOGO_TRANSFORM, LOGO_VIEWBOX } from "./logo-path";

interface LogoSvgProps {
  className?: string;
  pathClassName?: string;
}

/** The hand-drawn "JP" logo (single path, extracted from the Angular inline SVG). */
export default function LogoSvg({ className, pathClassName }: LogoSvgProps) {
  return (
    <svg
      version="1.1"
      width="1043.1311"
      height="1128.4882"
      viewBox={LOGO_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={LOGO_TRANSFORM}>
        <path className={pathClassName} d={LOGO_PATH} />
      </g>
    </svg>
  );
}
