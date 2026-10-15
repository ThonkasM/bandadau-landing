'use client';

import { type PointerEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { LogoMark, LogoWordmark } from '@/components/ui/Logo';
import { QrCode } from '@/components/ui/QrCode';
import { cn } from '@/lib/cn';

/** Inclinación máxima en grados (mismo valor que la app). */
const MAX_TILT = 14;
const PERSPECTIVE = 800;

/** Recorte con la muesca semielíptica superior de la tarjeta (estilo Wallet). */
const NOTCH_MASK = 'radial-gradient(ellipse 12% 3.3% at 50% 0, transparent 0 98%, #000 100%)';

/**
 * Ticket de la app: tarjeta con muesca y degradado del pase, QR y brillo que sigue al cursor.
 * Con `interactive` se inclina en 3D con el puntero (o el dedo); el movimiento se escribe en
 * variables CSS por `requestAnimationFrame`, sin re-renderizar React. Todo el tamaño es relativo
 * al ancho de la tarjeta (`cqw`), así que escala igual dentro del teléfono y en el modal.
 */
export function TicketPass({ interactive = false, className }: { interactive?: boolean; className?: string }) {
  const { t } = useTranslation();
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const tilt = (rx: number, ry: number, sx: number, sy: number, glow: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = stage.current;
      if (!el) return;
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--sx', `${sx}%`);
      el.style.setProperty('--sy', `${sy}%`);
      el.style.setProperty('--glow', String(glow));
    });
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
    const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
    tilt(-ny * MAX_TILT, nx * MAX_TILT, 50 + nx * 40, 30 + ny * 25, Math.min(1, Math.hypot(nx, ny) * 1.2));
  };
  const onLeave = () => interactive && tilt(0, 0, 50, 30, 0);

  const title = t('mock.eventTitle');
  return (
    <div
      ref={stage}
      role="img"
      aria-label={t('mock.passA11y', { event: title })}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={onLeave}
      onPointerUp={(event) => event.pointerType !== 'mouse' && onLeave()}
      style={{ aspectRatio: '892 / 1215' }}
      className={cn('@container w-full max-w-[360px] select-none', interactive && 'cursor-grab touch-none active:cursor-grabbing', className)}
    >
      <div
        className={cn('size-full', interactive && 'ticket-tilt')}
        style={{ transform: `perspective(${PERSPECTIVE}px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))` }}
      >
        <div
          aria-hidden="true"
          style={{ maskImage: NOTCH_MASK, WebkitMaskImage: NOTCH_MASK }}
          className="relative flex size-full flex-col overflow-hidden rounded-[6.1cqw] bg-gradient-to-b from-pass-bg from-55% to-pass-bg-2 p-[7.5cqw] pt-[8.5cqw] text-pass-fg shadow-lg"
        >
          {/* Brillo que se desplaza con la inclinación: es lo que hace "leer" el 3D. */}
          <span
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--sx,50%)_var(--sy,30%),color-mix(in_srgb,var(--color-brand-accent)_55%,transparent),transparent_60%)]"
            style={{ opacity: 'var(--glow, 0)' }}
          />
          <div className="relative flex items-start justify-between">
            <span className="flex items-center gap-[2.2cqw]">
              <LogoMark className="h-[8cqw]" tone="current" />
              <LogoWordmark className="h-[5.6cqw]" tone="current" />
            </span>
            <span className="text-right font-mono leading-tight">
              <span className="block text-[3.6cqw] text-pass-muted">{t('mock.passTime')}</span>
              <span className="block text-[4.6cqw]">{t('mock.passDate')}</span>
            </span>
          </div>

          <div className="relative mt-[5cqw]">
            <p className="font-mono text-[3.2cqw] uppercase tracking-wide text-pass-muted">{t('mock.passEvent')}</p>
            <p className="text-[6.8cqw] font-medium leading-[1.2]">{title}</p>
          </div>
          <div className="relative mt-[5cqw] flex justify-between gap-[3cqw]">
            <div>
              <p className="font-mono text-[3.2cqw] uppercase tracking-wide text-pass-muted">{t('mock.passTicket')}</p>
              <p className="text-[5.8cqw] font-medium">{t('mock.passStatus')}</p>
            </div>
            <div>
              <p className="font-mono text-[3.2cqw] uppercase tracking-wide text-pass-muted">{t('mock.passAdmission')}</p>
              <p className="text-[5.8cqw] font-medium">{t('mock.passTime')}</p>
            </div>
          </div>
          <div className="relative mt-[5cqw]">
            <p className="font-mono text-[3.2cqw] uppercase tracking-wide text-pass-muted">{t('mock.passWhere')}</p>
            <p className="text-[3.9cqw] leading-snug">{t('mock.eventVenue')}</p>
          </div>

          <div className="relative flex flex-1 items-end justify-center">
            <div className="rounded-[2.8cqw] bg-qr-bg p-[2cqw] text-qr-fg">
              <QrCode className="size-[38cqw]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
