import * as React from "react";
/** Three-up program card: logo lockup + dark CTA + secondary text-link. */
export interface ProgramCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo image URL; falls back to logoAlt rendered as a wordmark. */
  logoSrc?: string;
  logoAlt?: string;
  /** @default "Learn More" */
  ctaLabel?: string;
  ctaHref?: string;
  linkLabel?: string;
  linkHref?: string;
}
export function ProgramCard(props: ProgramCardProps): JSX.Element;
