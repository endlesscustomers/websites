import React from "react";

const DEFAULT_BASE_PATH = "/design-system/assets/icons/doodle";

const encodePathSegment = (value) => encodeURIComponent(String(value).trim());
const resolvePreviewPath = (value) => (
  typeof window !== "undefined"
  && window.location.pathname.startsWith("/websites/impactplus/")
  && value?.startsWith("/")
  && !value.startsWith("//")
    ? `/websites/impactplus${value}`
    : value
);

/**
 * Colorable wrapper for the governed doodle icon library. The source artwork
 * stays external; CSS masking lets each monochrome icon inherit `color`.
 */
export function DoodleIcon({
  category,
  name,
  format = "svg",
  basePath = DEFAULT_BASE_PATH,
  size = 72,
  label,
  decorative,
  className,
  style,
  ...rest
}) {
  const isDecorative = decorative ?? !label;
  const source = `${resolvePreviewPath(basePath)}/${format}/${encodePathSegment(category)}/${encodePathSegment(name)}.${format}`;
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={["v2-doodle-icon", className].filter(Boolean).join(" ")}
      role={isDecorative ? undefined : "img"}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={isDecorative ? undefined : label}
      data-doodle-icon={`${category}/${name}`}
      style={{
        "--v2-doodle-icon-source": `url("${source}")`,
        "--v2-doodle-icon-size": dimension,
        ...style,
      }}
      {...rest}
    />
  );
}

export const DOODLE_ICON_BASE_PATH = DEFAULT_BASE_PATH;
