import * as React from "react";
/**
 * Simple branded column chart for comparison stories.
 * @startingPoint section="Diagrams" subtitle="Branded bar/column chart" viewport="700x360"
 */
export interface BarChartDiagramProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Bars: { label, value, color? }. */
  data?: { label: string; value: number; color?: string }[];
  /** Chart height in px. @default 260 */
  height?: number;
  /** Show the value above each bar. @default true */
  showValues?: boolean;
  /** Unit suffix appended to values, e.g. "%". */
  unit?: string;
}
export function BarChartDiagram(props: BarChartDiagramProps): JSX.Element;
