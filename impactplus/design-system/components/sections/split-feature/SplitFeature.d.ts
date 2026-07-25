import * as React from "react";
/** Two-column step section — eyebrow + serif title + body beside an arch-masked photo. */
export interface SplitFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small uppercase label (e.g. "STEP 1"). */
  eyebrow?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** Image on the left. @default false */
  reverse?: boolean;
  /** Photo mask. @default "arch" */
  mask?: "arch" | "rounded";
  /** Step number — renders a "Step N" label + ghosted number watermark. */
  step?: number;
  /** Draw a hairline rule above the block. @default false */
  divider?: boolean;
  /** Optional CTA node rendered under the body. */
  cta?: React.ReactNode;
}
export function SplitFeature(props: SplitFeatureProps): JSX.Element;
