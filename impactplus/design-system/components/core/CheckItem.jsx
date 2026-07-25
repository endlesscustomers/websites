import React from "react";

const Check = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/** Benefit / checklist row with IMPACT's green circular check. */
export function CheckItem({ children, onDark = false, size = "md", style, ...rest }) {
  const dim = size === "sm" ? 20 : size === "lg" ? 30 : 26;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", ...style }} {...rest}>
      <span style={{
        flex: "0 0 auto", width: dim, height: dim, borderRadius: "var(--radius-full)",
        background: "var(--accent-check)", color: "var(--ec-white)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: "2px",
      }}>
        <Check size={dim * 0.62} />
      </span>
      <span style={{
        fontFamily: "var(--font-body)", fontSize: "var(--text-base)",
        lineHeight: "var(--leading-normal)",
        color: onDark ? "rgba(255,255,255,0.9)" : "var(--text-body)",
      }}>{children}</span>
    </div>
  );
}
