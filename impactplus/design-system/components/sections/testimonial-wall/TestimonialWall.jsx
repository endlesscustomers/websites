import React from "react";
import { SectionHeading } from "../../core/SectionHeading.jsx";
import { TestimonialCard } from "../../cards/TestimonialCard.jsx";

/** Testimonial wall: centered heading over the reviews.
 * - default: a responsive grid (`columns`).
 * - `carousel`: a horizontal scroll-snap track with prev/next controls,
 *   mirroring the site's rotating testimonial band. */
export function TestimonialWall({
  eyebrow, title, highlight, subtitle,
  testimonials = [], columns = 3, onMuted = true, carousel = false, perView = 3, children, style, ...rest
}) {
  const trackRef = React.useRef(null);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };
  return (
    <section style={{
      background: onMuted ? "var(--surface-muted)" : "transparent",
      padding: "var(--section-py) var(--gutter)", ...style,
    }} {...rest}>
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
        {(title || eyebrow) && (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: "var(--section-gap)", flexWrap: "wrap" }}>
            <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} align={carousel ? "left" : "center"} />
            {carousel && (
              <div style={{ display: "flex", gap: 10 }}>
                {[-1, 1].map((d) => (
                  <button key={d} onClick={() => scrollBy(d)} aria-label={d < 0 ? "Previous" : "Next"} style={{
                    width: 46, height: 46, borderRadius: "var(--radius-full)", border: "2px solid var(--text-heading)",
                    background: "transparent", color: "var(--text-heading)", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: d < 0 ? "rotate(180deg)" : "none" }}><polyline points="9 6 15 12 9 18" /></svg>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {carousel ? (
          <div ref={trackRef} style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: `calc((100% - ${(perView - 1) * 32}px) / ${perView})`, gap: 32, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 8, scrollbarWidth: "none" }}>
            {(children ? React.Children.toArray(children) : testimonials.map((t, i) => (
              <TestimonialCard key={i} rating={t.rating ?? 5} title={t.title} quote={t.quote} name={t.name} company={t.company} avatar={t.avatar} />
            ))).map((node, i) => <div key={i} style={{ scrollSnapAlign: "start" }}>{node}</div>)}
          </div>
        ) : (
          <div style={{ display: "grid", gap: "var(--grid-gap)", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, alignItems: "stretch" }}>
            {children || testimonials.map((t, i) => (
              <TestimonialCard key={i} rating={t.rating ?? 5} title={t.title} quote={t.quote} name={t.name} company={t.company} avatar={t.avatar} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
