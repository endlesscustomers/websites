import React from "react";

/** Two-column "step" section: an eyebrow + serif title + rich body on one side,
 * an image on the other. Mirrors the How-it-Works step layout.
 * - `reverse` puts the image first (alternate down a page).
 * - `step` renders a "STEP N" label above the title and a big ghosted number
 *   watermark — the numbered How-it-Works pattern.
 * - `divider` draws a hairline rule above the block. */
export function SplitFeature({
  eyebrow, title, children, imageSrc, imageAlt = "",
  reverse = false, mask = "arch", step, divider = false, cta, style, ...rest
}) {
  const radius = mask === "arch" ? "260px 260px 24px 24px" : "var(--radius-lg)";
  const media = (
    <div style={{ flex: "1 1 0", minWidth: 0, position: "relative" }}>
      {imageSrc
        ? <img src={imageSrc} alt={imageAlt} style={{ width: "100%", height: "100%", maxHeight: 520, objectFit: "cover", borderRadius: radius }} />
        : <div style={{ width: "100%", paddingTop: "110%", background: "var(--ec-livid-200)", borderRadius: radius }} />}
    </div>
  );
  const text = (
    <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      {step != null && (
        <span aria-hidden="true" style={{
          position: "absolute", top: -46, left: -6, fontFamily: "var(--font-heading)",
          fontWeight: 900, fontSize: 120, lineHeight: 1, color: "var(--ec-livid-200)", zIndex: 0,
        }}>{String(step).padStart(2, "0")}</span>
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {(step != null || eyebrow) && (
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: step != null ? "var(--color-brand)" : "var(--text-heading)", marginBottom: 14 }}>
            {step != null ? `Step ${step}` : eyebrow}
          </span>
        )}
        {title && <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h2)", lineHeight: 1.12, color: "var(--text-heading)", margin: "0 0 20px" }}>{title}</h2>}
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)" }}>{children}</div>
        {cta && <div style={{ marginTop: 24 }}>{cta}</div>}
      </div>
    </div>
  );
  return (
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", ...style }} {...rest}>
      {divider && <hr style={{ border: 0, borderTop: "1px solid var(--border-subtle)", margin: "0 0 56px" }} />}
      <div style={{ display: "flex", gap: "64px", alignItems: "center" }}>
        {reverse ? <>{media}{text}</> : <>{text}{media}</>}
      </div>
    </div>
  );
}
