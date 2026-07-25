import * as React from "react";
/**
 * Base surface card — white, soft cool shadow, 16px radius.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** CSS padding. @default "28px" */
  padding?: string;
  /** Lift + deepen shadow on hover. @default false */
  hoverable?: boolean;
}
export function Card(props: CardProps): JSX.Element;
