"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

/**
 * AOS registers window listeners it can never remove. A language switch remounts the
 * whole [locale] layout, so initialise only once per page load.
 */
let aosStarted = false;

/**
 * Scroll animations. Angular: AppComponent.ngAfterViewInit -> AOS.init({ duration: 1000, once: false }).
 * Addition: disabled for users who prefer reduced motion (globals.css then shows all
 * [data-aos] elements, also on pages reached by client navigation).
 */
export default function AosProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (aosStarted) return;
    aosStarted = true;
    AOS.init({
      duration: 1000,
      once: false,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  // Client-side navigation swaps the DOM; re-scan for [data-aos] elements.
  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}
