import React from "react";

const LOGO_BLACK = "https://www.impactplus.com/hubfs/Black%20Logo%20-%20Full/IMPACT-logo--Black-contained.svg";

const DEFAULT_COLUMNS = [
  { title: "Learn Endless Customers", links: ["What is Endless Customers", "How to Implement", "Buy the Book", "Learning Center"] },
  { title: "Endless Customers Tools", links: ["90-Day Starter Guide", "Endless Customers GPTs", "Endless Customers Toolkit", "All Guides & Downloads"] },
  { title: "Recurring Content", links: ["Endless Customers Podcast", "Webinars"] },
  { title: "Endless Customers Live", links: ["Hartford 2026", "Become a Sponsor"] },
  { title: "Popular Resources", links: ["Digital Marketing Strategy", "Sales Process Optimization", "Using AI for Marketing", "Content Marketing Strategy", "Video Marketing", "Building a Marketing Team"] },
  { title: "Coaching Program", links: ["Overview & Pricing", "Success Stories"] },
  { title: "Services", links: ["Alignment Day", "HubSpot Training", "Website Redesign", "Website Optimization", "Learning Center Builds", "TRUST Theme", "Self-Service Tool Builds", "Paid Media Management"] },
  { title: "About Us", links: ["Our Company", "Meet the Team", "Our Partners", "Careers", "Contact"] },
];

/** Site footer: link columns, brand lockup + address, social row, legal line.
 * On IMPACT's near-white footer background. */
export function Footer({ columns = DEFAULT_COLUMNS, address = "125 Commerce Court, Suite 9\nCheshire, CT, 06410\n(203) 265-4377", style, ...rest }) {
  return (
    <footer style={{ background: "var(--surface-page)", borderTop: "1px solid var(--border-subtle)", padding: "64px 40px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "32px 24px", maxWidth: 1280, margin: "0 auto" }}>
        {columns.map((col, i) => (
          <div key={i}>
            <h5 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, color: "var(--text-heading)", margin: "0 0 14px" }}>{col.title}</h5>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l, j) => (
                <li key={j}><a href="#" style={{ fontSize: 14, color: "var(--text-body)", textDecoration: "none" }}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, maxWidth: 1280, margin: "48px auto 0", paddingTop: 28, borderTop: "1px solid var(--border-subtle)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <img src={LOGO_BLACK} alt="IMPACT" style={{ height: 34 }} />
          <div style={{ fontSize: 13, color: "var(--text-muted)", whiteSpace: "pre-line", lineHeight: 1.5 }}>{address}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {["Facebook", "LinkedIn", "Instagram", "YouTube", "TikTok", "Spotify"].map((s, i) => (
            <span key={i} title={s} style={{ width: 34, height: 34, borderRadius: "var(--radius-full)", background: "var(--ec-neutral-700)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{s[0]}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 1280, margin: "24px auto 0", flexWrap: "wrap" }}>
        {["HubSpot Elite Solutions Partner", "We Run on EOS"].map((b, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-body)" }}>{b}</span>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: "24px auto 0", display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13, color: "var(--text-muted)" }}>
        <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Privacy Policy</a>
        <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Brand Guidelines</a>
        <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Trademarks</a>
        <span style={{ marginLeft: "auto" }}>© 2026 IMPACT, All Rights Reserved.</span>
      </div>
    </footer>
  );
}
