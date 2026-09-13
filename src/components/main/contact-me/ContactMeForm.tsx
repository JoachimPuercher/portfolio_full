"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useEffect, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/helpers/cn";
import { scrollToSection } from "@/helpers/scroll";
import { CONTACT_RULES, isContactValid, isFieldValid, trimContact, type ContactField } from "@/helpers/contact-validation";
import type { UserContactInfo } from "@/types/model";
import styles from "./ContactMeForm.module.css";

const EMPTY: UserContactInfo = { name: "", email: "", message: "", privacy: false };
const NO_FLAGS = { name: false, email: false, message: false };
/** Draft survives a language switch (the [locale] segment change remounts the page). */
const DRAFT_KEY = "contactDraft";

interface ContactMeFormProps {
  /** Angular @Output sentSuccess */
  onSuccess: () => void;
  /** Angular @Output sentError */
  onError: () => void;
}

/**
 * Angular: main/contact-me/contact-me-form.
 * Behaviour kept: trim on submit, empty fields switch their placeholder to the red error
 * text, pattern hints below name/email once touched, privacy hint, and the send button
 * looks active only when everything is valid (it is never disabled).
 * Changes: posts to /api/contact (server validation + honeypot), whitespace-only input is
 * rejected, double submits are blocked. The message stays a single-line input as in the
 * design (a growing textarea changed the layout).
 */
export default function ContactMeForm({ onSuccess, onError }: ContactMeFormProps) {
  const t = useTranslations("contactMe");
  const [data, setData] = useState<UserContactInfo>(EMPTY);
  const [touched, setTouched] = useState(NO_FLAGS);
  const [errors, setErrors] = useState({ ...NO_FLAGS, privacy: false });
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);

  // Restore a draft after mount (sessionStorage is client-only, keeps SSR markup identical).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only storage, read after hydration on purpose
      if (raw) setData({ ...EMPTY, ...(JSON.parse(raw) as Partial<UserContactInfo>) });
    } catch {
      /* storage unavailable or corrupt: start empty */
    }
  }, []);

  useEffect(() => {
    try {
      if (data === EMPTY) sessionStorage.removeItem(DRAFT_KEY);
      else sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const update =(field: ContactField, value: string) => setData((d) => ({ ...d, [field]: value }));
  const touch = (field: ContactField) => setTouched((s) => ({ ...s, [field]: true }));
  const placeholder = (field: ContactField) => t(`form.${field}.${errors[field] ? "error" : "placeholder"}`);
  const showPatternHint = (field: "name" | "email") => touched[field] && !isFieldValid(field, data[field]);

  // Angular checkButton(): all fields filled, privacy checked and the form valid.
  const canSend = isContactValid(data);

  const scrollToForm = () => scrollToSection("contact-form", "start");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const trimmed = trimContact(data);
    setData(trimmed);
    setErrors({
      name: trimmed.name === "",
      email: trimmed.email === "",
      message: trimmed.message === "",
      privacy: !trimmed.privacy,
    });
    if (!isContactValid(trimmed)) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, website }),
      });
      if (!res.ok) throw new Error(`Contact request failed (${res.status})`);
      setData(EMPTY);
      setTouched(NO_FLAGS);
      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    } finally {
      setSending(false);
      scrollToForm();
    }
  };

  return (
    <form id="contact-form" onSubmit={onSubmit} noValidate autoComplete="off" className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="name" className="input-label-typo">
          {t("form.name.header")}
          <input
            id="name"
            name="name"
            type="text"
            maxLength={CONTACT_RULES.name.maxLength}
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => touch("name")}
            placeholder={placeholder("name")}
            aria-invalid={showPatternHint("name")}
            className={cn(errors.name && styles.errorRed)}
          />
        </label>
        {showPatternHint("name") && <span className={styles.textError}>{t("form.name.errorMessage")}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="email" className="input-label-typo">
          {t("form.email.header")}
          <input
            id="email"
            name="email"
            type="email"
            maxLength={CONTACT_RULES.email.maxLength}
            required
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => touch("email")}
            placeholder={placeholder("email")}
            aria-invalid={showPatternHint("email")}
            className={cn(errors.email && styles.errorRed)}
          />
        </label>
        {showPatternHint("email") && <span className={styles.textError}>{t("form.email.errorMessage")}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="message" className="input-label-typo">
          {t("form.message.header")}
          <input
            id="message"
            name="message"
            type="text"
            maxLength={CONTACT_RULES.message.maxLength}
            required
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => touch("message")}
            placeholder={placeholder("message")}
            className={cn(errors.message && styles.errorRed)}
          />
        </label>
      </div>

      <div className={styles.checkboxWrapper}>
        <label htmlFor="privacy" />
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          required
          checked={data.privacy}
          onChange={(e) => setData((d) => ({ ...d, privacy: e.target.checked }))}
          aria-labelledby="privacy-text"
        />
        <div id="privacy-text">
          <span className="privacy-checkbox-font">{t("form.privacy.firstPart")}</span>
          <Link href="/data-save" className={cn("privacy-checkbox-font", styles.privacyLink)}>
            {t("form.privacy.privacyPart")}
          </Link>
          <span className="privacy-checkbox-font">{t("form.privacy.lastPart")}</span>
        </div>
      </div>

      <div className={errors.privacy ? styles.errorMessage : styles.noErrorMessage}>{t("form.privacy.placeholder")}</div>

      <div className={styles.sendButtonWrapper}>
        <img
          className="contact-arrow display-hide-over-1250px-width"
          src="/images/contact-me/contact_arrow.png"
          alt="contact arrow"
          loading="lazy"
        />
        <button type="submit" aria-busy={sending} className={cn(styles.sendButton, canSend ? styles.activeButton : styles.inactiveButton)}>
          {t("sendButton")}
        </button>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
    </form>
  );
}
