import * as React from "react";
/**
 * "Path to Endless Customers" — heading over a horizontal row of numbered StepCards.
 * @startingPoint section="Sections" subtitle="Numbered process step band" viewport="1200x420"
 */
export interface StepBandProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  highlight?: string;
  steps?: { number?: React.ReactNode; title?: string; caption?: string; color?: string }[];
  /** Livid background. @default true */
  onMuted?: boolean;
}
export function StepBand(props: StepBandProps): JSX.Element;
