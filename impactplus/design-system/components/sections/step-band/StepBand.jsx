import React from "react";
import { StepCard } from "../../cards/StepCard.jsx";
import { SectionHeading } from "../../core/SectionHeading.jsx";

const DEFAULT_COLORS = [
  "var(--ec-blue-600)", "var(--ec-green-500)", "var(--ec-ai-primary)",
  "var(--ec-website-primary)", "var(--ec-hubspot-primary)",
];

/** "Path to Endless Customers" band: an optional heading over a horizontal row
 * of numbered StepCards, colored progressively from the service palette. */
export function StepBand({
  eyebrow, title, highlight, steps = [], onMuted = true, style, ...rest
}) {
  return (
    <section style={{
      background: onMuted ? "var(--surface-muted)" : "transparent",
      padding: "var(--section-py) var(--gutter)", ...style,
    }} {...rest}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        {(title || eyebrow) && (
          <div style={{ marginBottom: "44px" }}>
            <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} />
          </div>
        )}
        <div style={{
          display: "grid", gap: "18px",
          gridTemplateColumns: `repeat(${steps.length || 1}, minmax(0, 1fr))`, alignItems: "start",
        }}>
          {steps.map((s, i) => (
            <StepCard key={i} number={s.number ?? String(i + 1).padStart(2, "0")}
              title={s.title} caption={s.caption} color={s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
