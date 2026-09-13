"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { cn } from "@/helpers/cn";
import { SOCIAL_LINKS } from "@/data/social-links";
import MyLogo from "@/components/shared/ui/my-logo/MyLogo";
import CircleLink from "@/components/shared/ui/circle-link/CircleLink";
import LangSwitch from "@/components/shared/ui/lang-switch/LangSwitch";
import HeaderLinks from "../header-links/HeaderLinks";

interface MobileHeaderMenuProps {
  openMenu: boolean;
  /** Angular @Output closeMobileMenu */
  onClose: () => void;
}

/**
 * Angular: shared/components/header/mobile-header-menu.
 * Full-width drawer that slides down from above (translateY(-100dvh) -> 0, 0.4 s).
 * Always in the DOM like in Angular; `inert` keeps it out of the tab order while closed.
 */
export default function MobileHeaderMenu({ openMenu, onClose }: MobileHeaderMenuProps) {
  return (
    <div
      data-mobile-menu
      inert={!openMenu}
      className={cn(
        "absolute top-0 right-0 left-0 z-[800] h-[85dvh] bg-[url('/images/hero-section/hero-bg.webp')] bg-cover bg-bottom transition-transform duration-[400ms] ease-in-out",
        openMenu ? "translate-y-0" : "-translate-y-[100dvh]",
      )}
    >
      <div className="flex h-[85%] flex-col items-center justify-between">
        <div className="flex w-full items-center justify-between py-4 pr-[26px] pl-4">
          <div className="relative flex items-center justify-center">
            <MyLogo />
          </div>
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex cursor-[inherit] items-center border-0 bg-transparent p-0"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  className={cn(!openMenu && "fill-main-blue")}
                  d="M9.00104 10.8677L2.46771 17.401C2.22326 17.6455 1.91215 17.7677 1.53438 17.7677C1.1566 17.7677 0.845486 17.6455 0.601042 17.401C0.356597 17.1566 0.234375 16.8455 0.234375 16.4677C0.234375 16.0899 0.356597 15.7788 0.601042 15.5344L7.13438 9.00104L0.601042 2.46771C0.356597 2.22326 0.234375 1.91215 0.234375 1.53438C0.234375 1.1566 0.356597 0.845486 0.601042 0.601042C0.845486 0.356597 1.1566 0.234375 1.53438 0.234375C1.91215 0.234375 2.22326 0.356597 2.46771 0.601042L9.00104 7.13438L15.5344 0.601042C15.7788 0.356597 16.0899 0.234375 16.4677 0.234375C16.8455 0.234375 17.1566 0.356597 17.401 0.601042C17.6455 0.845486 17.7677 1.1566 17.7677 1.53438C17.7677 1.91215 17.6455 2.22326 17.401 2.46771L10.8677 9.00104L17.401 15.5344C17.6455 15.7788 17.7677 16.0899 17.7677 16.4677C17.7677 16.8455 17.6455 17.1566 17.401 17.401C17.1566 17.6455 16.8455 17.7677 16.4677 17.7677C16.0899 17.7677 15.7788 17.6455 15.5344 17.401L9.00104 10.8677Z"
                  fill="#F8F9FA"
                />
              </svg>
              {!openMenu && <img src="/images/header/while_pressing_2.svg" alt="" />}
            </button>
          </div>
        </div>

        <div className="flex h-[60%] flex-col items-center justify-between">
          <HeaderLinks onCloseMobileMenu={onClose} className="flex h-[80%] flex-col items-center justify-between" />
          <LangSwitch textColor="#F8F9FA" />
        </div>

        <div className="flex items-center justify-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <div key={link.name} onClick={onClose}>
              <CircleLink linkHref={link.linkHref} imgPath={link.imgPath} imgAltText={link.imgAltText} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
