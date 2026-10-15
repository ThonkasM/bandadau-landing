'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/ui/Section';
import { env } from '@/lib/env';

export function FinalCta() {
  const { t } = useTranslation();
  return (
    <Section tone="brand" labelledBy="cta-title" className="my-6 lg:my-10">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 id="cta-title" className="text-fluid-section font-bold sm:text-4xl lg:text-5xl">
          {t('cta.title')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg opacity-90">{t('cta.subtitle')}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={env.appUrl} variant="inverse" size="lg" className="rounded-full px-7">
            {t('cta.primary')}
            <ArrowRight className="size-5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={env.adminUrl} variant="ghost" size="lg" className="rounded-full px-7">
            {t('cta.secondary')}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
