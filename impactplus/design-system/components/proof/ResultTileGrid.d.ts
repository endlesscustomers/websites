import * as React from "react";
/** Responsive strip of ResultTiles under an optional heading. */
export interface ResultTileGridProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  highlight?: string;
  subtitle?: React.ReactNode;
  results?: { logoSrc?: string; logoAlt?: string; metric?: React.ReactNode; label?: React.ReactNode }[];
  /** @default 4 */
  columns?: number;
  onMuted?: boolean;
  children?: React.ReactNode;
}
export function ResultTileGrid(props: ResultTileGridProps): JSX.Element;
