import * as React from "react";
/**
 * Logo + result proof tile — client logo, a big metric, and a one-line descriptor.
 * @startingPoint section="Proof" subtitle="Logo + result metric tile" viewport="360x260"
 */
export interface ResultTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Client logo URL; falls back to logoAlt as text. */
  logoSrc?: string;
  logoAlt?: string;
  /** Big headline metric, e.g. "3×" or "45%". */
  metric?: React.ReactNode;
  /** One-line descriptor. */
  label?: React.ReactNode;
}
export function ResultTile(props: ResultTileProps): JSX.Element;
