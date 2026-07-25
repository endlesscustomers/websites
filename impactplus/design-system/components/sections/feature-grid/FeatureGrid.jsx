import React from "react";
import { SectionHeading } from "../../core/SectionHeading.jsx";
import { FeatureCard } from "../../cards/FeatureCard.jsx";

/** "What You'll Get / Gain" style section: a centered heading over a responsive
 * grid of FeatureCards. Pass `items` [{icon,title,body}] or your own children. */
export function FeatureGrid({
  eyebrow, title, highlight, subtitle,
  items = [], columns = 3, onMuted = false, titleOnly = false, children, style, ...rest
}) {
  return (
    <section style={{
      background: onMuted ? "var(--surface-muted)" : "transparent",
      padding: "var(--section-py) var(--gutter)", ...style,
    }} {...rest}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        {(title || eyebrow) && (
          <div style={{ marginBottom: "var(--section-gap)" }}>
            <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} />
          </div>
        )}
        <div style={{
          display: "grid", gap: "var(--grid-gap)",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, alignItems: "stretch",
        }}>
          {children || items.map((it, i) => (
            <FeatureCard key={i} icon={it.icon} iconName={it.iconName} title={it.title} titleOnly={titleOnly}>{it.body}</FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
