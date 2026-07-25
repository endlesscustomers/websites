import * as React from "react";
/**
 * Drop-in slot for a real exported brand diagram/illustration SVG; shows a
 * dashed placeholder until `src` is set.
 * @startingPoint section="Diagrams" subtitle="Real-asset diagram slot" viewport="820x480"
 */
export interface BrandDiagramProps extends React.HTMLAttributes<HTMLElement> {
  /** Exported diagram/illustration URL (SVG/PNG). */
  src?: string;
  alt?: string;
  /** Caption under the figure. */
  caption?: React.ReactNode;
  /** Max width of the image. @default "100%" */
  maxWidth?: string | number;
}
export function BrandDiagram(props: BrandDiagramProps): JSX.Element;
