import * as React from "react";
/**
 * Handwritten Kalam annotation with an optional hand-drawn arrow — IMPACT's
 * signature decorative call-out.
 */
export interface CalloutProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** Arrow direction. @default "none" */
  arrow?: "none" | "down" | "down-left" | "down-right" | "left" | "right" | "up";
  /** CSS color for text + arrow. @default heading color */
  color?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
}
export function Callout(props: CalloutProps): JSX.Element;
