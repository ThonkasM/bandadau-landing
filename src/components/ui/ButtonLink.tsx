import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const VARIANTS = {
  primary: 'bg-action-primary text-action-primary-fg hover:bg-action-primary-hover active:bg-action-primary-pressed shadow-md',
  secondary: 'border border-strong bg-surface text-primary hover:bg-surface-muted',
  inverse: 'bg-surface text-primary hover:bg-surface-muted shadow-md',
  ghost: 'border border-current text-inherit hover:bg-surface/10',
} as const;

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof VARIANTS;
  size?: 'md' | 'lg';
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      {...rest}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors',
        size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
