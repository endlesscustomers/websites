import * as React from "react";
/** Gold review-star rating row. */
export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Filled stars. @default 5 */
  value?: number;
  /** @default 5 */
  max?: number;
  /** px size per star. @default 20 */
  size?: number;
}
export function StarRating(props: StarRatingProps): JSX.Element;
