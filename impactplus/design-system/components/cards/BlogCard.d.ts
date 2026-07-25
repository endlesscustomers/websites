import * as React from "react";
/** Learning-Center article card — thumbnail, title, date, optional author. */
export interface BlogCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  image?: string;
  title?: string;
  date?: string;
  author?: { name: string; avatar?: string };
  href?: string;
}
export function BlogCard(props: BlogCardProps): JSX.Element;
