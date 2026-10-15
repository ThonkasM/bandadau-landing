import type { ReactNode } from 'react';

import { Reveal } from '@/components/common/Reveal';
import { cn } from '@/lib/cn';

const TONES = {
  default: 'bg-canvas text-primary',
  muted: 'bg-surface-muted text-primary',
  /** Superficie de marca: se muestra como una banda redondeada sobre el fondo. */
  brand: 'bg-action-primary text-action-primary-fg',
} as const;

export type SectionTone = keyof typeof TONES;

/**
 * Sección con ritmo vertical coherente. Todas comparten el mismo contenedor (`container-page`),
 * así los bordes laterales coinciden con los de la navbar, el hero y el footer.
 * `brand` se dibuja inset y con esquinas redondeadas.
 */
export function Section({
  id,
  tone = 'default',
  className,
  containerClassName,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const inset = tone === 'brand';
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative overflow-clip px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32',
        TONES[tone],
        inset && 'mx-3 rounded-[2rem] sm:mx-6 lg:mx-8',
        className,
      )}
    >
      <div className={cn('relative mx-auto w-full max-w-[clamp(80rem,85vw,104rem)]', containerClassName)}>{children}</div>
    </section>
  );
}

/** Encabezado de sección: eyebrow con número de capítulo, título con acento (`<em>`) y subtítulo. */
export function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  subtitle,
  align = 'center',
  inverse = false,
  className,
}: {
  id: string;
  eyebrow: string;
  index?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'start';
  /** Sobre una superficie de marca: usa el color del texto de acción. */
  inverse?: boolean;
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <Reveal className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      <p
        className={cn(
          'inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]',
          inverse ? 'text-action-primary-fg' : 'text-link',
        )}
      >
        {index ? <span className="tabular-nums opacity-60">{index}</span> : null}
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
      </p>
      <h2 id={id} className={cn('mt-4 text-fluid-section font-bold', inverse && '[&_em]:text-action-primary-fg')}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'mt-5 text-pretty text-base leading-relaxed sm:text-lg',
            centered && 'mx-auto max-w-2xl',
            inverse ? 'opacity-80' : 'text-secondary',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
