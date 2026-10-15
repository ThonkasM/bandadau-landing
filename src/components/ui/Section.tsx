import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const TONES = {
  default: 'bg-canvas',
  muted: 'bg-surface-muted',
} as const;

export function Section({
  id,
  tone = 'default',
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: keyof typeof TONES;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('scroll-mt-20 py-16 sm:py-20 lg:py-24', TONES[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p className="text-sm font-semibold uppercase tracking-widest text-link">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-lg leading-relaxed text-secondary">{subtitle}</p> : null}
    </div>
  );
}
