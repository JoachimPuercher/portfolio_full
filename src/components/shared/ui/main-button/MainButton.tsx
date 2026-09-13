import type { ReactNode } from "react";
import { cn } from "@/helpers/cn";
import { BUTTON_VARIANTS, type ButtonVariant } from "@/helpers/class-maps";

interface MainButtonProps {
  variant: ButtonVariant;
  href: string;
  target?: "_self" | "_blank";
  className?: string;
  children: ReactNode;
}

/**
 * Angular: shared/components/ui/main-button (`<a><button>` pair).
 * Rendered as a single styled <a>: identical look, but valid HTML
 * (no interactive element nested inside a link) and a real, crawlable link.
 */
export default function MainButton({ variant, href, target = "_self", className, children }: MainButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(BUTTON_VARIANTS[variant], className)}
    >
      {children}
    </a>
  );
}
