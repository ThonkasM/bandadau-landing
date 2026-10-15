'use client';

import { ArrowRight, BadgeCheck, QrCode as QrIcon, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { FlockArt } from '@/components/ui/Logo';
import { env } from '@/lib/env';

import { AppMockup } from './AppMockup';

export function Hero() {
  const { t } = useTranslation();
  const chips = [
    { icon: BadgeCheck, label: t('hero.chipVerified') },
    { icon: QrIcon, label: t('hero.chipTicket') },
    { icon: Wallet, label: t('hero.chipCredits') },
  ];
  return (
    <section aria-labelledby="hero-title" className="bg-hero relative isolate overflow-x-clip pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-20">
      <div aria-hidden="true" className="bg-dots absolute inset-x-0 top-0 -z-10 h-72 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="anim-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-default bg-surface px-3 py-1.5 text-sm font-medium text-secondary shadow-sm">
            <span className="size-2 rounded-full bg-brand-accent" aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>
          <h1 id="hero-title" className="mt-5 text-4xl font-bold leading-[1.08] text-primary sm:text-5xl lg:text-6xl">
            {t('hero.titleLead')} <span className="text-link">{t('hero.titleAccent')}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-secondary sm:text-xl">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={env.appUrl} size="lg">
              {t('hero.ctaPrimary')}
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#events" variant="secondary" size="lg">
              {t('hero.ctaSecondary')}
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-secondary">
            {chips.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-5 text-action-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <FlockArt className="mt-10 hidden w-56 lg:block" />
        </div>
        <div className="anim-rise relative" style={{ animationDelay: '120ms' }}>
          <AppMockup />
        </div>
      </div>
    </section>
  );
}
