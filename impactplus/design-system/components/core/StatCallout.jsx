import React from "react";

/** Big statistic callout: an oversized number (serif or handwritten) with a
 * short label — the "82%" / results-style highlight. */
export function StatCallout({ value, label, script = false, color = "var(--color-brand)", align = "center", style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", textAlign: align, ...style }} {...rest}>
      <span style={{
        fontFamily: script ? "var(--font-script)" : "var(--font-heading)",
        fontWeight: script ? 700 : 900, fontSize: script ? 60 : 56, lineHeight: 1, color,
      }}>{value}</span>
      {label && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--text-body)", marginTop: 8, maxWidth: 220 }}>{label}</span>}
    </div>
  );
}
