import * as React from "react";
/**
 * Branded diagram container — palette background, optional eyebrow/title, and a
 * handwritten (Kalam) annotation. Wrap any diagram in it.
 * @startingPoint section="Diagrams" subtitle="Branded diagram container" viewport="820x420"
 */
export interface DiagramFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  /** Handwritten Kalam note in the lower-right corner. */
  annotation?: string;
  /** Background. @default "livid" */
  surface?: "livid" | "white" | "dark";
  children?: React.ReactNode;
}
export function DiagramFrame(props: DiagramFrameProps): JSX.Element;
