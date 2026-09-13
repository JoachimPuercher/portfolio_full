import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/helpers/cn";
import { BUTTON_VARIANTS, type ButtonVariant } from "@/helpers/class-maps";

interface ProjectLinkButtonProps {
  variant: ButtonVariant;
  /** Project URL slug. Angular set ProjectDetailsService.projectPos and routed to /project-details. */
  slug: string;
  className?: string;
  children: ReactNode;
}

/**
 * Angular: shared/components/ui/project-link-button (same styles as main-button).
 * Now a real link to /[locale]/projects/[slug], so every project is its own indexable page.
 */
export default function ProjectLinkButton({ variant, slug, className, children }: ProjectLinkButtonProps) {
  return (
    <Link href={`/projects/${slug}`} className={cn(BUTTON_VARIANTS[variant], className)}>
      {children}
    </Link>
  );
}
