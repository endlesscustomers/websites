import React from "react";

const Cell = ({ value, highlight }) => {
  if (value === true || value === "yes") {
    return (
      <span style={{ display: "inline-flex", width: 26, height: 26, borderRadius: "var(--radius-full)", background: highlight ? "var(--accent-check)" : "var(--ec-green-500)", color: "#fff", alignItems: "center", justifyContent: "center" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </span>
    );
  }
  if (value === false || value === "no") {
    return (
      <span style={{ display: "inline-flex", width: 26, height: 26, borderRadius: "var(--radius-full)", background: "var(--ec-neutral-200)", color: "var(--ec-neutral-500)", alignItems: "center", justifyContent: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
      </span>
    );
  }
  return <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)" }}>{value}</span>;
};

/** Competitor benchmark: your offering vs. 2–3 competitors across a set of
 * capability rows. Your column is highlighted; cells accept true/false or text.
 * `columns[0]` is treated as "you" unless `highlightIndex` is set. */
export function ComparisonBlock({
  eyebrow, title, highlight, subtitle,
  columns = [], rows = [], highlightIndex = 0, onMuted = false, style, ...rest
}) {
  const grid = `minmax(180px, 1.4fr) repeat(${columns.length}, minmax(0, 1fr))`;
  return (
    <section style={{ background: onMuted ? "var(--surface-muted)" : "transparent", padding: "var(--section-py) var(--gutter)", ...style }} {...rest}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        {(title || eyebrow) && (
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto var(--section-gap)", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            {eyebrow && <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-brand)" }}>{eyebrow}</span>}
            {title && <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h2)", lineHeight: 1.12, color: "var(--text-heading)", margin: 0 }}>{title}{highlight && <> <span style={{ color: "var(--color-brand)" }}>{highlight}</span></>}</h2>}
            {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--text-body)", margin: 0 }}>{subtitle}</p>}
          </div>
        )}
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-card)", border: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
          {/* header */}
          <div style={{ display: "grid", gridTemplateColumns: grid }}>
            <div style={{ padding: "20px 24px" }} />
            {columns.map((c, i) => {
              const on = i === highlightIndex;
              return (
                <div key={i} style={{ padding: "20px 18px", textAlign: "center", background: on ? "var(--color-brand)" : "transparent", color: on ? "#fff" : "var(--text-heading)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 16, borderTopLeftRadius: on ? "var(--radius-md)" : 0, borderTopRightRadius: on ? "var(--radius-md)" : 0 }}>{c}</div>
              );
            })}
          </div>
          {/* rows */}
          {rows.map((r, ri) => (
            <div key={ri} style={{ display: "grid", gridTemplateColumns: grid, borderTop: "1px solid var(--border-subtle)", background: ri % 2 ? "var(--ec-livid-100)" : "transparent" }}>
              <div style={{ padding: "18px 24px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, color: "var(--text-heading)" }}>{r.label}</div>
              {r.values.map((v, ci) => {
                const on = ci === highlightIndex;
                return <div key={ci} style={{ padding: "18px", display: "flex", alignItems: "center", justifyContent: "center", background: on ? "rgba(10,108,255,0.06)" : "transparent" }}><Cell value={v} highlight={on} /></div>;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
