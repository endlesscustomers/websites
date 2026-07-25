import React from "react";
import { Button } from "../core/Button.jsx";

const Cell = ({ value }) => {
  if (value === true) return (
    <span style={{ display: "inline-flex", width: 24, height: 24, borderRadius: "var(--radius-full)", background: "var(--ec-green-500)", color: "#fff", alignItems: "center", justifyContent: "center" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    </span>
  );
  if (value === false || value == null) return <span style={{ color: "var(--ec-neutral-400)", fontSize: 14 }}>—</span>;
  return <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-body)", lineHeight: 1.3 }}>{value}</span>;
};

/** Full pricing comparison matrix: N plans (one flagged RECOMMENDED) across many
 * feature rows. Plan prices sit in a sticky-feel header; cells accept
 * true/false or text. Mirrors the coaching pricing table. */
export function PricingMatrix({ plans = [], rows = [], ctaLabel = "Schedule Call", ctaHref, style, ...rest }) {
  const grid = `minmax(200px, 1.6fr) repeat(${plans.length}, minmax(0, 1fr))`;
  return (
    <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", paddingInline: "var(--gutter)", boxSizing: "border-box", ...style }} {...rest}>
      <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", background: "var(--surface-card)" }}>
        {/* plan header */}
        <div style={{ display: "grid", gridTemplateColumns: grid }}>
          <div style={{ padding: "24px" }} />
          {plans.map((p, i) => (
            <div key={i} style={{ padding: "24px 18px", textAlign: "center", background: p.recommended ? "var(--color-brand)" : "transparent", color: p.recommended ? "#fff" : "var(--text-heading)", position: "relative" }}>
              {p.recommended && <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, opacity: 0.9 }}>Recommended</div>}
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{p.name}</div>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 22 }}>{p.price}</div>
              {p.period && <div style={{ fontFamily: "var(--font-body)", fontSize: 13, opacity: p.recommended ? 0.85 : 0.6 }}>{p.period}</div>}
            </div>
          ))}
        </div>
        {/* feature rows */}
        {rows.map((r, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: grid, borderTop: "1px solid var(--border-subtle)", background: ri % 2 ? "var(--ec-livid-100)" : "transparent" }}>
            <div style={{ padding: "16px 24px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--text-heading)" }}>{r.label}</div>
            {r.values.map((v, ci) => (
              <div key={ci} style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: plans[ci] && plans[ci].recommended ? "rgba(10,108,255,0.06)" : "transparent" }}><Cell value={v} /></div>
            ))}
          </div>
        ))}
        {/* cta row */}
        {ctaLabel && (
          <div style={{ display: "grid", gridTemplateColumns: grid, borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ padding: "20px 24px" }} />
            {plans.map((p, i) => (
              <div key={i} style={{ padding: "20px 14px", display: "flex", justifyContent: "center" }}>
                <Button variant={p.recommended ? "primary" : "dark"} size="sm" href={ctaHref}>{ctaLabel}</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
