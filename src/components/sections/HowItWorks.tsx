'use client';

import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const STEPS = [
  { n: 1, title: 'how.step1Title', body: 'how.step1Body' },
  { n: 2, title: 'how.step2Title', body: 'how.step2Body' },
  { n: 3, title: 'how.step3Title', body: 'how.step3Body' },
] as const;

export function HowItWorks() {
  const { t } = useTranslation();
  return (
    <Section id="how" labelledBy="how-title" tone="muted">
      <Reveal>
        <SectionHeading id="how-title" eyebrow={t('how.eyebrow')} title={t('how.title')} />
      </Reveal>
      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        <div aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-strong md:block" />
        {STEPS.map(({ n, title, body }, index) => (
          <Reveal as="li" key={n} delay={index * 120} className="relative text-center">
            <span className="relative mx-auto flex size-14 items-center justify-center rounded-full border-4 border-canvas bg-action-primary font-display text-xl font-bold text-action-primary-fg shadow-md">
              <span className="sr-only">{t('how.stepLabel', { number: n })}</span>
              <span aria-hidden="true">{n}</span>
            </span>
            <h3 className="mt-5 text-xl font-bold text-primary">{t(title)}</h3>
            <p className="mx-auto mt-2 max-w-xs leading-relaxed text-secondary">{t(body)}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
