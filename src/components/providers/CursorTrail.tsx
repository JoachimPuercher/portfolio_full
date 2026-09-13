"use client";

import { useEffect } from "react";

const COLORS = ["rgba(247, 197, 24, 1)", "rgba(51, 85, 255, 1)", "#f87a55"];

/**
 * Mouse trail: a small coloured dot follows the cursor and fades out.
 * Angular: AppComponent @HostListener('document:mousemove'). Same sizes, colours,
 * offsets and timings (50 ms fade start, removed after 300 ms), one dot per frame.
 * Additions: listener cleanup and a prefers-reduced-motion guard.
 */
export default function CursorTrail() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;
    const dots = new Set<HTMLDivElement>();

    const onMouseMove = (event: MouseEvent) => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        const dot = document.createElement("div");
        const size = Math.random() * 2 + 2;

        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.position = "fixed";
        dot.style.borderRadius = "50%";
        dot.style.pointerEvents = "none";
        dot.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;
        dot.style.opacity = "0.8";
        dot.style.transition = "opacity 1.3s, transform 1.3s";
        dot.style.zIndex = "9999";
        dot.style.transform = "translate(15px, 15px)";

        document.body.appendChild(dot);
        dots.add(dot);

        window.setTimeout(() => {
          dot.style.opacity = "0";
          dot.style.transform = "scale(0)";
        }, 50);

        window.setTimeout(() => {
          dot.remove();
          dots.delete(dot);
        }, 300);

        frame = null;
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (frame) cancelAnimationFrame(frame);
      dots.forEach((dot) => dot.remove());
    };
  }, []);

  return null;
}
