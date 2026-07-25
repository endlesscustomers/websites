import * as React from "react";
/**
 * Site footer — link columns, brand lockup + address, social row, legal line.
 */
export interface FooterColumn { title: string; links: string[]; }
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  /** Multi-line address string. */
  address?: string;
}
export function Footer(props: FooterProps): JSX.Element;
