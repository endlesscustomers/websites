import React from "react";

/** Section heading block: optional eyebrow, serif title with an optional
 * highlighted phrase, and a body-sans subtitle. Mirrors the site's centered
 * "What You'll Get" / "Frequently Asked Questions" headers. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,          // phrase rendered in brand blue after the title
  subtitle,
  align = "center",   // center | left
  onDark = false,
  style,
  ...rest
}) {
  const isCenter = align === "center";
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "16px",
      alignItems: isCenter ? "center" : "flex-start",
      textAlign: isCenter ? "center" : "left",
      maxWidth: isCenter ? "760px" : "none",
      marginInline: isCenter ? "auto" : 0, ...style,
    }} {...rest}>
      {eyebrow && (
        <span style={{
          fontFamily: "var(--font-body)", fontWeight: "var(--weight-bold)",
          fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--color-brand)",
        }}>{eyebrow}</span>
      )}
      <h2 style={{
        fontFamily: "var(--font-heading)", fontWeight: "var(--weight-bold)",
        fontSize: "var(--text-h2)", lineHeight: "var(--leading-tight)",
        color: onDark ? "var(--ec-white)" : "var(--text-heading)", margin: 0,
      }}>
        {title}{highlight && <> <span style={{ color: "var(--color-brand)" }}>{highlight}</span></>}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "var(--text-lg)",
          lineHeight: "var(--leading-normal)", margin: 0,
          color: onDark ? "rgba(255,255,255,0.82)" : "var(--text-body)",
          maxWidth: "640px",
        }}>{subtitle}</p>
      )}
    </div>
  );
}
