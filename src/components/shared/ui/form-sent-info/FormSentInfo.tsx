"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { BUTTON_VARIANTS } from "@/helpers/class-maps";
import styles from "./FormSentInfo.module.css";

interface FormSentInfoProps {
  sentSuccess: boolean;
  showHand: boolean;
  onClose: () => void;
}

/**
 * Angular: shared/components/ui/form-sent-info.
 * Result card after submitting the contact form (success or error), with a waving hand.
 */
export default function FormSentInfo({ sentSuccess, showHand, onClose }: FormSentInfoProps) {
  const t = useTranslations("contactMe.sentMessage");
  const state = sentSuccess ? "resolve" : "error";
  const textClass = cn("section-text-typo", !sentSuccess && styles.errorText);

  return (
    <section className={styles.overlay} role="status" aria-live="polite">
      <span className={textClass}>{t(`headerText.${state}`)}</span>
      <span className={textClass}>{t(`mainText.${state}`)}</span>
      <div>
        <button type="button" onClick={onClose} className={BUTTON_VARIANTS.light}>
          {t("buttonText")}
        </button>
        <div className={styles.rollOutWrapper}>
          <img
            className={cn(showHand && styles.animateHand)}
            src="/images/contact-me/waving_hand.svg"
            alt="waving hand icon"
          />
        </div>
      </div>
    </section>
  );
}
