import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/** Marco de teléfono en CSS puro con tokens. El contenido es decorativo (la etiqueta describe la vista previa). */
export function PhoneFrame({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'relative mx-auto aspect-[9/18.5] w-full max-w-[17.5rem] rounded-[2.6rem] border-[0.55rem] border-strong bg-canvas shadow-lg sm:max-w-[19rem]',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-surface-inverse" />
      <div aria-hidden="true" className="flex h-full flex-col overflow-hidden rounded-[2rem]">
        {children}
      </div>
    </div>
  );
}
