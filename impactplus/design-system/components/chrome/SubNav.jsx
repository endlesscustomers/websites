import React from "react";
import { Button } from "../core/Button.jsx";

function NavLink({ label, href, active }) {
  const [hover, setHover] = React.useState(false);
  const base = {
    fontFamily: "var(--font-body)", fontWeight: active ? 700 : 600, fontSize: 15,
    textDecoration: "none", whiteSpace: "nowrap", padding: "9px 18px",
    borderRadius: "var(--radius-pill)", lineHeight: 1,
    transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
  };
  let bg = "transparent", color = "var(--ec-slate-500)";
  if (active) { bg = "var(--ec-neutral-700)"; color = "var(--ec-white)"; }
  else if (hover) { bg = "var(--ec-neutral-100)"; color = "var(--text-heading)"; }
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, background: bg, color }}>{label}</a>
  );
}

/** Sticky secondary/section nav (as on the coaching + service pages): a product
 * label (or logo) on the left, in-page anchor links in the middle with the
 * active item shown as a dark rounded pill, and a Schedule Call CTA on the
 * right. */
export function SubNav({
  logoSrc, label = "", links = [], activeHref, ctaLabel = "Schedule Call", ctaHref,
  sticky = true, style, ...rest
}) {
  return (
    <div style={{
      position: sticky ? "sticky" : "static", top: 0, zIndex: 40,
      background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-xs)", ...style,
    }} {...rest}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
          {logoSrc
            ? <img src={logoSrc} alt={label} style={{ height: 26, objectFit: "contain" }} />
            : <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "var(--text-heading)" }}>{label}</span>}
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 auto", justifyContent: "center", overflowX: "auto" }}>
          {links.map((l, i) => (
            <NavLink key={i} label={l.label} href={l.href} active={l.href === activeHref} />
          ))}
        </nav>
        {ctaLabel && <div style={{ flex: "0 0 auto" }}><Button variant="primary" size="sm" href={ctaHref}>{ctaLabel}</Button></div>}
      </div>
    </div>
  );
}
