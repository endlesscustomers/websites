import * as React from "react";

export interface DoodleIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Source folder inside the pack, such as "interface" or "hand gestures". */
  category: string;
  /** Source filename without its extension, such as "bulb" or "thumbs-up". */
  name: string;
  /** Prefer SVG. PNG is provided only as a fallback. @default "svg" */
  format?: "svg" | "png";
  /** Public base URL after the assets are uploaded. */
  basePath?: string;
  /** CSS length or pixel number. @default 72 */
  size?: number | string;
  /** Required when the icon communicates meaning. */
  label?: string;
  /** Decorative icons are removed from the accessibility tree. */
  decorative?: boolean;
}

export function DoodleIcon(props: DoodleIconProps): JSX.Element;
export const DOODLE_ICON_BASE_PATH: string;
