import React from "react";

const PALETTE = ["var(--ec-blue-600)", "var(--ec-green-500)", "var(--ec-ai-primary)", "var(--ec-website-primary)"];

/** Simple branded column chart for a "with vs. without" / comparison story.
 * Bars are normalized to the max value; each takes an optional color. */
export function BarChartDiagram({ data = [], height = 260, showValues = true, unit = "", style, ...rest }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "clamp(16px,4vw,52px)", height, padding: "0 8px", borderBottom: "2px solid var(--border-subtle)", ...style }} {...rest}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", flex: "1 1 0", maxWidth: 140 }}>
          {showValues && <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 22, color: "var(--text-heading)", marginBottom: 8 }}>{d.value}{unit}</span>}
          <div style={{ width: "100%", maxWidth: 96, height: `${(d.value / max) * 78}%`, minHeight: 8, background: d.color || PALETTE[i % PALETTE.length], borderRadius: "var(--radius-sm) var(--radius-sm) 0 0", transition: "height var(--dur-slow) var(--ease-out)" }} />
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--text-body)", marginTop: 10, textAlign: "center", lineHeight: 1.25 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}
