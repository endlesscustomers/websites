import React from "react";
import { SectionHeading } from "../../core/SectionHeading.jsx";
import { TeamCard } from "../../cards/TeamCard.jsx";

/** "Meet Your Team" section: centered heading over a grid of TeamCards. */
export function TeamGrid({
  eyebrow, title, highlight, subtitle,
  members = [], columns = 3, onMuted = false, children, style, ...rest
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
          {children || members.map((m, i) => (
            <TeamCard key={i} avatar={m.avatar} role={m.role}>{m.body}</TeamCard>
          ))}
        </div>
      </div>
    </section>
  );
}
