import React from "react";
import { SectionHeading } from "../core/SectionHeading.jsx";
import { ResultTile } from "./ResultTile.jsx";

/** A responsive strip of ResultTiles under an optional heading. */
export function ResultTileGrid({
  eyebrow, title, highlight, subtitle,
  results = [], columns = 4, onMuted = false, children, style, ...rest
}) {
  return (
    <section style={{ background: onMuted ? "var(--surface-muted)" : "transparent", padding: "var(--section-py) var(--gutter)", ...style }} {...rest}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        {(title || eyebrow) && (
          <div style={{ marginBottom: "var(--section-gap)" }}>
            <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} />
          </div>
        )}
        <div style={{ display: "grid", gap: "var(--grid-gap-sm)", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, alignItems: "stretch" }}>
          {children || results.map((r, i) => (
            <ResultTile key={i} logoSrc={r.logoSrc} logoAlt={r.logoAlt} metric={r.metric} label={r.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
