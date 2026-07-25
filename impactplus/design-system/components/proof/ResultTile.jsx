import React from "react";

/** Logo-plus-result proof tile: a client logo (or name), a big brand-blue
 * metric, and a one-line descriptor. The unit of a results/proof strip. */
export function ResultTile({ logoSrc, logoAlt = "", metric, label, style, ...rest }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px",
      padding: "30px 24px", background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", ...style,
    }} {...rest}>
      <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {logoSrc
          ? <img src={logoSrc} alt={logoAlt} style={{ maxHeight: 40, maxWidth: 160, objectFit: "contain", filter: "grayscale(1)", opacity: 0.8 }} />
          : <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "var(--text-heading)" }}>{logoAlt}</span>}
      </div>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 46, lineHeight: 1, color: "var(--color-brand)" }}>{metric}</span>
      {label && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)", maxWidth: 220 }}>{label}</span>}
    </div>
  );
}
