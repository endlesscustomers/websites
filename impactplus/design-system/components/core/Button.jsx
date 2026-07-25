import React from "react";

const ArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ flex: "0 0 auto" }}>
    <line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

const SIZES = {
  sm: { fontSize: "14px", padding: "9px 18px", gap: "7px" },
  md: { fontSize: "16px", padding: "12px 24px", gap: "8px" },
  lg: { fontSize: "18px", padding: "15px 32px", gap: "10px" },
};

/**
 * IMPACT button. Pill-shaped, Proxima-Nova bold. The blue "primary" and black
 * "dark" fills drive nearly every CTA on the site; "outline" appears on dark
 * bands; "link" is the inline arrow text-link ("Get a Free Chapter →").
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  withArrow = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const isLink = variant === "link";

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-bold)",
    fontSize: s.fontSize,
    lineHeight: 1.1,
    borderRadius: "var(--radius-pill)",
    border: "2px solid transparent",
    padding: s.padding,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: { background: "var(--color-brand)", color: "var(--ec-white)" },
    dark: { background: "var(--ec-neutral-700)", color: "var(--ec-white)" },
    secondary: { background: "var(--ec-green-400)", color: "var(--ec-neutral-700)" },
    outline: { background: "transparent", color: "currentColor", borderColor: "currentColor" },
    ghost: { background: "var(--ec-blue-100)", color: "var(--color-brand)" },
    link: {
      background: "transparent", color: "var(--text-heading)", borderRadius: 0,
      border: "none", padding: 0, fontWeight: "var(--weight-bold)",
    },
  };

  const styleObj = { ...base, ...(variants[variant] || variants.primary), ...style };

  const [hover, setHover] = React.useState(false);
  if (hover && !disabled) {
    if (variant === "primary") styleObj.background = "var(--color-brand-hover)";
    else if (variant === "dark") styleObj.background = "#000";
    else if (variant === "secondary") styleObj.background = "var(--ec-green-500)";
    else if (variant === "outline") styleObj.background = "rgba(255,255,255,0.12)";
    else if (variant === "ghost") styleObj.background = "var(--ec-blue-200)";
    else if (variant === "link") styleObj.textDecoration = "underline";
    if (!isLink) styleObj.transform = "translateY(-1px)";
  }

  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === "button" ? disabled : undefined}
      style={styleObj}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
      {withArrow && <ArrowRight size={size === "lg" ? 20 : 18} />}
    </Tag>
  );
}
