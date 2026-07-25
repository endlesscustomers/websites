import React from "react";

/**
 * Handwritten marker annotation — IMPACT's signature motif (Kalam script +
 * a hand-drawn arrow), used for hero step labels and playful call-outs like
 * "IMPACT & The Endless Customers System made me a millionaire".
 */
export function Callout({
  children,
  arrow = "none",       // none | down | down-left | down-right | left | right
  color = "var(--text-heading)",
  size = "md",          // sm | md | lg | xl
  style,
  ...rest
}) {
  const sizes = { sm: "var(--script-xs)", md: "var(--script-sm)", lg: "var(--script-lg)", xl: "var(--script-xl)" };
  const rot = {
    "down": 90, "down-left": 135, "down-right": 45, "left": 180, "right": 0, "up": 270,
  }[arrow] ?? 0;

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", gap: "2px", ...style }} {...rest}>
      <span style={{
        fontFamily: "var(--font-accent)", fontWeight: 700, color,
        fontSize: sizes[size] || sizes.md, lineHeight: 1.15,
      }}>
        {children}
      </span>
      {arrow !== "none" && (
        <svg width="52" height="40" viewBox="0 0 52 40" fill="none" stroke={color}
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{ transform: `rotate(${rot}deg)`, transformOrigin: "center", opacity: 0.9 }}>
          <path d="M4 6 C 18 4, 34 12, 44 30" />
          <polyline points="34 26 45 32 40 20" />
        </svg>
      )}
    </span>
  );
}
