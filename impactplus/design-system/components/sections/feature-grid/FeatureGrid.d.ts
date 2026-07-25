import * as React from "react";
/**
 * Centered heading over a responsive FeatureCard grid ("What You'll Get").
 * @startingPoint section="Sections" subtitle="Heading + feature-card grid" viewport="1200x620"
 */
export interface FeatureGridProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  highlight?: string;
  subtitle?: React.ReactNode;
  /** Card data; ignored if children are provided. */
  items?: { icon?: React.ReactNode; iconName?: string; title?: string; body?: React.ReactNode }[];
  /** Grid column count. @default 3 */
  columns?: number;
  /** Livid section background. @default false */
  onMuted?: boolean;
  /** Render title-only cards ("What You'll Gain"). @default false */
  titleOnly?: boolean;
  children?: React.ReactNode;
}
export function FeatureGrid(props: FeatureGridProps): JSX.Element;
