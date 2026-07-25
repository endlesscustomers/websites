import React from "react";
import { Button } from "../../core/Button.jsx";

/** Full-width closing CTA band ("Ready to take control?"): centered heading +
 * subtitle + CTAs. Renders on the dark surface, or over a background photo with
 * a dark scrim when `imageSrc` is set. */
export function CtaBand({
  title, highlight, subtitle,
  primaryCta, primaryHref, secondaryCta, secondaryHref,
  imageSrc, style, ...rest
}) {
  const hasImage = Boolean(imageSrc);
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: hasImage ? "var(--ec-neutral-700)" : "var(--surface-dark)",
      padding: "var(--section-py-lg) var(--gutter)", ...style,
    }} {...rest}>
      {hasImage && <>
        <img src={imageSrc} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,20,28,.72), rgba(15,20,28,.82))" }} />
      </>}
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h1)", lineHeight: 1.12, color: "var(--ec-white)", margin: 0 }}>
          {title}{highlight && <> <span style={{ color: "var(--ec-blue-400)" }}>{highlight}</span></>}
        </h2>
        {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-normal)", color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: 600 }}>{subtitle}</p>}
        {(primaryCta || secondaryCta) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginTop: "6px" }}>
            {primaryCta && <Button variant="primary" size="lg" withArrow href={primaryHref}>{primaryCta}</Button>}
            {secondaryCta && <Button variant="outline" size="lg" href={secondaryHref} style={{ color: "#fff" }}>{secondaryCta}</Button>}
          </div>
        )}
      </div>
    </section>
  );
}
