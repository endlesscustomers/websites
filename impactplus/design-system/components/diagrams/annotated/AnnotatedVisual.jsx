import React from "react";

/** Annotated visual: a central subject (your exported image / screenshot, or a
 * placeholder) with labeled callout markers pointing at parts of it — the
 * "labeled screenshot" diagram. Annotations are positioned by percentage. */
export function AnnotatedVisual({
  src, alt = "", ratio = "16 / 10",
  annotations = [], accent = "var(--color-brand)", style, ...rest
}) {
  return (
    <div style={{ position: "relative", width: "100%", ...style }} {...rest}>
      <div style={{ position: "relative", width: "100%", aspectRatio: ratio, borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--ec-livid-200)", border: "1px solid var(--border-subtle)" }}>
        {src
          ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontFamily: "var(--font-body)", fontSize: 14 }}>Subject image</div>}
      </div>
      {annotations.map((a, i) => (
        <div key={i} style={{ position: "absolute", left: `${a.x}%`, top: `${a.y}%`, transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ width: 26, height: 26, borderRadius: "var(--radius-full)", background: accent, color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" }}>{i + 1}</span>
          <span style={{ background: "var(--surface-card)", border: `1px solid ${accent}`, color: "var(--text-heading)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 12, padding: "4px 10px", borderRadius: "var(--radius-pill)", whiteSpace: "nowrap", boxShadow: "var(--shadow-sm)" }}>{a.label}</span>
        </div>
      ))}
    </div>
  );
}
