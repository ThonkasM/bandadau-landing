'use client';

import { CalendarCheck, GraduationCap, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const STEPS = [
  { n: 1, icon: ShieldCheck, title: 'how.step1Title', body: 'how.step1Body' },
  { n: 2, icon: GraduationCap, title: 'how.step2Title', body: 'how.step2Body' },
  { n: 3, icon: CalendarCheck, title: 'how.step3Title', body: 'how.step3Body' },
] as const;

export function HowItWorks() {
  const { t } = useTranslation();
  return (
    <Section id="how" labelledBy="how-title">
      <SectionHeading id="how-title" index="02" eyebrow={t('how.eyebrow')} title={<>{t('how.titleLead')} <em>{t('how.titleAccent')}</em></>} subtitle={t('how.subtitle')} />
      <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
        {STEPS.map(({ n, icon: Icon, title, body }, index) => {
          const label = `0${n}`;
          return (
          <Reveal as="li" key={n} delay={index * 100} className="relative rounded-2xl border border-default bg-surface p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-action-primary text-action-primary-fg">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <span className="font-display text-5xl font-extrabold tabular-nums text-link opacity-25" aria-hidden="true">
                {label}
              </span>
            </div>
            <span className="sr-only">{t('how.stepLabel', { number: n })}</span>
            <h3 className="mt-6 text-xl font-bold text-primary">{t(title)}</h3>
            <p className="mt-2 leading-relaxed text-secondary">{t(body)}</p>
          </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
