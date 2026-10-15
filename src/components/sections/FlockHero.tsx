'use client';

import type { CSSProperties } from 'react';

import { BIRDS, MARK_BOX } from '@/components/ui/Logo';

/** Punto de partida (en unidades del dibujo) y giro de cada ave antes de acomodarse en la U. */
const ORIGINS = [
  [-150, -90, -35],
  [-170, 30, -20],
  [-140, 140, 25],
  [-60, 200, 40],
  [10, 230, -15],
  [90, 200, 30],
  [160, 130, -30],
  [190, 20, 20],
  [150, -110, 35],
] as const;

/**
 * La bandada de la marca llega volando desde fuera y se acomoda en forma de U alrededor del teléfono;
 * después cada ave sube y baja con distinto ritmo. Solo anima `transform`/`opacity` (compositor) y,
 * donde hay scroll-driven animations, se desplaza más lento que la página (paralaje).
 */
export function FlockHero({ className }: { className?: string }) {
  return (
    <svg viewBox={MARK_BOX} className={className} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <g className="flock-parallax">
        {BIRDS.map((d, index) => {
          const leader = index === BIRDS.length - 1;
          const [fx, fy, fr] = ORIGINS[index] ?? [0, 0, 0];
          const style = { '--fx': `${fx}px`, '--fy': `${fy}px`, '--fr': `${fr}deg`, '--bd': `${index * 0.09}s`, '--bob': `${3.2 + (index % 4) * 0.45}s` } as CSSProperties;
          return (
            <g key={d} className="bird-in" style={style}>
              <path d={d} strokeWidth={leader ? 13.2 : 11} className={`bird-bob ${leader ? 'stroke-brand-accent' : 'stroke-action-primary'}`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
