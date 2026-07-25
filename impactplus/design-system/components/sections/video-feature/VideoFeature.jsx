import React from "react";

/** Video feature block: a poster image with a centered play button and an
 * optional lower-left name/caption overlay (as on the testimonial player). */
export function VideoFeature({ poster, label, sublabel, onPlay, radius = "var(--radius-lg)", style, ...rest }) {
  return (
    <div onClick={onPlay} role="button" aria-label={label ? `Play video: ${label}` : "Play video"}
      style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: radius, overflow: "hidden", cursor: "pointer", background: "var(--ec-neutral-700)", ...style }} {...rest}>
      {poster && <img src={poster} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.35))" }} />
      <span style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 74, height: 74, borderRadius: "50%", background: "var(--color-brand)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)",
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><polygon points="7 5 20 12 7 19" /></svg>
      </span>
      {label && (
        <div style={{ position: "absolute", left: 20, bottom: 18, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.5)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.1 }}>{label}</div>
          {sublabel && <div style={{ fontFamily: "var(--font-body)", fontSize: 14, opacity: 0.9 }}>{sublabel}</div>}
        </div>
      )}
    </div>
  );
}
