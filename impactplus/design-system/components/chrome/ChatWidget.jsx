import React from "react";

const AI_ICON = "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/icons/white/ai_icon_chat.svg";

/** "Ecee" AI chat launcher — the fixed purple→pink gradient bubble and its
 * speech-tooltip that appear bottom-right on every page. */
export function ChatWidget({ name = "Ecee", message = "I'm Ecee, an AI Chatbot here to help you find what you need.", showTooltip = true, style, ...rest }) {
  const [tip, setTip] = React.useState(showTooltip);
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, zIndex: 60, fontFamily: "var(--font-body)", ...style }} {...rest}>
      {tip && (
        <div style={{
          position: "relative", background: "var(--ec-white)", color: "var(--text-body)",
          border: "2px solid var(--color-brand)", borderRadius: "var(--radius-lg)",
          padding: "14px 34px 14px 16px", maxWidth: 300, fontSize: 14, lineHeight: 1.4,
          boxShadow: "var(--shadow-card)",
        }}>
          <span aria-hidden="true">👋</span> <strong style={{ color: "var(--text-heading)" }}>Have a question?</strong> {message}
          <button onClick={() => setTip(false)} aria-label="Close" style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 16, lineHeight: 1 }}>×</button>
        </div>
      )}
      <button aria-label={`Chat with ${name}`} onClick={() => setTip((v) => !v)} style={{
        width: 60, height: 60, borderRadius: "var(--radius-full)", border: "none", cursor: "pointer",
        background: "var(--ec-grad-ai-chat)", boxShadow: "var(--shadow-md)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <img src={AI_ICON} alt="" style={{ width: 28, height: 28 }} />
      </button>
    </div>
  );
}
