import { cn } from "@/helpers/cn";
import styles from "./HeroSection.module.css";

export type LetterAnimation = "upper" | "lower" | null;

interface LetterStackProps {
  letter: string;
  /** Animation class for the visible (third) layer */
  animations: LetterAnimation[];
  onEnter: () => void;
  onLeave?: () => void;
}

/**
 * One hero letter as a three-layer stack (Angular hero-section template):
 * 1. transparent copy that reserves the glyph width,
 * 2. yellow copy underneath (revealed when layer 3 flies away),
 * 3. visible white copy, animated on hover / intro.
 * When both animations apply, "lower" wins (it comes later in the stylesheet, as in Angular).
 */
export default function LetterStack({ letter, animations, onEnter, onLeave }: LetterStackProps) {
  return (
    <span className={styles.letterHoverWrapper} onMouseLeave={onLeave}>
      <span className={cn(styles.singleLetter, styles.hoverLetterFirst)}>{letter}</span>
      <span className={cn(styles.singleLetter, styles.hoverLetterSecond)}>{letter}</span>
      <span
        className={cn(
          styles.singleLetter,
          styles.hoverLetterThird,
          animations.includes("upper") && styles.upperAnimate,
          animations.includes("lower") && styles.lowerAnimate,
        )}
        onMouseEnter={onEnter}
      >
        {letter}
      </span>
    </span>
  );
}
