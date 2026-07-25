import React from "react";
import { Card } from "./Card.jsx";
import { StarRating } from "../core/StarRating.jsx";

function Avatar({ src, name }) {
  const initials = (name || "?").split(" ").map((w) => w[0]).slice(0, 2).join("");
  return src ? (
    <img src={src} alt={name} width="48" height="48"
      style={{ width: 48, height: 48, borderRadius: "var(--radius-full)", objectFit: "cover", flex: "0 0 auto" }} />
  ) : (
    <span style={{
      width: 48, height: 48, borderRadius: "var(--radius-full)", flex: "0 0 auto",
      background: "var(--ec-blue-200)", color: "var(--color-brand)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontFamily: "var(--font-body)", fontSize: 16,
    }}>{initials}</span>
  );
}

/** Customer testimonial card: gold stars, sans-bold headline, quote body, and
 * an avatar + name + company footer. The building block of the reviews wall. */
export function TestimonialCard({ rating = 5, title, quote, name, company, avatar, style, ...rest }) {
  return (
    <Card padding="30px" style={{ display: "flex", flexDirection: "column", gap: "16px", boxSizing: "border-box", ...style }} {...rest}>
      <StarRating value={rating} size={19} />
      {title && (
        <h4 style={{
          fontFamily: "var(--font-body)", fontWeight: "var(--weight-bold)",
          fontSize: "20px", lineHeight: 1.25, color: "var(--text-heading)", margin: 0,
        }}>{title}</h4>
      )}
      <p style={{
        fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
        lineHeight: "var(--leading-relaxed)", color: "var(--text-body)", margin: 0, flex: 1,
      }}>{quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
        <Avatar src={avatar} name={name} />
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: "var(--weight-bold)", fontSize: "15px", color: "var(--text-heading)" }}>{name}</div>
          {company && <div style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-muted)" }}>{company}</div>}
        </div>
      </div>
    </Card>
  );
}
