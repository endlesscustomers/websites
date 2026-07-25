import React from "react";
import { Card } from "./Card.jsx";

/** "Meet Your Team" role card: a large circular photo above a serif role title
 * and a short description. Centered. */
export function TeamCard({ avatar, role, children, style, ...rest }) {
  return (
    <Card padding="34px 26px" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px", ...style }} {...rest}>
      {avatar
        ? <img src={avatar} alt={role} style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover" }} />
        : <span style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--ec-livid-300)" }} />}
      <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, color: "var(--text-heading)", margin: 0 }}>{role}</h4>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)", margin: 0 }}>{children}</p>
    </Card>
  );
}
