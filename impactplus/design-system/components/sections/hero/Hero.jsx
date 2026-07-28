import React from "react";
import { Button } from "../../core/Button.jsx";
import { Callout } from "../../core/Callout.jsx";

/** Page hero with an unboxed eyebrow, large General Sans headline, supporting
 * copy, and a governed primary/secondary CTA row. */
export function Hero({
  eyebrow, title, highlight, subtitle,
  primaryCta, primaryHref, secondaryCta, secondaryHref,
  callout, calloutArrow = "down-left",
  align = "center", onDark = false, style, children, ...rest
}) {
  const isCenter = align === "center";
  return (
    <section style={{
      background: onDark ? "var(--surface-dark)" : "transparent",
      color: onDark ? "var(--ec-white)" : "inherit",
      padding: "var(--section-py) var(--gutter)", position: "relative", ...style,
    }} {...rest}>
      <div style={{
        maxWidth: isCenter ? "860px" : "var(--container-max)", margin: "0 auto",
        display: "flex", flexDirection: "column", gap: "22px",
        alignItems: isCenter ? "center" : "flex-start", textAlign: isCenter ? "center" : "left",
      }}>
        {eyebrow && <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: onDark ? "var(--ec-blue-400)" : "var(--color-brand)" }}>{eyebrow}</span>}
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-display)", lineHeight: 1.08, color: onDark ? "var(--ec-white)" : "var(--text-heading)", margin: 0 }}>
          {title}{highlight && <> <span style={{ color: "var(--color-brand)" }}>{highlight}</span></>}
        </h1>
        {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-normal)", maxWidth: 620, color: onDark ? "rgba(255,255,255,0.85)" : "var(--text-body)", margin: 0 }}>{subtitle}</p>}
        {(primaryCta || secondaryCta) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "6px", justifyContent: isCenter ? "center" : "flex-start" }}>
            {primaryCta && <Button variant="primary" size="lg" withArrow href={primaryHref}>{primaryCta}</Button>}
            {secondaryCta && <Button variant={onDark ? "outline" : "dark"} size="lg" withArrow={false} href={secondaryHref}>{secondaryCta}</Button>}
          </div>
        )}
        {children}
        {callout && (
          <div style={{ position: "absolute", right: "6%", top: "34%", display: "none" }} data-hero-callout>
            <Callout arrow={calloutArrow} size="md" color={onDark ? "var(--ec-blue-400)" : "var(--color-brand)"}>{callout}</Callout>
          </div>
        )}
      </div>
    </section>
  );
}
