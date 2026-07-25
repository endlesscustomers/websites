import * as React from "react";
/** "Meet Your Team" — centered heading over a TeamCard grid. */
export interface TeamGridProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  highlight?: string;
  subtitle?: React.ReactNode;
  members?: { avatar?: string; role?: string; body?: React.ReactNode }[];
  /** @default 3 */
  columns?: number;
  onMuted?: boolean;
  children?: React.ReactNode;
}
export function TeamGrid(props: TeamGridProps): JSX.Element;
