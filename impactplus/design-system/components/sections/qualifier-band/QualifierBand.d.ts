import * as React from "react";
/**
 * Dark "Is this right for you?" band — heading + two-column green checklist + note.
 * @startingPoint section="Sections" subtitle="Dark qualifier checklist band" viewport="1200x560"
 */
export interface QualifierBandProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  highlight?: string;
  subtitle?: React.ReactNode;
  /** Checklist strings. */
  items?: React.ReactNode[];
  /** @default 2 */
  columns?: number;
  /** Closing muted paragraph. */
  note?: React.ReactNode;
}
export function QualifierBand(props: QualifierBandProps): JSX.Element;
