"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import styles from "./SkillSet.module.css";

const STICKERS = {
  en: ["/images/skills/sticker_close.png", "/images/skills/sticker_middle.png", "/images/skills/sticker-open-new-en.png"],
  de: ["/images/skills/peel_de_one.png", "/images/skills/sticker_middle.png", "/images/skills/sticker-open-new-de.png"],
} as const;

/**
 * Angular: SkillSetComponent openSticker()/closeSticker().
 * Click peels the sticker (frame 1, then frame 2 after 200 ms).
 * Mouse leave closes it again (frame 1 after 1500 ms, frame 0 after 1700 ms).
 */
export default function PeelSticker() {
  const locale = useLocale();
  const [activeSticker, setActiveSticker] = useState<0 | 1 | 2>(0);
  const stickerOpen = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const openSticker = () => {
    if (stickerOpen.current) return;
    setActiveSticker(1);
    later(() => {
      setActiveSticker(2);
      stickerOpen.current = true;
    }, 200);
  };

  const closeSticker = () => {
    if (!stickerOpen.current) return;
    later(() => setActiveSticker(1), 1500);
    later(() => {
      setActiveSticker(0);
      stickerOpen.current = false;
    }, 1700);
  };

  const paths = locale === "de" ? STICKERS.de : STICKERS.en;

  return (
    <div className={styles.outer}>
      <img onClick={openSticker} onMouseLeave={closeSticker} src={paths[activeSticker]} alt="peel of sticker" />
    </div>
  );
}
