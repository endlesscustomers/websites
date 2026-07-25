import React from "react";

/** Learning-Center article card: 16:9 thumbnail, sans-bold title, date, and an
 * optional author (avatar + name). Used in the "Recent Insights" carousel. */
export function BlogCard({ image, title, date, author, href, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href || "#"} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", flexDirection: "column", textDecoration: "none",
        background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)", overflow: "hidden",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-card)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
        height: "100%", ...style,
      }} {...rest}>
      <div style={{ width: "100%", aspectRatio: "16 / 9", background: "var(--ec-neutral-700)", overflow: "hidden" }}>
        {image && <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>
      <div style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: "var(--text-heading)", margin: 0 }}>{title}</h4>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", marginTop: "auto" }}>{date}</span>
        {author && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {author.avatar && <img src={author.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />}
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, color: "var(--text-heading)" }}>{author.name}</span>
          </div>
        )}
      </div>
    </a>
  );
}
