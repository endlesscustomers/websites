import React from "react";
import { SectionHeading } from "../../core/SectionHeading.jsx";
import { CheckItem } from "../../core/CheckItem.jsx";

/** Dark qualifier band ("Is This Program Right for You?"): a centered heading on
 * the dark surface, a two-column green-check list, and an optional closing note.
 */
export function QualifierBand({
  title, highlight, subtitle, items = [], columns = 2, note, style, ...rest
}) {
  return (
    <section style={{ background: "var(--surface-dark)", padding: "var(--section-py) var(--gutter)", ...style }} {...rest}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <SectionHeading title={title} highlight={highlight} subtitle={subtitle} onDark />
        </div>
        <div style={{
          display: "grid", gap: "22px 48px", maxWidth: 900, margin: "0 auto",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}>
          {items.map((it, i) => <CheckItem key={i} onDark>{it}</CheckItem>)}
        </div>
        {note && (
          <p style={{ textAlign: "center", maxWidth: 720, margin: "40px auto 0", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", color: "rgba(255,255,255,0.7)" }}>{note}</p>
        )}
      </div>
    </section>
  );
}
