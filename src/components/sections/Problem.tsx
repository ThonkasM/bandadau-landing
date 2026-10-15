'use client';

import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const BEFORE = ['problem.beforeA', 'problem.beforeB', 'problem.beforeC', 'problem.beforeD'] as const;
const AFTER = ['problem.afterA', 'problem.afterB', 'problem.afterC', 'problem.afterD'] as const;

export function Problem() {
  const { t } = useTranslation();
  return (
    <Section id="problem" labelledBy="problem-title" tone="muted">
      <Reveal>
        <SectionHeading id="problem-title" eyebrow={t('problem.eyebrow')} title={t('problem.title')} subtitle={t('problem.subtitle')} />
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-xl border border-feedback-danger-border bg-feedback-danger p-6 text-feedback-danger-fg sm:p-8">
          <h3 className="text-xl font-bold">{t('problem.beforeTitle')}</h3>
          <ul className="mt-5 space-y-4">
            {BEFORE.map((key) => (
              <li key={key} className="flex gap-3">
                <X className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="rounded-xl border border-feedback-success-border bg-feedback-success p-6 text-feedback-success-fg sm:p-8">
          <h3 className="text-xl font-bold">{t('problem.afterTitle')}</h3>
          <ul className="mt-5 space-y-4">
            {AFTER.map((key) => (
              <li key={key} className="flex gap-3">
                <Check className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
