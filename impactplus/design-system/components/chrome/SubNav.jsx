import React from "react";
import { Button } from "../core/Button.jsx";

function NavLink({ label, href, active }) {
  const [hover, setHover] = React.useState(false);
  const linkRef = React.useRef(null);
  React.useEffect(() => {
    if (!active) return undefined;
    const frame = window.requestAnimationFrame(() => {
      linkRef.current?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [active]);
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
    <a ref={linkRef} className={`impact-subnav__link${active ? " is-active" : ""}`}
      href={href} aria-current={active ? "location" : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, background: bg, color }}>{label}</a>
  );
}

/** Sticky secondary/section nav (as on the coaching + service pages): a product
 * label (or logo) on the left, horizontally scrollable in-page anchors, and a
 * black CTA on the right. V2 presents the inner rail as a floating white pill
 * and uses a brand-tinted active state rather than competing black pills. */
export function SubNav({
  logoSrc, label = "", links = [], activeHref, ctaLabel = "Schedule Call", ctaHref,
  sticky = true, style, ...rest
}) {
  return (
    <div className="impact-subnav" style={{
      position: sticky ? "sticky" : "static", top: 0, zIndex: 40,
      background: "transparent", borderBottom: 0,
      boxShadow: "none", ...style,
    }} {...rest}>
      <div className="impact-subnav__inner" style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div className="impact-subnav__brand" style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
          {logoSrc
            ? <img src={logoSrc} alt={label} style={{ height: 26, objectFit: "contain" }} />
            : <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "var(--text-heading)" }}>{label}</span>}
        </div>
        <nav className="impact-subnav__links" aria-label={`${label || "Page"} sections`} style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 auto", justifyContent: "center", overflowX: "auto" }}>
          {links.map((l, i) => (
            <NavLink key={i} label={l.label} href={l.href} active={l.href === activeHref} />
          ))}
        </nav>
        {ctaLabel && <div className="impact-subnav__cta" style={{ flex: "0 0 auto" }}><Button variant="dark" size="sm" withArrow href={ctaHref}>{ctaLabel}</Button></div>}
      </div>
    </div>
  );
}
