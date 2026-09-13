"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TICK_MS = 350;
const SHOW_ALL_MS = 500;
const SESSION_KEY = "firstAnimation";
/** Set by LangSwitch: a language switch remounts the page, Angular never replayed the intro then. */
export const SKIP_INTRO_KEY = "skipHeroIntro";

/**
 * Hero letter state and intro wave (Angular HeroSectionComponent).
 *
 * The wave walks the "Frontend" letters left to right while walking the
 * "Developer"/"Entwickler" letters right to left, one step every 350 ms, then
 * flashes all letters for 500 ms. Angular hard-coded the start indexes per language
 * (en: -2 / 8, de: -3 / 9); they are derived from the letter counts here, which gives
 * the same values.
 *
 * First visit in a session: runs after window "load". Later visits (session flag set):
 * runs right away. Skipped for prefers-reduced-motion.
 */
export function useHeroIntroAnimation(frontLength: number, devLength: number) {
  const [fLetterHovered, setFLetterHovered] = useState(false);
  const [frontLetterHovered, setFrontLetterHovered] = useState<number | null>(null);
  const [devLetterHovered, setDevLetterHovered] = useState<number | null>(null);
  const [showAllLetters, setShowAllLetters] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const startAnimation = useCallback(() => {
    setShowAllLetters(true);
    timeoutsRef.current.push(window.setTimeout(() => setShowAllLetters(false), SHOW_ALL_MS));
  }, []);

  const callAnimation = useCallback(() => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    let firstIndex = frontLength - devLength;
    let secondIndex = devLength - 1;

    intervalRef.current = window.setInterval(() => {
      setFLetterHovered(firstIndex === -1);

      if (firstIndex < frontLength + 1) {
        setFrontLetterHovered(firstIndex);
        setDevLetterHovered(secondIndex);
        firstIndex++;
        secondIndex--;
      } else {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setFrontLetterHovered(null);
        setDevLetterHovered(null);
        startAnimation();
      }
    }, TICK_MS);
  }, [frontLength, devLength, startAnimation]);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    const cleanup = () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      timeouts.forEach((id) => window.clearTimeout(id));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return cleanup;

    if (sessionStorage.getItem(SKIP_INTRO_KEY)) {
      sessionStorage.removeItem(SKIP_INTRO_KEY);
      return cleanup;
    }

    if (sessionStorage.getItem(SESSION_KEY)) {
      callAnimation();
      return cleanup;
    }

    const onLoad = () => {
      callAnimation();
      sessionStorage.setItem(SESSION_KEY, "true");
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      cleanup();
    };
    // Run once per mount, like ngAfterViewInit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    fLetterHovered,
    setFLetterHovered,
    frontLetterHovered,
    setFrontLetterHovered,
    devLetterHovered,
    setDevLetterHovered,
    showAllLetters,
    startAnimation,
  };
}
