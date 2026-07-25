import * as React from "react";
/**
 * Sticky secondary/section nav — product logo/label + in-page links + a CTA.
 * @startingPoint section="Chrome" subtitle="Sticky section sub-nav" viewport="1200x120"
 */
export interface SubNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product logo URL; falls back to `label` as text. */
  logoSrc?: string;
  label?: string;
  /** In-page links. */
  links?: { label: string; href: string }[];
  /** href of the active link (gets the underline + brand color). */
  activeHref?: string;
  /** @default "Schedule Call" */
  ctaLabel?: string;
  ctaHref?: string;
  /** Stick to the top on scroll. @default true */
  sticky?: boolean;
}
export function SubNav(props: SubNavProps): JSX.Element;
