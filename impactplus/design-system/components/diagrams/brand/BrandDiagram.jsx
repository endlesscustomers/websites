import React from "react";

/** Drop-in slot for a real exported brand diagram/illustration (e.g. the
 * "Proven System" chart or the Endless Customers Journey SVG). Renders the
 * image when `src` is set; otherwise a labeled dashed placeholder your team
 * swaps. Keeps IMPACT's authoritative graphics authoritative — nothing is
 * redrawn from scratch. */
export function BrandDiagram({ src, alt = "", caption, maxWidth = "100%", style, ...rest }) {
  return (
    <figure style={{ margin: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, ...style }} {...rest}>
      {src ? (
        <img src={src} alt={alt} style={{ width: "100%", maxWidth, objectFit: "contain" }} />
      ) : (
        <div style={{ width: "100%", maxWidth, aspectRatio: "16 / 9", border: "2px dashed var(--ec-livid-400)", borderRadius: "var(--radius-lg)", background: "var(--surface-muted)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--text-muted)", textAlign: "center", padding: 24 }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14 }}>Drop your exported brand diagram here</span>
        </div>
      )}
      {caption && <figcaption style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", textAlign: "center" }}>{caption}</figcaption>}
    </figure>
  );
}
