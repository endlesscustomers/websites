import * as React from "react";
/**
 * Large serif pull-quote band with attribution.
 * @startingPoint section="Sections" subtitle="Big serif pull-quote band" viewport="1200x420"
 */
export interface QuoteBandProps extends React.HTMLAttributes<HTMLElement> {
  quote?: React.ReactNode;
  name?: string;
  title?: string;
  /** Surface. @default "muted" */
  variant?: "muted" | "dark" | "plain";
}
export function QuoteBand(props: QuoteBandProps): JSX.Element;
