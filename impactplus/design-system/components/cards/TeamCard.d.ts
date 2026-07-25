import * as React from "react";
/** "Meet Your Team" role card — circular photo, serif role title, description. */
export interface TeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Photo URL; falls back to a neutral circle. */
  avatar?: string;
  /** Role title (e.g. "Coaches"). */
  role?: string;
  children?: React.ReactNode;
}
export function TeamCard(props: TeamCardProps): JSX.Element;
