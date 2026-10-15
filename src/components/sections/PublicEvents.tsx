'use client';

import { formatCredits, formatDateTime,INTL_LOCALES, TIME_ZONE } from '@bandada/i18n';
import { CalendarDays, MapPin, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { useLocale } from '@/components/common/use-locale';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { LogoMark } from '@/components/ui/Logo';
import { Section, SectionHeading } from '@/components/ui/Section';
import type { PublicEvent } from '@/features/public-events/types';
import { usePublicEvents } from '@/features/public-events/use-public-events';
import { env } from '@/lib/env';

function EventCard({ event }: { event: PublicEvent }) {
  const { t } = useTranslation();
  const locale = useLocale();
  const date = new Date(event.startsAt);
  const day = new Intl.DateTimeFormat(INTL_LOCALES[locale], { day: 'numeric', timeZone: TIME_ZONE }).format(date);
  const month = new Intl.DateTimeFormat(INTL_LOCALES[locale], { month: 'short', timeZone: TIME_ZONE }).format(date);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-default bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-36 overflow-hidden bg-feedback-info">
        {event.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- export estático: sin optimizador de imágenes
          <img src={event.coverUrl} alt={t('events.coverAlt', { title: event.title })} className="size-full object-cover" loading="lazy" />
        ) : (
          <LogoMark className="absolute -bottom-6 -right-4 size-40 opacity-60" />
        )}
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-lg bg-surface px-3 py-1.5 text-center shadow-md">
          <span className="font-display text-xl font-bold leading-none text-primary">{day}</span>
          <span className="mt-0.5 text-xs font-semibold uppercase text-muted">{month}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-primary">{event.title}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-secondary">
          <li className="flex items-start gap-2"><CalendarDays className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />{formatDateTime(event.startsAt, locale)}</li>
          {event.venue ? <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />{event.venue}</li> : null}
          <li className="flex items-start gap-2"><Ticket className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />{t('events.seatsLeft', { count: event.seatsAvailable })}</li>
        </ul>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className={event.priceCredits === 0 ? 'rounded-full bg-feedback-success px-3 py-1 text-sm font-semibold text-feedback-success-fg' : 'rounded-full bg-feedback-info px-3 py-1 text-sm font-semibold text-feedback-info-fg'}>
            {event.priceCredits === 0 ? t('events.free') : formatCredits(event.priceCredits, locale)}
          </span>
          <ButtonLink href={env.appUrl} variant="secondary">
            {t('events.register')}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function EventSkeletons() {
  const { t } = useTranslation();
  return (
    <div role="status" aria-busy="true" aria-label={t('a11y.loadingEvents')} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((key) => (
        <div key={key} className="h-80 animate-pulse rounded-xl border border-default bg-surface-muted" />
      ))}
    </div>
  );
}

export function PublicEvents() {
  const { t } = useTranslation();
  const { data, isPending } = usePublicEvents();
  return (
    <Section id="events" labelledBy="events-title">
      <Reveal>
        <SectionHeading id="events-title" eyebrow={t('events.eyebrow')} title={t('events.title')} subtitle={t('events.subtitle')} />
      </Reveal>
      <div className="mt-12">
        {isPending ? <EventSkeletons /> : null}
        {data && data.events.length > 0 ? (
          <>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.events.slice(0, 3).map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
            {data.isSample ? (
              <p role="note" className="mx-auto mt-6 max-w-xl rounded-lg border border-feedback-info-border bg-feedback-info px-4 py-3 text-center text-sm text-feedback-info-fg">
                {t('events.sampleNotice')}
              </p>
            ) : null}
          </>
        ) : null}
        {data && data.events.length === 0 ? (
          <p className="mx-auto max-w-xl rounded-xl border border-default bg-surface p-8 text-center text-secondary">{t('events.empty')}</p>
        ) : null}
        <div className="mt-10 text-center">
          <ButtonLink href={env.appUrl} size="lg">
            {t('events.seeAll')}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
