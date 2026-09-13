"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/helpers/cn";
import MyLogo from "@/components/shared/ui/my-logo/MyLogo";
import MobileHeaderMenu from "../mobile-header-menu/MobileHeaderMenu";

interface MobileHeaderProps {
  onLogoClick?: () => void;
}

/**
 * Angular: shared/components/header/mobile-header (visible <= 850px).
 * Timings: open = showMenu, next frame openMenu; close = openMenu off at once,
 * showMenu off after 510 ms (menu emit delay) + 500 ms (closeOverlay delay).
 */
export default function MobileHeader({ onLogoClick }: MobileHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const timers = useRef<number[]>([]);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const openOverlay = () => {
    setShowMenu(true);
    requestAnimationFrame(() => setOpenMenu(true));
  };

  const closeOverlay = () => {
    // The drawer becomes inert: move focus out of it (without scrolling to the header).
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest("[data-mobile-menu]")) {
      burgerRef.current?.focus({ preventScroll: true });
    }
    setOpenMenu(false);
    timers.current.push(window.setTimeout(() => setShowMenu(false), 1010));
  };

  return (
    <>
      <div className="z-[500] hidden py-4 mw-850:flex mw-850:items-center mw-850:justify-between mw-420:p-2">
        <MyLogo onLogoClick={onLogoClick} />
        <button
          ref={burgerRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={openMenu}
          onClick={openOverlay}
          className="relative flex h-8 w-8 cursor-[inherit] items-center justify-center border-0 bg-transparent p-0"
        >
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              className={cn(showMenu && "fill-main-blue")}
              d="M1.33333 16C0.955556 16 0.638889 15.8722 0.383333 15.6167C0.127778 15.3611 0 15.0444 0 14.6667C0 14.2889 0.127778 13.9722 0.383333 13.7167C0.638889 13.4611 0.955556 13.3333 1.33333 13.3333H22.6667C23.0444 13.3333 23.3611 13.4611 23.6167 13.7167C23.8722 13.9722 24 14.2889 24 14.6667C24 15.0444 23.8722 15.3611 23.6167 15.6167C23.3611 15.8722 23.0444 16 22.6667 16H1.33333ZM1.33333 9.33333C0.955556 9.33333 0.638889 9.20556 0.383333 8.95C0.127778 8.69444 0 8.37778 0 8C0 7.62222 0.127778 7.30556 0.383333 7.05C0.638889 6.79444 0.955556 6.66667 1.33333 6.66667H22.6667C23.0444 6.66667 23.3611 6.79444 23.6167 7.05C23.8722 7.30556 24 7.62222 24 8C24 8.37778 23.8722 8.69444 23.6167 8.95C23.3611 9.20556 23.0444 9.33333 22.6667 9.33333H1.33333ZM1.33333 2.66667C0.955556 2.66667 0.638889 2.53889 0.383333 2.28333C0.127778 2.02778 0 1.71111 0 1.33333C0 0.955556 0.127778 0.638889 0.383333 0.383333C0.638889 0.127778 0.955556 0 1.33333 0H22.6667C23.0444 0 23.3611 0.127778 23.6167 0.383333C23.8722 0.638889 24 0.955556 24 1.33333C24 1.71111 23.8722 2.02778 23.6167 2.28333C23.3611 2.53889 23.0444 2.66667 22.6667 2.66667H1.33333Z"
              fill="#F8F9FA"
            />
          </svg>
          {showMenu && (
            <img
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src="/images/header/while_pressing_1.svg"
              alt=""
            />
          )}
        </button>
      </div>
      <MobileHeaderMenu openMenu={openMenu} onClose={closeOverlay} />
    </>
  );
}
