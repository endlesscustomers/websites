import * as React from "react";
/**
 * Plan comparison table — feature column + N plan columns with checks, value
 * strings, or "Not Available". One plan may be highlighted.
 */
export interface PricingPlan {
  name: string;
  caption?: string;
  price?: string;
  highlight?: boolean;
}
export interface PricingFeature {
  label: string;
  caption?: string;
  /** One entry per plan: true=check, false/null="Not Available", string=text,
   * or {check?, label, caption} for a value with a check + sub-caption. */
  values: (boolean | string | null | { check?: boolean; label: string; caption?: string })[];
}
export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans?: PricingPlan[];
  features?: PricingFeature[];
}
export function PricingTable(props: PricingTableProps): JSX.Element;
