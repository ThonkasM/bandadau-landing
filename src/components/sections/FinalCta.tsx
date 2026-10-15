'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { FlockArt } from '@/components/ui/Logo';
import { env } from '@/lib/env';

export function FinalCta() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="cta-title" className="bg-canvas py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="bg-cta relative isolate overflow-hidden rounded-xl bg-action-primary px-6 py-14 text-center text-action-primary-fg shadow-lg [--bd-color-border-focus:var(--bd-color-action-primary-fg)] sm:px-12 sm:py-20">
          <FlockArt tone="inverse" className="absolute -bottom-6 left-1/2 -z-10 w-[36rem] max-w-none -translate-x-1/2 opacity-25" />
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">{t('cta.subtitle')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={env.appUrl} variant="inverse" size="lg">
              {t('cta.primary')}
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={env.adminUrl} variant="ghost" size="lg">
              {t('cta.secondary')}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
