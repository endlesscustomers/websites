import * as React from "react";
/**
 * Full pricing comparison matrix — N plans (one RECOMMENDED) across feature rows.
 * @startingPoint section="Pricing" subtitle="Multi-plan comparison matrix" viewport="1200x640"
 */
export interface PricingMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Plans: { name, price, period?, recommended? }. */
  plans?: { name: string; price: string; period?: string; recommended?: boolean }[];
  /** Rows: { label, values } — values align to plans, true/false or text. */
  rows?: { label: string; values: (boolean | string | null)[] }[];
  /** @default "Schedule Call" */
  ctaLabel?: string;
  ctaHref?: string;
}
export function PricingMatrix(props: PricingMatrixProps): JSX.Element;
