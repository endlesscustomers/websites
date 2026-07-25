import * as React from "react";

/**
 * IMPACT pill button / CTA.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "dark" | "secondary" | "outline" | "ghost" | "link";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Renders as an <a> when set. */
  href?: string;
  /** Append the trailing arrow glyph. @default false */
  withArrow?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function Button(props: ButtonProps): JSX.Element;
