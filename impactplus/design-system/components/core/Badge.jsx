import React from "react";

/**
 * Small pill label / eyebrow tag. Green is the signature ("National
 * Bestseller", "Engagement"); blue and dark variants appear on section
 * eyebrows and table headers.
 */
export function Badge({ children, variant = "green", style, ...rest }) {
  const variants = {
    green: { background: "var(--ec-green-400)", color: "var(--ec-neutral-700)" },
    blue: { background: "var(--ec-blue-200)", color: "var(--color-brand)" },
    dark: { background: "var(--ec-neutral-700)", color: "var(--ec-white)" },
    outline: { background: "transparent", color: "var(--color-brand)", boxShadow: "inset 0 0 0 1.5px var(--ec-blue-300)" },
    solid: { background: "var(--color-brand)", color: "var(--ec-white)" },
  };
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontFamily: "var(--font-body)", fontWeight: "var(--weight-bold)",
        fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase",
        padding: "6px 14px", borderRadius: "var(--radius-pill)", lineHeight: 1.1,
        ...(variants[variant] || variants.green), ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
