import React from "react";

/** Numbered process step tab ("Path to Endless Customers"): a colored header
 * strip with the step number, then a title and optional caption below. */
export function StepCard({ number, title, caption, color = "var(--color-brand)", style, ...rest }) {
  return (
    <div style={{
      borderRadius: "var(--radius-md)", overflow: "hidden",
      boxShadow: "var(--shadow-card)", background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)", ...style,
    }} {...rest}>
      <div style={{
        background: color, color: "var(--ec-white)", padding: "14px 18px",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 22, lineHeight: 1 }}>{number}</span>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</span>
      </div>
      {caption && (
        <div style={{ padding: "16px 18px", fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>{caption}</div>
      )}
    </div>
  );
}
