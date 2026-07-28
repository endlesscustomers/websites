import * as React from "react";
/**
 * Responsive floating section rail — product label + scrollable link pills + a
 * black CTA that compacts on mobile.
 * @startingPoint section="Chrome" subtitle="Floating section navigation" viewport="1200x120"
 */
export interface SubNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product logo URL; falls back to `label` as text. */
  logoSrc?: string;
  label?: string;
  /** In-page links. */
  links?: { label: string; href: string }[];
  /** href of the active link (gets the theme-tinted pill state). */
  activeHref?: string;
  /** @default "Schedule Call" */
  ctaLabel?: string;
  ctaHref?: string;
  /** Stick to the top on scroll. @default true */
  sticky?: boolean;
}
export function SubNav(props: SubNavProps): JSX.Element;
