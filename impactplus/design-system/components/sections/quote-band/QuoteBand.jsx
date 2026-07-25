import React from "react";

/** Large serif pull-quote band. Big Merriweather quote, optional attribution,
 * on a light livid or dark surface. Mirrors the "Our coach brought our teams
 * together..." homepage band. */
export function QuoteBand({ quote, name, title, variant = "muted", style, ...rest }) {
  const dark = variant === "dark";
  return (
    <section style={{
      background: dark ? "var(--surface-dark)" : variant === "muted" ? "var(--surface-muted)" : "transparent",
      padding: "var(--section-py) var(--gutter)", ...style,
    }} {...rest}>
      <figure style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <blockquote style={{
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 40px)",
          lineHeight: 1.28, color: dark ? "var(--ec-white)" : "var(--text-heading)", margin: 0,
        }}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        {(name || title) && (
          <figcaption style={{ marginTop: 28, fontFamily: "var(--font-body)" }}>
            {name && <div style={{ fontWeight: 700, fontSize: 17, color: dark ? "var(--ec-white)" : "var(--text-heading)" }}>{name}</div>}
            {title && <div style={{ fontSize: 15, color: dark ? "rgba(255,255,255,0.7)" : "var(--text-muted)", marginTop: 2 }}>{title}</div>}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
