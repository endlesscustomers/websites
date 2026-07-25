import React from "react";
import { Button } from "../core/Button.jsx";
import { CheckItem } from "../core/CheckItem.jsx";

/** One-time / kickoff price highlight block: eyebrow + title, one or two price
 * lines, a "What's Included" checklist, and an image. Mirrors the pricing
 * page's "Kickoff & Alignment Day" section. */
export function PriceHighlight({
  eyebrow, title, prices = [], includes = [], includesTitle = "What's Included:",
  imageSrc, imageAlt = "", reverse = false, cta, style, ...rest
}) {
  const text = (
    <div style={{ flex: "1 1 0", minWidth: 0 }}>
      {eyebrow && <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-brand)", marginBottom: 12 }}>{eyebrow}</div>}
      {title && <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h3)", lineHeight: 1.15, color: "var(--text-heading)", margin: "0 0 18px" }}>{title}</h3>}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
        {prices.map((p, i) => (
          <div key={i} style={{ fontFamily: "var(--font-body)", fontSize: 20, fontWeight: 700, color: "var(--text-heading)" }}>
            {p.label && <span style={{ fontWeight: 600, color: "var(--text-body)" }}>{p.label}: </span>}
            <span style={{ color: "var(--color-brand)" }}>{p.amount}</span>
          </div>
        ))}
      </div>
      {includesTitle && includes.length > 0 && <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, color: "var(--text-heading)", marginBottom: 14 }}>{includesTitle}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {includes.map((it, i) => <CheckItem key={i} size="sm">{it}</CheckItem>)}
      </div>
      {cta && <div style={{ marginTop: 26 }}>{cta}</div>}
    </div>
  );
  const media = (
    <div style={{ flex: "0 0 40%", minWidth: 0 }}>
      {imageSrc
        ? <img src={imageSrc} alt={imageAlt} style={{ width: "100%", objectFit: "contain" }} />
        : <div style={{ width: "100%", aspectRatio: "1 / 1", background: "var(--ec-livid-200)", borderRadius: "var(--radius-lg)" }} />}
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 56, alignItems: "center", maxWidth: "var(--container-max)", margin: "0 auto", ...style }} {...rest}>
      {reverse ? <>{media}{text}</> : <>{text}{media}</>}
    </div>
  );
}
