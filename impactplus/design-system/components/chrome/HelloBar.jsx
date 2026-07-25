import React from "react";
import { Button } from "../core/Button.jsx";

/** Promo "hello bar" that sits under the header — a centered announcement with
 * an outline CTA and a dismiss control. */
export function HelloBar({ message, highlight, ctaLabel = "Register Now", ctaHref, onClose, style, ...rest }) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: "18px",
      padding: "12px 24px", background: "var(--color-brand)", color: "var(--ec-white)",
      fontFamily: "var(--font-body)", position: "relative", ...style,
    }} {...rest}>
      <span style={{ fontSize: 15, fontWeight: 600 }}>
        <strong style={{ color: "#fff", fontWeight: 800 }}>{message}</strong>{highlight && <> {highlight}</>}
      </span>
      <Button variant="outline" size="sm" href={ctaHref} style={{ color: "#fff" }}>{ctaLabel}</Button>
      <button onClick={() => { setOpen(false); onClose && onClose(); }} aria-label="Dismiss"
        style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", cursor: "pointer", opacity: 0.85 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
      </button>
    </div>
  );
}
