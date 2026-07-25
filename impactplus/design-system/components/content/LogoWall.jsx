import React from "react";

/** Grayscale client-logo wall with an optional heading. Logos render muted and
 * de-saturated, matching the "Companies Growing With IMPACT" band. */
export function LogoWall({ logos = [], grayscale = true, style, ...rest }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center",
      gap: "48px", ...style,
    }} {...rest}>
      {logos.map((l, i) => (
        <img key={i} src={l.src} alt={l.alt || ""}
          style={{
            height: l.height || 44, maxWidth: 180, objectFit: "contain",
            filter: grayscale ? "grayscale(1)" : "none",
            opacity: grayscale ? 0.55 : 1,
          }} />
      ))}
    </div>
  );
}
