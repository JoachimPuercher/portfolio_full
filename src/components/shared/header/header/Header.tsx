"use client";

import MyLogo from "@/components/shared/ui/my-logo/MyLogo";
import LangSwitch from "@/components/shared/ui/lang-switch/LangSwitch";
import HeaderLinks, { type LinkColor } from "../header-links/HeaderLinks";
import MobileHeader from "../mobile-header/MobileHeader";

interface HeaderProps {
  linkColor?: LinkColor[];
  /** Angular @Input langSwitchTxtColor (default "" = no inline colour) */
  langSwitchTextColor?: string;
  /** Angular @Output logoClicked */
  onLogoClick?: () => void;
}

/**
 * Angular: shared/components/header/header.
 * Desktop bar (> 850px): logo | section links | language switch. Mobile header below 850px.
 */
export default function Header({ linkColor = [], langSwitchTextColor = "", onLogoClick }: HeaderProps) {
  return (
    <header>
      <div className="max-content-width flex h-20 items-center justify-between pr-[5px] text-white mw-850:hidden from-850:mh-400:h-[50px]">
        <div>
          <MyLogo onLogoClick={onLogoClick} />
        </div>
        <div className="flex w-full items-center justify-center">
          <HeaderLinks linkColor={linkColor} className="flex w-[80%] items-center justify-between" />
        </div>
        <div>
          <LangSwitch textColor={langSwitchTextColor} />
        </div>
      </div>
      <MobileHeader onLogoClick={onLogoClick} />
    </header>
  );
}
