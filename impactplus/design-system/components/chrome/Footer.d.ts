import * as React from "react";

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
  ariaLabel?: string;
}
export interface FooterColumn { title: string; href?: string; links: Array<FooterLink | string>; }
export interface FooterCredential {
  label: string;
  description: string;
  actionLabel?: string;
  href: string;
  image: string;
  width: number;
  height: number;
}

/** V2 global footer for the approved IMPACT light-refresh journey. */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  brands?: Array<FooterLink | string>;
  credentials?: FooterCredential[];
  socialLinks?: Array<FooterLink | string>;
  legalLinks?: Array<FooterLink | string>;
  address?: string;
  phone?: string;
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaCopy?: string;
  ctaMicrocopy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaPersonName?: string;
  ctaPersonRole?: string;
  ctaPersonImage?: string;
  showCta?: boolean;
  year?: number;
}

export const IMPACT_V2_FOOTER_COLUMNS: FooterColumn[];
export const IMPACT_V2_BRAND_LINKS: FooterLink[];
export const IMPACT_V2_CREDENTIALS: FooterCredential[];
export const IMPACT_V2_SOCIAL_LINKS: FooterLink[];
export const IMPACT_V2_LEGAL_LINKS: FooterLink[];
export function Footer(props: FooterProps): JSX.Element;
