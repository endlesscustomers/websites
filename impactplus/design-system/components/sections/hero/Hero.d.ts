import * as React from "react";
/**
 * Centered page hero — eyebrow, serif headline with optional highlight,
 * subtitle, and CTA row.
 * @startingPoint section="Sections" subtitle="Centered page hero with CTAs" viewport="1200x560"
 */
export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  /** Phrase appended in brand blue. */
  highlight?: string;
  subtitle?: React.ReactNode;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  /** Handwritten Kalam overlay text. */
  callout?: string;
  calloutArrow?: "down" | "down-left" | "down-right" | "left" | "right" | "up";
  /** @default "center" */
  align?: "center" | "left";
  /** Dark band styling. @default false */
  onDark?: boolean;
  children?: React.ReactNode;
}
export function Hero(props: HeroProps): JSX.Element;
