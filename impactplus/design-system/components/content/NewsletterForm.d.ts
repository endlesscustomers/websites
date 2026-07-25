import * as React from "react";
/** Inline email capture form (newsletter / free-chapter CTA). */
export interface NewsletterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  /** @default "Enter your email" */
  placeholder?: string;
  /** @default "Subscribe" */
  buttonLabel?: string;
  /** Style for dark bands. @default false */
  onDark?: boolean;
  /** @default "inline" */
  layout?: "inline" | "stacked";
  onSubmit?: (email: string) => void;
}
export function NewsletterForm(props: NewsletterFormProps): JSX.Element;
