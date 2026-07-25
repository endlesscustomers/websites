import * as React from "react";
/**
 * Full-width closing CTA band — dark, or over a photo with a scrim.
 * @startingPoint section="Sections" subtitle="Closing CTA band (dark / photo)" viewport="1200x460"
 */
export interface CtaBandProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  highlight?: string;
  subtitle?: React.ReactNode;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  /** Background photo URL; adds a dark scrim over it. */
  imageSrc?: string;
}
export function CtaBand(props: CtaBandProps): JSX.Element;
