'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const ITEMS = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
] as const;

export function Faq() {
  const { t } = useTranslation();
  return (
    <Section id="faq" labelledBy="faq-title" tone="muted">
      <Reveal>
        <SectionHeading id="faq-title" eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
      </Reveal>
      <Reveal className="mx-auto mt-10 max-w-3xl space-y-3">
        {ITEMS.map(({ q, a }) => (
          <details key={q} className="group rounded-xl border border-default bg-surface shadow-sm open:shadow-md">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-left font-display text-base font-semibold text-primary sm:text-lg">
              {t(q)}
              <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-secondary">{t(a)}</p>
          </details>
        ))}
      </Reveal>
    </Section>
  );
}
