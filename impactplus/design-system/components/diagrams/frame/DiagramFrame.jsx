import React from "react";

/** Shared container for a branded diagram: palette background, optional eyebrow
 * + title, and an optional handwritten (Kalam) annotation in the corner. Wrap
 * any diagram (Flow, BarChart, AnnotatedVisual, BrandDiagram) in it. */
export function DiagramFrame({
  eyebrow, title, annotation, surface = "livid", children, style, ...rest
}) {
  const bg = surface === "dark" ? "var(--surface-dark)" : surface === "white" ? "var(--surface-card)" : "var(--surface-muted)";
  const fg = surface === "dark" ? "#fff" : "var(--text-heading)";
  return (
    <div style={{
      position: "relative", background: bg, color: fg, borderRadius: "var(--radius-xl)",
      border: surface === "white" ? "1px solid var(--border-subtle)" : "none",
      boxShadow: surface === "white" ? "var(--shadow-card)" : "none",
      padding: "40px clamp(24px, 4vw, 56px)", ...style,
    }} {...rest}>
      {(eyebrow || title) && (
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          {eyebrow && <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: surface === "dark" ? "var(--ec-blue-400)" : "var(--color-brand)", marginBottom: 10 }}>{eyebrow}</div>}
          {title && <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h3)", lineHeight: 1.15, color: fg, margin: 0 }}>{title}</h3>}
        </div>
      )}
      {children}
      {annotation && (
        <span style={{ position: "absolute", right: 24, bottom: 16, fontFamily: "var(--font-accent)", fontWeight: 700, fontSize: 24, color: surface === "dark" ? "var(--ec-green-300)" : "var(--color-brand)", transform: "rotate(-6deg)" }}>{annotation}</span>
      )}
    </div>
  );
}
