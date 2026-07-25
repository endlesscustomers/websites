import React from "react";

function Item({ q, a, open, onToggle }) {
  return (
    <div style={{
      background: "var(--ec-livid-100)", borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-subtle)", overflow: "hidden",
    }}>
      <button onClick={onToggle} aria-expanded={open} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "20px", padding: "22px 24px", background: "transparent", border: "none",
        cursor: "pointer", textAlign: "left",
      }}>
        <span style={{
          fontFamily: "var(--font-heading)", fontWeight: "var(--weight-bold)",
          fontSize: "20px", lineHeight: 1.3, color: "var(--text-heading)",
        }}>{q}</span>
        <span style={{
          flex: "0 0 auto", width: 30, height: 30, borderRadius: "var(--radius-full)",
          border: "2px solid var(--text-heading)", color: "var(--text-heading)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "transform var(--dur-base) var(--ease-standard)",
          transform: open ? "rotate(45deg)" : "none",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
      </button>
      <div style={{
        maxHeight: open ? "600px" : "0", opacity: open ? 1 : 0,
        transition: "max-height var(--dur-slow) var(--ease-standard), opacity var(--dur-base) var(--ease-standard)",
        overflow: "hidden",
      }}>
        <div style={{
          padding: "0 24px 24px", fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)",
        }}>{a}</div>
      </div>
    </div>
  );
}

/** FAQ accordion — serif questions in light livid rows with a rotating +
 * toggle. Matches the site's "Frequently Asked Questions" section. */
export function FaqAccordion({ items = [], allowMultiple = false, defaultOpen = null, style, ...rest }) {
  const [openSet, setOpenSet] = React.useState(defaultOpen === null ? new Set() : new Set([defaultOpen]));
  const toggle = (i) => setOpenSet((prev) => {
    const next = new Set(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", ...style }} {...rest}>
      {items.map((it, i) => (
        <Item key={i} q={it.q} a={it.a} open={openSet.has(i)} onToggle={() => toggle(i)} />
      ))}
    </div>
  );
}
