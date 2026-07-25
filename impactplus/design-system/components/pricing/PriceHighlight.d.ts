import * as React from "react";
/**
 * One-time / kickoff price highlight — title, price line(s), "What's Included"
 * checklist, and an image.
 * @startingPoint section="Pricing" subtitle="Kickoff price highlight block" viewport="1100x520"
 */
export interface PriceHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  /** Price lines: { label?, amount }. */
  prices?: { label?: string; amount: string }[];
  /** @default "What's Included:" */
  includesTitle?: string;
  /** Checklist strings. */
  includes?: React.ReactNode[];
  imageSrc?: string;
  imageAlt?: string;
  /** Image on the left. @default false */
  reverse?: boolean;
  cta?: React.ReactNode;
}
export function PriceHighlight(props: PriceHighlightProps): JSX.Element;
