import * as React from "react";
/**
 * Customer testimonial card — stars, headline, quote, avatar + attribution.
 */
export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 5 */
  rating?: number;
  title?: string;
  quote?: string;
  name?: string;
  company?: string;
  /** Avatar image URL; falls back to initials. */
  avatar?: string;
}
export function TestimonialCard(props: TestimonialCardProps): JSX.Element;
