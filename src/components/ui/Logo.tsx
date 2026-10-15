import { cn } from '@/lib/cn';

/** Pájaro: dos alas en "v" suave, centrado en (0,0). */
const BIRD = 'M-9 3 Q-4.5 -7 0 -1 Q4.5 -7 9 3';

/** Marca propia: tres aves en formación de U; la que guía (arriba a la derecha) lleva el ámbar de la paraba. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('size-9', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g className="stroke-action-primary" strokeWidth="4.2">
        <path d={BIRD} transform="translate(11 14) rotate(-8)" />
        <path d={BIRD} transform="translate(24 35)" />
      </g>
      <path d={BIRD} transform="translate(37 13) rotate(8) scale(1.15)" className="stroke-brand-accent" strokeWidth="4.6" />
    </svg>
  );
}

/** Bandada de nueve aves que dibuja una U (ilustración decorativa del hero). */
export function FlockArt({ className, tone = 'brand' }: { className?: string; tone?: 'brand' | 'inverse' }) {
  const birds = [
    [14, 20, -12],
    [22, 52, -8],
    [38, 80, -4],
    [66, 98, 0],
    [100, 104, 0],
    [134, 98, 0],
    [162, 80, 4],
    [178, 52, 8],
    [186, 20, 12],
  ] as const;
  return (
    <svg viewBox="0 0 200 124" className={className} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {birds.map(([x, y, r], index) => {
        const lead = index === birds.length - 1;
        return (
          <g key={index} transform={`translate(${x} ${y}) rotate(${r}) scale(${lead ? 2.1 : 1.6})`}>
            <path
              d={BIRD}
              strokeWidth={lead ? 2 : 1.9}
              className={cn(lead ? 'stroke-brand-accent' : tone === 'inverse' ? 'stroke-action-primary-fg' : 'stroke-action-primary', 'anim-flap')}
              style={{ animationDelay: `${index * -0.45}s`, opacity: lead ? 1 : 0.35 + index * 0.05 }}
            />
          </g>
        );
      })}
    </svg>
  );
}
