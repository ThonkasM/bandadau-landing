'use client';

import { Box, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { TicketPass } from '@/components/mockups/TicketPass';
import { cn } from '@/lib/cn';

/**
 * Botón + modal con el ticket en 3D, como el `TicketPassModal` de la app: el pase flota sobre un
 * velo y se inclina con el puntero. Va en un portal (los ancestros con `transform` de Reveal romperían `fixed`). Se cierra con Escape, con el fondo o con el botón.
 */
export function TicketModalButton({ className }: { className?: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          'inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-strong bg-surface px-5 text-sm font-semibold text-primary transition-colors hover:bg-surface-muted',
          className,
        )}
      >
        <Box aria-hidden="true" className="size-4 text-link" />
        {t('mock.ticket3d')}
      </button>

      {open
        ? createPortal(
        <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="modal-in fixed inset-0 z-[70] flex items-center justify-center p-5">
          <div aria-hidden="true" onClick={() => setOpen(false)} className="absolute inset-0 bg-surface-inverse/80 backdrop-blur-sm" />
          <div className="relative z-10 flex w-full max-w-[22rem] flex-col items-center gap-4">
            <h2 id={titleId} className="sr-only">{t('mock.ticketTitle')}</h2>
            <TicketPass interactive className="modal-pass" />
            <p className="text-center text-sm font-semibold text-inverse">{t('mock.tiltHint')}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t('a11y.closeDialog')}
            className="absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full bg-surface text-primary shadow-md transition-colors hover:bg-surface-muted"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>,
        document.body,
      )
        : null}
    </>
  );
}
