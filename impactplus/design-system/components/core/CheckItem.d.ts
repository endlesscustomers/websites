import * as React from "react";
/** Checklist row with IMPACT's green circular check icon. */
export interface CheckItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** White text for dark backgrounds. @default false */
  onDark?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}
export function CheckItem(props: CheckItemProps): JSX.Element;
