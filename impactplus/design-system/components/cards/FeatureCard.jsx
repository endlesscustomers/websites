import React from "react";
import { Card } from "./Card.jsx";

/** IMPACT's own hand-drawn icon set (served from the HubSpot CDN). Pass the
 * key via `iconName` to render the real brand glyph. */
const HAND_ICON = (name) =>
  `https://www.impactplus.com/hubfs/Hand-drawn%20Icons/${name}.svg`;
export const FEATURE_ICONS = {
  team: "Team", alignment: "Alignment", hiring: "Hiring", content: "Content",
  hubspot: "HubSpot", ai: "AI", video: "Video", website: "Website",
  onCamera: "On-Camera-Performance", sales: "Sales-Training",
  endlessCustomers: "Endless-Customers", moreSales: "More-Sales",
  salesPerformance: "Improved-Sales-Performance", targetBuyer: "Target-Buyer",
  strategy: "Strategy",
};

/** Icon feature card ("What You'll Get / Gain" grid): the brand hand-drawn icon
 * in a soft-blue tile, a sans-bold title, and optional supporting copy.
 * - `iconName` renders one of IMPACT's hand-drawn glyphs (see FEATURE_ICONS).
 * - `icon` overrides with any custom node.
 * - `titleOnly` drops the body copy (the "What You'll Gain" layout). */
export function FeatureCard({ icon, iconName, title, children, titleOnly = false, style, ...rest }) {
  const glyph = icon
    ? icon
    : iconName && FEATURE_ICONS[iconName]
      ? <img src={HAND_ICON(FEATURE_ICONS[iconName])} alt="" style={{ width: 34, height: 34, objectFit: "contain" }} />
      : <span style={{ width: 12, height: 12, borderRadius: "50%", background: "currentColor" }} />;
  return (
    <Card hoverable padding="26px" style={{ display: "flex", flexDirection: "column", gap: titleOnly ? "16px" : "14px", ...style }} {...rest}>
      <span style={{
        width: 56, height: 56, borderRadius: "var(--radius-md)",
        background: "var(--ec-blue-100)", color: "var(--color-brand)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto",
      }}>{glyph}</span>
      <h4 style={{
        fontFamily: "var(--font-body)", fontWeight: "var(--weight-bold)",
        fontSize: titleOnly ? "20px" : "19px", lineHeight: 1.3, color: "var(--text-heading)", margin: 0,
      }}>{title}</h4>
      {!titleOnly && children && (
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
          lineHeight: "var(--leading-normal)", color: "var(--text-body)", margin: 0,
        }}>{children}</p>
      )}
    </Card>
  );
}
