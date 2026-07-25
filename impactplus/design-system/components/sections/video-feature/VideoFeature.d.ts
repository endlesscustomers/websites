import * as React from "react";
/** Video poster block with a centered play button and optional name overlay. */
export interface VideoFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Poster / thumbnail image URL. */
  poster?: string;
  /** Lower-left overlay title (e.g. speaker name). */
  label?: string;
  sublabel?: string;
  onPlay?: () => void;
  /** CSS border-radius. @default var(--radius-lg) */
  radius?: string;
}
export function VideoFeature(props: VideoFeatureProps): JSX.Element;
