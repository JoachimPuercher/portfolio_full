import type { UserContactInfo } from "@/types/model";

/**
 * Contact form rules, shared by the client form and the API route.
 * Same patterns and max lengths as the Angular template (contact-me-form.component.html).
 * Angular's pattern validator anchors string patterns with ^...$ and skips empty values.
 */
export const CONTACT_RULES = {
  name: { maxLength: 50, pattern: /^[a-zA-ZäöüÄÖÜß0-9\-'\s]+$/ },
  email: { maxLength: 254, pattern: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/ },
  message: { maxLength: 300, pattern: /^[a-zA-ZäöüÄÖÜß0-9\-'\s.,!?;:]+$/ },
} as const;

export type ContactField = keyof typeof CONTACT_RULES;

/** Valid = required + max length + pattern (Angular: required, maxlength, pattern). */
export function isFieldValid(field: ContactField, value: string): boolean {
  const rule = CONTACT_RULES[field];
  return value.length > 0 && value.length <= rule.maxLength && rule.pattern.test(value);
}

export function trimContact(data: UserContactInfo): UserContactInfo {
  return { name: data.name.trim(), email: data.email.trim(), message: data.message.trim(), privacy: data.privacy };
}

export function isContactValid(data: UserContactInfo): boolean {
  return (
    isFieldValid("name", data.name) &&
    isFieldValid("email", data.email) &&
    isFieldValid("message", data.message) &&
    data.privacy === true
  );
}
