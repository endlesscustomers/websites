import * as React from "react";
/**
 * Flow/relationship diagram — linear chain, ring cycle, or hub-and-spoke.
 * @startingPoint section="Diagrams" subtitle="Flow / cycle / hub diagram" viewport="820x480"
 */
export interface FlowDiagramProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "linear" */
  layout?: "linear" | "cycle" | "hub";
  /** Node labels (auto-colored from the service palette). */
  nodes?: string[];
  /** Center label for the "hub" layout. */
  center?: string;
}
export function FlowDiagram(props: FlowDiagramProps): JSX.Element;
