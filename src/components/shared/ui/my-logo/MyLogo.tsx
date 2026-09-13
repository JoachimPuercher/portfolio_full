"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { scrollToTop } from "@/helpers/scroll";
import LogoSvg from "./LogoSvg";

interface MyLogoProps {
  /** Angular @Input hrefPath (default "/") */
  href?: string;
  /** Angular @Output logoClicked: the hero replays its letter animation */
  onLogoClick?: () => void;
}

/**
 * Angular: shared/components/ui/my-logo.
 * Blue logo that turns yellow on hover and links to the home page.
 * Angular re-navigated to "/" on the same URL (onSameUrlNavigation: 'reload') which
 * scrolled to the top; this is reproduced explicitly when already on the target page.
 */
export default function MyLogo({ href = "/", onLogoClick }: MyLogoProps) {
  const pathname = usePathname();

  return (
    <div
      onClick={() => {
        onLogoClick?.();
        if (pathname === href) scrollToTop();
      }}
    >
      <Link
        href={href}
        aria-label="Joachim Pürcher – Home"
        className="group/logo block h-full w-[60px] mw-850:w-[50px]"
      >
        <LogoSvg
          className="block h-auto w-full"
          pathClassName="fill-main-blue transition-[fill] duration-[225ms] ease-in-out group-hover/logo:fill-main-yellow"
        />
      </Link>
    </div>
  );
}
