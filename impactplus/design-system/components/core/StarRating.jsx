import React from "react";

const Star = ({ filled, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? "var(--star-rating)" : "none"}
    stroke={filled ? "var(--star-rating)" : "var(--ec-neutral-400)"} strokeWidth="1.5"
    strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/** Gold review-star rating row (as seen on testimonial cards). */
export function StarRating({ value = 5, max = 5, size = 20, style, ...rest }) {
  return (
    <div role="img" aria-label={`${value} out of ${max} stars`}
      style={{ display: "inline-flex", gap: "3px", ...style }} {...rest}>
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} filled={i < value} size={size} />
      ))}
    </div>
  );
}
