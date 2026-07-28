import React from "react";

/** Long-form text block using IMPACT's two governed paragraph roles: an
 * optional larger lead paragraph (--prose-lead / 23px/34px desktop, 20px/30px mobile)
 * followed by standard body paragraphs (--prose-body / 16px/24px in V2). */
export function Prose({ lead, paragraphs = [], align = "left", maxWidth, children, style, ...rest }) {
  return (
    <div style={{ maxWidth, textAlign: align, ...style }} {...rest}>
      {lead && (
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "var(--prose-lead)",
          lineHeight: "var(--v2-prose-lead-leading, var(--leading-normal))", color: "var(--text-heading)",
          fontWeight: "var(--weight-regular)",
          margin: "0 0 22px",
        }}>{lead}</p>
      )}
      {paragraphs.map((p, i) => (
        <p key={i} style={{
          fontFamily: "var(--font-body)", fontSize: "var(--prose-body)",
          lineHeight: "var(--v2-prose-body-leading, var(--leading-relaxed))", color: "var(--text-body)",
          margin: "0 0 1em",
        }}>{p}</p>
      ))}
      {children}
    </div>
  );
}
