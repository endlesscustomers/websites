import * as React from "react";
/** The "Ecee" AI chat launcher — fixed gradient bubble + speech tooltip. */
export interface ChatWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "Ecee" */
  name?: string;
  message?: string;
  /** Show the tooltip on mount. @default true */
  showTooltip?: boolean;
}
export function ChatWidget(props: ChatWidgetProps): JSX.Element;
