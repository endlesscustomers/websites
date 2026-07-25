import * as React from "react";
/**
 * Labeled-screenshot diagram — a subject image with numbered callout markers
 * positioned by percentage.
 * @startingPoint section="Diagrams" subtitle="Annotated screenshot diagram" viewport="820x520"
 */
export interface AnnotatedVisualProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Subject image URL (drop your export here); placeholder if omitted. */
  src?: string;
  alt?: string;
  /** CSS aspect-ratio of the subject. @default "16 / 10" */
  ratio?: string;
  /** Markers: { label, x, y } with x/y as 0–100 percentages. */
  annotations?: { label: string; x: number; y: number }[];
  /** Accent color for markers. @default brand blue */
  accent?: string;
}
export function AnnotatedVisual(props: AnnotatedVisualProps): JSX.Element;
