import * as React from "react";
/** Pill label / eyebrow tag. Green is the signature accent. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** @default "green" */
  variant?: "green" | "blue" | "dark" | "outline" | "solid";
}
export function Badge(props: BadgeProps): JSX.Element;
