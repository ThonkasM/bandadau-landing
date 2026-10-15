'use client';

import { Flag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/cn';

/** Vista del panel de moderación (cola de contenido marcado) en una tarjeta. */
export function ModerationCard() {
  const { t } = useTranslation();
  const rows = [
    { key: 'moderationRow1', tone: 'bg-feedback-warning text-feedback-warning-fg', badge: 'moderationReview' },
    { key: 'moderationRow2', tone: 'bg-feedback-danger text-feedback-danger-fg', badge: 'moderationReports' },
    { key: 'moderationRow3', tone: 'bg-feedback-info text-feedback-info-fg', badge: 'moderationNew' },
  ] as const;
  return (
    <div role="img" aria-label={t('features.organizers.moderation.alt')} className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-default bg-surface shadow-lg">
      <div aria-hidden="true">
        <div className="flex items-center justify-between border-b border-default px-4 py-3">
          <p className="font-display text-sm font-bold text-primary">{t('features.organizers.moderation.panelTitle')}</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
            <span className="size-2 rounded-full bg-feedback-success-fg" />
            {t('features.organizers.moderation.live')}
          </span>
        </div>
        <ul className="divide-y divide-default">
          {rows.map(({ key, tone, badge }) => (
            <li key={key} className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-secondary">
                <Flag className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary">{t(`features.organizers.moderation.${key}`)}</p>
                <p className="truncate text-xs text-muted">{t('features.organizers.moderation.rowMeta')}</p>
              </div>
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', tone)}>{t(`features.organizers.moderation.${badge}`)}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 border-t border-default bg-surface-muted p-3">
          <span className="flex-1 rounded-lg bg-action-primary py-2 text-center text-xs font-semibold text-action-primary-fg">{t('features.organizers.moderation.keep')}</span>
          <span className="flex-1 rounded-lg border border-default bg-surface py-2 text-center text-xs font-semibold text-primary">{t('features.organizers.moderation.remove')}</span>
        </div>
      </div>
    </div>
  );
}
