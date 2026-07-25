import React from "react";

/** Long-form text block using IMPACT's two existing paragraph styles: an
 * optional larger "lead" paragraph (--text-lg / 20px) followed by default body
 * paragraphs (--text-base / 18px). Uses only tokens already in the site CSS —
 * no new type sizes. Mirrors the lead-then-body pattern across the site. */
export function Prose({ lead, paragraphs = [], align = "left", maxWidth, children, style, ...rest }) {
  return (
    <div style={{ maxWidth, textAlign: align, ...style }} {...rest}>
      {lead && (
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "var(--text-lg)",
          lineHeight: "var(--leading-normal)", color: "var(--text-heading)",
          margin: "0 0 22px",
        }}>{lead}</p>
      )}
      {paragraphs.map((p, i) => (
        <p key={i} style={{
          fontFamily: "var(--font-body)", fontSize: "var(--text-base)",
          lineHeight: "var(--leading-relaxed)", color: "var(--text-body)",
          margin: "0 0 1em",
        }}>{p}</p>
      ))}
      {children}
    </div>
  );
}
