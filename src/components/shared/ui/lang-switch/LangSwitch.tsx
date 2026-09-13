"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/helpers/cn";
import { SKIP_INTRO_KEY } from "@/components/main/hero-section/useHeroIntroAnimation";

interface LangSwitchProps {
  /**
   * Angular @Input langSwitchTxtColor. Applied as inline color and therefore overrides
   * the selected (red) / not-selected (white) colours, exactly like Angular's [ngStyle].
   * Empty string or undefined = no inline colour.
   */
  textColor?: string;
}

/**
 * Angular: shared/components/ui/lang-switch.
 * Angular switched the language in place (ngx-translate + localStorage).
 * Now the locale is part of the URL: the current page is replaced by the same path
 * in the other locale, without scrolling (next-intl sets the NEXT_LOCALE cookie).
 */
export default function LangSwitch({ textColor }: LangSwitchProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const changeLang = (next: Locale) => {
    if (next === locale) return;
    // The locale segment change remounts the page; don't replay the hero intro for it.
    if (pathname === "/") {
      try {
        sessionStorage.setItem(SKIP_INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    router.replace(`${pathname}${window.location.hash}`, { locale: next, scroll: false });
  };

  const renderOption = (lang: Locale, label: string) => {
    const selected = locale === lang;
    return (
      <div className="group relative">
        <span
          role="button"
          tabIndex={selected ? -1 : 0}
          aria-pressed={selected}
          lang={lang}
          onClick={() => changeLang(lang)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              changeLang(lang);
            }
          }}
          style={textColor ? { color: textColor } : undefined}
          className={cn(
            "relative z-10 font-bricolage text-[16px] font-semibold hover:cursor-portfolio-hover",
            selected ? "pointer-events-none text-main-red" : "text-white",
          )}
        >
          {label}
        </span>
        <img
          src="/images/header/Toggle.png"
          alt=""
          className={cn(
            "absolute top-1/2 left-1/2 z-[5] w-[28px] -translate-x-1/2 -translate-y-1/2 [clip-path:inset(0_30px_30px_0)]",
            !selected &&
              "group-hover:transition-[clip-path] group-hover:duration-200 group-hover:ease-in-out group-hover:[clip-path:inset(0_0_0_0)]",
          )}
        />
      </div>
    );
  };

  return (
    <div className="flex h-8 items-center justify-between gap-2">
      {renderOption("en", "EN")}
      <div className="relative h-2 w-8 rounded-[4px] border border-solid border-main-white bg-main-red">
        <div
          className={cn(
            "absolute top-1/2 left-1/2 h-4 w-4 rounded-[12px] border border-solid border-main-white bg-main-blue transition-transform duration-300 ease-in-out",
            locale === "en" ? "[transform:translate(-20px,-50%)]" : "[transform:translate(4px,-50%)]",
          )}
        />
      </div>
      {renderOption("de", "DE")}
    </div>
  );
}
