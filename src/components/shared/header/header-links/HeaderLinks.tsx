"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/helpers/cn";
import { scrollToSection, SECTION_IDS, type SectionId } from "@/helpers/scroll";

export type LinkColor = "black" | "white";

interface HeaderLinksProps {
  /** Angular @Input linkColor: per link "black" -> #0E1013, anything else -> #F8F9FA */
  linkColor?: LinkColor[];
  /** Angular @Output closeMobileMenu (emitted 500 ms after a click) */
  onCloseMobileMenu?: () => void;
  className?: string;
}

const LINKS: { key: "aboutme" | "skills" | "projects" | "contact"; section: SectionId; img: string }[] = [
  { key: "aboutme", section: SECTION_IDS.aboutMe, img: "/images/header/1.png" },
  { key: "skills", section: SECTION_IDS.skills, img: "/images/header/2.png" },
  { key: "projects", section: SECTION_IDS.projects, img: "/images/header/3.png" },
  { key: "contact", section: SECTION_IDS.contact, img: "/images/header/4.png" },
];

/**
 * Angular: shared/components/header/header-links.
 * Four section links with a hand-drawn underline that wipes in on hover (desktop)
 * and for 500 ms after a click. Angular used <nav> elements with (click) handlers;
 * these are real links now (crawlable), with the same click behaviour.
 */
export default function HeaderLinks({ linkColor = [], onCloseMobileMenu, className }: HeaderLinksProps) {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [clickedLinkIndex, setClickedLinkIndex] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const getLinkColor = (pos: number) => (linkColor[pos] === "black" ? "#0E1013" : "#F8F9FA");

  const navigateToSection = (section: SectionId) => {
    const go = () => {
      if (pathname === "/") {
        // Same fragment again: replace instead of stacking history entries (Angular router).
        if (window.location.hash === `#${section}`) window.history.replaceState(null, "", `#${section}`);
        else window.history.pushState(null, "", `#${section}`);
        scrollToSection(section);
      } else {
        router.push(`/#${section}`);
      }
    };
    // Mobile: wait for the menu to close first (Angular: window.innerWidth <= 850).
    if (window.innerWidth <= 850) later(go, 500);
    else go();
  };

  const goToSection = (event: MouseEvent, index: number, section: SectionId) => {
    // Let modified / middle clicks open the section in a new tab.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setClickedLinkIndex(index);
    later(() => setClickedLinkIndex(null), 500);
    later(() => onCloseMobileMenu?.(), 500);
    navigateToSection(section);
  };

  return (
    <nav aria-label="Main" className={className}>
      {LINKS.map((link, i) => {
        const isSkills = i === 1;
        const isContact = i === 3;
        return (
          <div key={link.key} className="hover:cursor-portfolio-hover">
            <Link
              href={`/#${link.section}`}
              onClick={(e) => goToSection(e, i, link.section)}
              className="group relative flex items-center justify-center"
            >
              <div className="font-bricolage text-[18px] font-bold" style={{ color: getLinkColor(i) }}>
                {t(link.key)}
              </div>
              <img
                src={link.img}
                alt=""
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 transition-[clip-path] duration-300 ease-in-out",
                  isContact ? "w-[125px] -translate-y-[20%]" : "w-[120px] -translate-y-1/2",
                  // Angular .de-underline / .en-underline (width !important, height 40px)
                  isSkills && (locale === "de" ? "h-10 w-[160px]" : "h-10 w-[100px]"),
                  clickedLinkIndex === i
                    ? "[clip-path:inset(0_0_0_0)]"
                    : "[clip-path:inset(0_160px_0_0)] from-850:group-hover:[clip-path:inset(0_0_0_0)]",
                )}
              />
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
