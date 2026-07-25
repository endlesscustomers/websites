import * as React from "react";
/**
 * Centered heading over a responsive grid of TestimonialCards.
 * @startingPoint section="Sections" subtitle="Star-review testimonial wall" viewport="1200x680"
 */
export interface TestimonialWallProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  highlight?: string;
  subtitle?: React.ReactNode;
  testimonials?: {
    rating?: number; title?: string; quote?: string;
    name?: string; company?: string; avatar?: string;
  }[];
  /** @default 3 */
  columns?: number;
  /** Livid background. @default true */
  onMuted?: boolean;
  /** Horizontal scroll-snap carousel with prev/next controls. @default false */
  carousel?: boolean;
  /** Cards visible per view in carousel mode. @default 3 */
  perView?: number;
  children?: React.ReactNode;
}
export function TestimonialWall(props: TestimonialWallProps): JSX.Element;
