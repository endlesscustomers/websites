import * as React from "react";
/** Section heading: eyebrow + serif title (with optional highlighted phrase) + subtitle. */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  /** Phrase appended to the title in brand blue. */
  highlight?: string;
  subtitle?: React.ReactNode;
  /** @default "center" */
  align?: "center" | "left";
  /** White text for dark backgrounds. @default false */
  onDark?: boolean;
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
