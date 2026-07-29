import * as React from "react";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  emphasis?: boolean;
  accent?: boolean;
}

export interface NavGroup {
  title: string;
  featured?: boolean;
  variant?: "primary" | "secondary" | "directory";
  subgroups?: Array<{
    title: string;
    links: NavLink[];
  }>;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  panel?: "wide" | "medium" | "compact";
  groups?: NavGroup[];
}

/** V2 global navigation for the locked IMPACT light-refresh journey. */
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  onDark?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  homeHref?: string;
  descriptorHref?: string;
  showDescriptor?: boolean;
  academyHref?: string;
  academyLabel?: string;
  academyTooltip?: string;
  academyIconBasePath?: string;
  activeHref?: string;
  maxWidth?: number | string;
}

export const IMPACT_V2_NAV_ITEMS: NavItem[];
export function NavBar(props: NavBarProps): JSX.Element;
