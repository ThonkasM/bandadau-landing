import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const STATUS_TIME = '9:41';

/**
 * Marco tipo iPhone con la proporción real de pantalla (393×852). El contenido se recorta al
 * alto del dispositivo: en la app real el final queda detrás de la tab bar flotante.
 * Es decorativo: la etiqueta describe la vista previa y el interior se oculta a lectores.
 */
export function PhoneFrame({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  return (
    <div role="img" aria-label={label} className={cn('relative mx-auto w-full max-w-[300px] sm:max-w-[320px]', className)}>
      {/* Botones laterales */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[92px] h-7 w-[3px] rounded-l-md bg-device-edge" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[136px] h-12 w-[3px] rounded-l-md bg-device-edge" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[196px] h-12 w-[3px] rounded-l-md bg-device-edge" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[150px] h-16 w-[3px] rounded-r-md bg-device-edge" />

      {/* Chasis + bisel */}
      <div aria-hidden="true" className="relative rounded-[3rem] bg-device-edge p-[3px] shadow-lg">
        <div className="rounded-[2.85rem] bg-device p-[6px]">
          <div className="relative aspect-[393/852] overflow-hidden rounded-[2.5rem] bg-canvas text-primary">
            {/* Barra de estado */}
            <div className="absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-between bg-canvas px-7 text-[11px] font-semibold">
              <span className="tabular-nums">{STATUS_TIME}</span>
              <span className="flex items-center gap-1.5">
                <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                  <rect x="0" y="7" width="3" height="4" rx="1" />
                  <rect x="4.5" y="5" width="3" height="6" rx="1" />
                  <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
                  <rect x="13.5" y="0" width="3" height="11" rx="1" />
                </svg>
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <path d="M1 3.2a10 10 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M3.6 5.9a6.3 6.3 0 0 1 8.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="8" cy="9" r="1.3" fill="currentColor" />
                </svg>
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" />
                  <rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" />
                  <path d="M23 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.4" />
                </svg>
              </span>
            </div>
            {/* Isla dinámica */}
            <div className="absolute left-1/2 top-[11px] z-40 h-[24px] w-[92px] -translate-x-1/2 rounded-full bg-device" />
            {/* Pantalla */}
            <div className="absolute inset-0 pt-12">{children}</div>
            {/* Home indicator */}
            <div className="absolute inset-x-0 bottom-2 z-40 flex justify-center">
              <span className="h-[5px] w-32 rounded-full bg-device opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
