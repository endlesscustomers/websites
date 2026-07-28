import * as React from "react";
/**
 * Long-form text block using IMPACT's two existing paragraph styles: a larger
 * "lead" paragraph (--prose-lead, 23px/34px desktop and 20px/30px mobile) +
 * standard body paragraphs (--prose-body, 16px/24px in V2).
 * @startingPoint section="Content" subtitle="Lead + body paragraph block" viewport="820x360"
 */
export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Larger intro paragraph (--prose-lead / 23px/34px desktop, 20px/30px mobile). */
  lead?: React.ReactNode;
  /** Standard body paragraphs (--prose-body / 16px/24px in V2). */
  paragraphs?: React.ReactNode[];
  /** @default "left" */
  align?: "left" | "center";
  /** Optional max width for readable measure. */
  maxWidth?: string | number;
  children?: React.ReactNode;
}
export function Prose(props: ProseProps): JSX.Element;
