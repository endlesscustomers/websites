import React from "react";

const PALETTE = ["var(--ec-blue-600)", "var(--ec-green-500)", "var(--ec-ai-primary)", "var(--ec-website-primary)", "var(--ec-hubspot-primary)", "var(--ec-marketing-primary)"];

function Node({ label, color, size = 118 }) {
  return (
    <div style={{ width: size, minHeight: size, borderRadius: "var(--radius-lg)", background: "var(--surface-card)", border: `2px solid ${color}`, boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, color: "var(--text-heading)" }}>{label}</div>
  );
}

/** Flow/relationship diagram. Three layouts:
 * - "linear": a left-to-right chain of nodes with arrows.
 * - "cycle": nodes arranged around a ring.
 * - "hub": a center node with spokes to satellite nodes. */
export function FlowDiagram({ layout = "linear", nodes = [], center, style, ...rest }) {
  if (layout === "linear") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8, ...style }} {...rest}>
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <Node label={n} color={PALETTE[i % PALETTE.length]} />
            {i < nodes.length - 1 && (
              <svg width="42" height="24" viewBox="0 0 42 24" fill="none" stroke="var(--ec-neutral-400)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="12" x2="32" y2="12" /><polyline points="26 6 34 12 26 18" /></svg>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
  // cycle + hub share a radial layout
  const R = 150, cx = 200, cy = 200;
  const isHub = layout === "hub";
  return (
    <div style={{ position: "relative", width: 400, height: 400, margin: "0 auto", ...style }} {...rest}>
      <svg width="400" height="400" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        {nodes.map((_, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
          if (isHub) return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--ec-livid-400)" strokeWidth="2.5" />;
          const a2 = ((i + 1) / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke="var(--ec-livid-400)" strokeWidth="2.5" />;
        })}
      </svg>
      {isHub && center && (
        <div style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%,-50%)", zIndex: 2 }}>
          <div style={{ width: 130, height: 130, borderRadius: "var(--radius-full)", background: "var(--color-brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 14, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, boxShadow: "var(--shadow-md)" }}>{center}</div>
        </div>
      )}
      {nodes.map((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", zIndex: 1 }}>
            <Node label={n} color={PALETTE[i % PALETTE.length]} size={96} />
          </div>
        );
      })}
    </div>
  );
}
