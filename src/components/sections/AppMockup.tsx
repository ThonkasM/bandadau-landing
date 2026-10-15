'use client';

import { CalendarDays, Home, MessageCircle, ThumbsUp, Users, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LogoMark } from '@/components/ui/Logo';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { QrCode } from '@/components/ui/QrCode';

const STORY_TINTS = ['bg-action-primary', 'bg-brand-accent', 'bg-brand-highlight', 'bg-chart-3', 'bg-chart-4'] as const;

/** Mockup de la app (feed + evento + pestañas) y tarjetas flotantes de ticket QR y billetera. */
export function AppMockup() {
  const { t } = useTranslation();
  return (
    <div className="relative mx-auto w-full max-w-md pb-8 lg:pb-0">
      <div aria-hidden="true" className="bg-glow absolute -inset-10 -z-10 opacity-70" />
      <PhoneFrame label={t('a11y.mockup')} className="anim-float-slow">
        <div className="flex items-center justify-between bg-surface px-4 pb-2 pt-9">
          <div className="flex items-center gap-1.5">
            <LogoMark className="size-6" />
            <span className="font-display text-sm font-bold text-primary">{t('mock.appName')}</span>
          </div>
          <span className="size-6 rounded-full bg-action-primary" />
        </div>
        <div className="flex-1 space-y-2.5 overflow-hidden bg-canvas px-3 pb-2 pt-2.5">
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">{t('mock.stories')}</p>
            <div className="flex gap-2">
              {STORY_TINTS.map((tint) => (
                <span key={tint} className={`size-8 rounded-full border-2 border-surface ring-2 ring-default ${tint}`} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-default bg-surface p-2.5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="size-7 rounded-full bg-brand-highlight" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-primary">{t('mock.postAuthor')}</p>
                <p className="truncate text-[9px] text-muted">{t('mock.postMeta')}</p>
              </div>
              <span className="rounded-full bg-feedback-success px-1.5 py-0.5 text-[8px] font-semibold text-feedback-success-fg">{t('mock.verified')}</span>
            </div>
            <p className="mt-2 text-[10.5px] leading-snug text-secondary">{t('mock.postBody')}</p>
            <div className="mt-2 flex items-center gap-3 text-[9px] text-muted">
              <span className="inline-flex items-center gap-1"><ThumbsUp className="size-3" />{t('mock.postReactions', { count: 12 })}</span>
              <span className="inline-flex items-center gap-1"><MessageCircle className="size-3" />{t('mock.postComments', { count: 4 })}</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-default bg-surface shadow-sm">
            <div className="relative h-14 overflow-hidden bg-feedback-info">
              <LogoMark className="absolute -bottom-3 right-2 size-16 opacity-70" />
              <span className="absolute left-2.5 top-2 rounded-full bg-surface px-1.5 py-0.5 text-[8px] font-semibold text-primary">{t('mock.eventBadge')}</span>
            </div>
            <div className="p-2.5">
              <p className="text-[11px] font-bold leading-tight text-primary">{t('mock.eventTitle')}</p>
              <p className="mt-0.5 text-[9px] text-muted">{t('mock.eventMeta')}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold text-primary">{t('mock.eventPrice')}</p>
                  <p className="text-[8.5px] text-muted">{t('mock.seatsLeft', { count: 28 })}</p>
                </div>
                <span className="rounded-md bg-action-primary px-2.5 py-1.5 text-[10px] font-semibold text-action-primary-fg">{t('mock.eventCta')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 border-t border-default bg-surface px-1 pb-2 pt-1.5 text-center text-[8.5px] font-medium text-muted">
          {[
            [Home, 'mock.tabHome', true],
            [Users, 'mock.tabGroups', false],
            [CalendarDays, 'mock.tabEvents', false],
            [Wallet, 'mock.tabWallet', false],
          ].map(([Icon, key, active]) => {
            const TabIcon = Icon as typeof Home;
            return (
              <span key={key as string} className={`flex flex-col items-center gap-0.5 ${active ? 'text-action-primary' : ''}`}>
                <TabIcon className="size-4" />
                {t(key as 'mock.tabHome')}
              </span>
            );
          })}
        </div>
      </PhoneFrame>

      <div className="anim-float absolute -left-2 bottom-24 hidden w-44 rounded-xl border border-default bg-surface-raised p-3 shadow-lg sm:block lg:-left-10">
        <div className="flex items-center gap-3">
          <QrCode className="size-12 shrink-0 rounded-sm" />
          <div className="min-w-0">
            <p className="text-xs font-bold leading-tight text-primary">{t('hero.floatTicketTitle')}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-muted">{t('hero.floatTicketBody')}</p>
          </div>
        </div>
      </div>
      <div className="anim-float-slow absolute -right-2 top-24 w-40 rounded-xl border border-default bg-surface-raised p-3 shadow-lg sm:block lg:-right-8">
        <p className="text-[11px] font-medium text-muted">{t('hero.floatWalletLabel')}</p>
        <p className="mt-0.5 flex items-center gap-1.5 font-display text-base font-bold text-primary">
          <Wallet className="size-4 text-action-primary" />
          {t('hero.floatWalletValue', { credits: 100 })}
        </p>
      </div>
    </div>
  );
}
