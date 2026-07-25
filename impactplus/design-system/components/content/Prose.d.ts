import * as React from "react";
/**
 * Long-form text block using IMPACT's two existing paragraph styles: a larger
 * "lead" paragraph (--text-lg, 20px) + default body paragraphs (--text-base,
 * 18px). Uses only tokens already in the site CSS.
 * @startingPoint section="Content" subtitle="Lead + body paragraph block" viewport="820x360"
 */
export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Larger intro paragraph (--text-lg / 20px). */
  lead?: React.ReactNode;
  /** Default body paragraphs (--text-base / 18px). */
  paragraphs?: React.ReactNode[];
  /** @default "left" */
  align?: "left" | "center";
  /** Optional max width for readable measure. */
  maxWidth?: string | number;
  children?: React.ReactNode;
}
export function Prose(props: ProseProps): JSX.Element;
