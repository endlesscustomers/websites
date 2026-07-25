import React from "react";
import { VideoFeature } from "../video-feature/VideoFeature.jsx";

/** Hero video that "peeks" up above the fold. The module owns a two-tone
 * background — an upper band (`topSurface`, matched to the hero band above so
 * there's no seam) and a lower page-colored area — with the video straddling
 * the boundary. No negative margins, so it never overlaps the hero's content. */
export function PeekingVideo({
  poster, label, sublabel, onPlay,
  topSurface = "muted", topBand = 260, maxWidth = 960, style, ...rest
}) {
  const topBg = topSurface === "dark" ? "var(--surface-dark)" : topSurface === "page" ? "var(--surface-page)" : "var(--surface-muted)";
  return (
    <section style={{ position: "relative", background: "var(--surface-page)", paddingTop: "56px", paddingBottom: "var(--section-py)", paddingInline: "var(--gutter)", ...style }} {...rest}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: topBand, background: topBg }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth, margin: "0 auto" }}>
        <div style={{ borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
          <VideoFeature poster={poster} label={label} sublabel={sublabel} onPlay={onPlay} />
        </div>
      </div>
    </section>
  );
}
