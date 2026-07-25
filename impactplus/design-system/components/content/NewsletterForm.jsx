import React from "react";
import { Button } from "../core/Button.jsx";

/** Inline email capture form (newsletter / free-chapter). Rounded field + pill
 * submit; lays out inline on wide viewports, stacked when narrow. */
export function NewsletterForm({
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  onDark = false,
  layout = "inline",   // inline | stacked
  onSubmit,
  style,
  ...rest
}) {
  const [email, setEmail] = React.useState("");
  const submit = (e) => { e.preventDefault(); onSubmit && onSubmit(email); };
  return (
    <form onSubmit={submit} style={{
      display: "flex", flexDirection: layout === "stacked" ? "column" : "row",
      gap: "12px", width: "100%", maxWidth: 520, ...style,
    }} {...rest}>
      <input
        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder} aria-label="Email address"
        style={{
          flex: 1, minWidth: 0, fontFamily: "var(--font-body)", fontSize: "var(--text-base)",
          padding: "14px 18px", borderRadius: "var(--radius-pill)",
          border: "1.5px solid " + (onDark ? "transparent" : "var(--border-subtle)"),
          background: onDark ? "var(--ec-white)" : "var(--surface-field)",
          color: "var(--text-heading)", outline: "none",
        }}
      />
      <Button variant="primary" type="submit">{buttonLabel}</Button>
    </form>
  );
}
