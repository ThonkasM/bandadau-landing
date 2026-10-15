'use client';

import { ArrowRight, BadgeCheck, QrCode as QrIcon, Wallet } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { FeedScreen } from '@/components/mockups/screens';
import { FlockHero } from '@/components/sections/FlockHero';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { env } from '@/lib/env';

/** Retraso de la entrada escalonada (ver `.hero-rise` en globals.css). */
const delay = (value: string): CSSProperties => ({ '--d': value }) as CSSProperties;

export function Hero() {
  const { t } = useTranslation();
  const chips = [
    { icon: BadgeCheck, label: t('hero.chipVerified') },
    { icon: QrIcon, label: t('hero.chipTicket') },
    { icon: Wallet, label: t('hero.chipCredits') },
  ];
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-clip bg-canvas px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:flex lg:min-h-[min(100svh,56rem)] lg:flex-col lg:justify-center lg:px-8 lg:pb-24 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-[clamp(80rem,85vw,104rem)] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10">
          <h1 id="hero-title" className="hero-rise text-fluid-hero font-extrabold">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-link sm:text-sm">{t('hero.eyebrow')}</span>
            {t('hero.titleLead')} <em>{t('hero.titleAccent')}</em>
          </h1>
          <p className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg" style={delay('0.08s')}>
            {t('hero.subtitle')}
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={delay('0.16s')}>
            <ButtonLink href={env.appUrl} size="lg" className="rounded-full px-7">
              {t('hero.ctaPrimary')}
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#events" variant="secondary" size="lg" className="rounded-full border-2 px-7">
              {t('hero.ctaSecondary')}
            </ButtonLink>
          </div>
          <ul className="hero-rise mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-secondary" style={delay('0.24s')}>
            {chips.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-5 text-link" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-rise relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px]" style={delay('0.12s')}>
          <FlockHero className="pointer-events-none absolute bottom-[-4%] left-1/2 w-[125%] max-w-none -translate-x-1/2 lg:w-[140%]" />
          <div className="relative z-10">
            <PhoneFrame label={t('a11y.mockup')}>
              <FeedScreen />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
