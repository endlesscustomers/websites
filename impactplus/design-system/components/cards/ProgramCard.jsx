import React from "react";
import { Card } from "./Card.jsx";
import { Button } from "../core/Button.jsx";

/** The homepage's three-up "program" card: a centered logo lockup, a dark pill
 * CTA, and an underlined secondary text-link. */
export function ProgramCard({ logoSrc, logoAlt = "", ctaLabel = "Learn More", ctaHref, linkLabel, linkHref, style, ...rest }) {
  return (
    <Card hoverable padding="30px 26px" style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: "22px",
      textAlign: "center", height: "100%", ...style,
    }} {...rest}>
      <div style={{ minHeight: 60, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        {logoSrc
          ? <img src={logoSrc} alt={logoAlt} style={{ maxHeight: 60, maxWidth: "90%", objectFit: "contain" }} />
          : <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 22, color: "var(--text-heading)", letterSpacing: "0.02em" }}>{logoAlt}</span>}
      </div>
      <Button variant="dark" withArrow href={ctaHref}>{ctaLabel}</Button>
      {linkLabel && (
        <a href={linkHref} style={{
          fontFamily: "var(--font-body)", fontWeight: "var(--weight-bold)",
          fontSize: "15px", color: "var(--text-heading)", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>{linkLabel} <span aria-hidden="true">→</span></a>
      )}
    </Card>
  );
}
