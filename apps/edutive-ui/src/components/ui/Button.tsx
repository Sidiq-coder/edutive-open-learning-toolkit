import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
}

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonLinkProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return (
    <a className={`button button--${variant} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
