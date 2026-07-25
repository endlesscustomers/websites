import * as React from "react";
/** Oversized statistic callout — big number (serif or Kalam) + short label. */
export interface StatCalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: React.ReactNode;
  label?: string;
  /** Render the number in the handwritten Kalam face. @default false */
  script?: boolean;
  /** Number color. @default brand blue */
  color?: string;
  /** @default "center" */
  align?: "center" | "left";
}
export function StatCallout(props: StatCalloutProps): JSX.Element;
