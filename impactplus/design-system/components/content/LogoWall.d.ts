import * as React from "react";
/** Grayscale client-logo wall. */
export interface LogoWallProps extends React.HTMLAttributes<HTMLDivElement> {
  logos?: { src: string; alt?: string; height?: number }[];
  /** De-saturate + fade the logos. @default true */
  grayscale?: boolean;
}
export function LogoWall(props: LogoWallProps): JSX.Element;
