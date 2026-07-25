import React from "react";

const Check = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-check)"
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-label="included">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function Cell({ value, highlight }) {
  let inner;
  if (value === true) inner = <Check />;
  else if (value === false || value == null) inner = <span style={{ color: "var(--text-muted)", fontSize: 15 }}>Not Available</span>;
  else if (typeof value === "object") {
    inner = (
      <div style={{ textAlign: "center" }}>
        {value.check && <Check />}
        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-heading)" }}>{value.label}</div>
        {value.caption && <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{value.caption}</div>}
      </div>
    );
  } else inner = <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-heading)" }}>{value}</span>;

  return (
    <td style={{
      padding: "18px 20px", textAlign: "center", verticalAlign: "middle",
      borderBottom: "1px solid var(--border-subtle)",
      background: highlight ? "var(--ec-livid-100)" : "transparent",
    }}>{inner}</td>
  );
}

/** Plan comparison table: sticky feature column on the left, N plan columns
 * (one may be highlighted), green checks / value strings / "Not Available".
 * Mirrors the coaching-program pricing grid. */
export function PricingTable({ plans = [], features = [], style, ...rest }) {
  return (
    <div style={{ overflowX: "auto", ...style }} {...rest}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 720, fontFamily: "var(--font-body)" }}>
        <thead>
          <tr>
            <th style={{ background: "transparent", borderBottom: "1px solid var(--border-subtle)" }} />
            {plans.map((p, i) => (
              <th key={i} style={{
                padding: "22px 20px", textAlign: "center", verticalAlign: "top",
                background: p.highlight ? "var(--ec-livid-100)" : "transparent",
                borderTop: p.highlight ? "3px solid var(--color-brand)" : "3px solid transparent",
                borderBottom: "1px solid var(--border-subtle)",
              }}>
                {p.highlight && (
                  <div style={{
                    display: "inline-block", background: "var(--color-brand)", color: "#fff",
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                    padding: "4px 12px", borderRadius: "var(--radius-pill)", marginBottom: 10,
                  }}>Most Popular</div>
                )}
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "var(--text-heading)" }}>{p.name}</div>
                {p.caption && <div style={{ fontSize: 14, color: "var(--text-body)", marginTop: 6, lineHeight: 1.45 }}>{p.caption}</div>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans.some((p) => p.price) && (
            <tr>
              <th style={{ textAlign: "left", padding: "18px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: 15 }}>Monthly Fee</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Starting Month 2</div>
              </th>
              {plans.map((p, i) => (
                <td key={i} style={{
                  padding: "18px 20px", textAlign: "center", borderBottom: "1px solid var(--border-subtle)",
                  background: p.highlight ? "var(--ec-livid-100)" : "transparent",
                }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "var(--color-brand)" }}>{p.price}</span>
                </td>
              ))}
            </tr>
          )}
          {features.map((row, ri) => (
            <tr key={ri}>
              <th style={{ textAlign: "left", padding: "18px 20px", borderBottom: "1px solid var(--border-subtle)", verticalAlign: "top" }}>
                <div style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: 15, textDecoration: "underline", textUnderlineOffset: 3 }}>{row.label}</div>
                {row.caption && <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{row.caption}</div>}
              </th>
              {plans.map((p, ci) => (
                <Cell key={ci} value={row.values[ci]} highlight={p.highlight} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
