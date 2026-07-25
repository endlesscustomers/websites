import * as React from "react";
/** Dismissible promo "hello bar" under the header. */
export interface HelloBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Bold lead text. */
  message?: string;
  /** Trailing normal-weight text. */
  highlight?: string;
  /** @default "Register Now" */
  ctaLabel?: string;
  ctaHref?: string;
  onClose?: () => void;
}
export function HelloBar(props: HelloBarProps): JSX.Element;
