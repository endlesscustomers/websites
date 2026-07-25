import * as React from "react";
/**
 * Global site header — logo + tagline, dropdown nav, Login, blue Schedule Call CTA.
 */
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Top-level nav labels. */
  links?: string[];
  /** Dark header (marketing default). @default true */
  onDark?: boolean;
  /** @default "Schedule Call" */
  ctaLabel?: string;
  ctaHref?: string;
  loginHref?: string;
  /** Centered inner container width. @default 1320 */
  maxWidth?: number | string;
}
export function NavBar(props: NavBarProps): JSX.Element;
