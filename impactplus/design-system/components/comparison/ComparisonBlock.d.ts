import * as React from "react";
/**
 * Competitor benchmark — your offering vs. 2–3 competitors across capability rows.
 * INTENTIONAL ADDITION: not a pattern on the live site today; built per request.
 * @startingPoint section="Comparison" subtitle="You vs. competitors matrix" viewport="1000x520"
 */
export interface ComparisonBlockProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  highlight?: string;
  subtitle?: React.ReactNode;
  /** Column headers, e.g. ["Endless Customers", "Agency", "DIY"]. */
  columns?: string[];
  /** Each row: { label, values } where values align to columns.
   * A value may be true/false (check/x) or a string. */
  rows?: { label: string; values: (boolean | string)[] }[];
  /** Which column to highlight as "you". @default 0 */
  highlightIndex?: number;
  onMuted?: boolean;
}
export function ComparisonBlock(props: ComparisonBlockProps): JSX.Element;
