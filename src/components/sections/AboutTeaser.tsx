'use client';

import { ArrowRight, Compass, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { useLocale } from '@/components/common/use-locale';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section, SectionHeading } from '@/components/ui/Section';
import { aboutPath } from '@/lib/locale';

/** Resumen de «Sobre nosotros» en la home; el detalle vive en su propia página. */
export function AboutTeaser() {
  const { t } = useTranslation();
  const locale = useLocale();
  return (
    <Section id="about" tone="muted" labelledBy="about-teaser-title">
      <SectionHeading
        id="about-teaser-title"
        eyebrow={t('about.eyebrow')}
        title={t('about.teaserTitle')}
        subtitle={t('about.teaserSubtitle')}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {(['mission', 'vision'] as const).map((key, index) => {
          const Icon = key === 'mission' ? Target : Compass;
          return (
            <Reveal key={key} delay={index * 80} className="flex gap-4 rounded-2xl border border-default bg-surface p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-link">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-primary">{t(`about.${key}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{t(`about.${key}Short`)}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-10 text-center">
        <ButtonLink href={aboutPath(locale)} size="lg" className="rounded-full px-7">
          {t('about.cta')}
          <ArrowRight className="size-5" aria-hidden="true" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
