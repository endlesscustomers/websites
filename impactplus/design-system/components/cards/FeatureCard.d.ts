import * as React from "react";
/** Icon + title (+ optional copy) feature card for benefit grids. */
export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom icon node — overrides iconName. */
  icon?: React.ReactNode;
  /** Key into IMPACT's hand-drawn icon set: team | alignment | hiring | content |
   * hubspot | ai | video | website | onCamera | sales | endlessCustomers |
   * moreSales | salesPerformance | targetBuyer | strategy. */
  iconName?: string;
  title?: string;
  children?: React.ReactNode;
  /** Drop body copy (the "What You'll Gain" layout). @default false */
  titleOnly?: boolean;
}
export function FeatureCard(props: FeatureCardProps): JSX.Element;
export const FEATURE_ICONS: Record<string, string>;
