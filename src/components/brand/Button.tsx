import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import './brand.css';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };
type NativeButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

export type ButtonProps = LinkProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', block, className, children, ...rest } = props;
  const classes = ['wf-btn', `wf-btn--${variant}`, `wf-btn--${size}`, block && 'wf-btn--block', className]
    .filter(Boolean)
    .join(' ');

  if (rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    );
  }
  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonRest} type={type} className={classes}>
      {children}
    </button>
  );
}
