import * as React from "react";
/** Numbered process-step tab with a colored header strip. */
export interface StepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: React.ReactNode;
  title?: string;
  caption?: string;
  /** Header strip color. @default brand blue */
  color?: string;
}
export function StepCard(props: StepCardProps): JSX.Element;
