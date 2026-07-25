import * as React from "react";
/**
 * FAQ accordion with serif questions and a rotating "+" toggle.
 */
export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Question/answer pairs. */
  items?: { q: string; a: React.ReactNode }[];
  /** Allow several rows open at once. @default false */
  allowMultiple?: boolean;
  /** Index open on mount, or null. @default null */
  defaultOpen?: number | null;
}
export function FaqAccordion(props: FaqAccordionProps): JSX.Element;
