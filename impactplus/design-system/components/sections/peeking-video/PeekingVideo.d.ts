import * as React from "react";
/**
 * Hero video that peeks up above the fold. The module owns a two-tone
 * background (an upper band matched to the hero + a lower page-colored area);
 * the video straddles the boundary. No negative margins.
 * @startingPoint section="Sections" subtitle="Video peeking above the fold" viewport="1100x560"
 */
export interface PeekingVideoProps extends React.HTMLAttributes<HTMLElement> {
  /** Poster image URL. Omit for a clean dark video panel (no imagery). */
  poster?: string;
  /** Lower-left overlay title. */
  label?: string;
  sublabel?: string;
  onPlay?: () => void;
  /** Color of the upper band — match the hero band above. @default "muted" */
  topSurface?: "muted" | "dark" | "page";
  /** Height (px) of the upper band behind the video's top. @default 260 */
  topBand?: number;
  /** Max video width in px. @default 960 */
  maxWidth?: number;
}
export function PeekingVideo(props: PeekingVideoProps): JSX.Element;
