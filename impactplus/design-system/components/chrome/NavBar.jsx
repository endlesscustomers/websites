import React from "react";
import { Button } from "../core/Button.jsx";

const LOGO_WHITE = "https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/White%20Logo%20-%20Full/IMPACT-Logo--White-Full.png";
const LOGO_BLACK = "https://www.impactplus.com/hubfs/Black%20Logo%20-%20Full/IMPACT-logo--Black-contained.svg";

const Caret = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}><polyline points="6 9 12 15 18 9"/></svg>
);

const DEFAULT_LINKS = ["Learn The System", "Get Coaching", "Experience The Conference"];

/** Global site header, matched to the live impactplus.com navigation:
 * a full-width bar with a centered fixed-width container (default 1320px) --
 * IMPACT logo + tagline on the left, the main menu items CENTERED and slightly
 * larger (16.5px), and Login + the blue "Schedule Call" CTA on the right.
 * Dark by default (as on marketing pages). Updated 2026-07-23 per Bob. */
export function NavBar({
  links = DEFAULT_LINKS, onDark = true, ctaLabel = "Schedule Call",
  ctaHref, loginHref, maxWidth = "var(--container-max, 1150px)", ctaVariant = "primary", style, ...rest
}) {
  const fg = onDark ? "var(--ec-white)" : "var(--text-heading)";
  return (
    <header style={{
      background: onDark ? "var(--ec-neutral-700)" : "var(--ec-white)",
      borderBottom: onDark ? "none" : "1px solid var(--border-subtle)", ...style,
    }} {...rest}>
      <div style={{
        maxWidth, margin: "0 auto", display: "flex", alignItems: "center",
        gap: "28px", padding: "18px 0",
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, flex: "0 0 auto" }}>
          <img src={onDark ? LOGO_WHITE : LOGO_BLACK} alt="IMPACT" style={{ height: 32 }} />
          <span style={{ width: 1, height: 32, background: onDark ? "rgba(255,255,255,0.3)" : "var(--border-subtle)" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.25, color: fg, maxWidth: 130 }}>
            Coaching &amp; Training for Endless Customers
          </span>
        </a>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "38px", flex: "1 1 auto", minWidth: 0 }}>
          {links.map((l, i) => (
            <a key={i} href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 6, color: fg,
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16.5,
              textDecoration: "none", whiteSpace: "nowrap",
            }}>{l} <Caret /></a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flex: "0 0 auto" }}>
          <a href={loginHref || "#"} style={{ color: fg, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16.5, textDecoration: "none" }}>Login</a>
          <Button variant={ctaVariant} withArrow href={ctaHref}>{ctaLabel}</Button>
        </div>
      </div>
    </header>
  );
}
