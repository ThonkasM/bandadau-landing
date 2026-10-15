'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { cn } from '@/lib/cn';

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
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <Section id="faq" labelledBy="faq-title" tone="muted">
      <SectionHeading id="faq-title" index="05" eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
      <Reveal className="mx-auto mt-12 max-w-3xl space-y-3">
        {ITEMS.map(({ q, a }, index) => {
          const isOpen = open === index;
          return (
            <div key={q} className="rounded-2xl border border-default bg-surface shadow-sm">
              <h3>
                <button
                  type="button"
                  id={`${baseId}-q${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-a${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-display text-base font-semibold text-primary sm:text-lg"
                >
                  {t(q)}
                  <ChevronDown aria-hidden="true" className={cn('size-5 shrink-0 text-muted transition-transform duration-300', isOpen && 'rotate-180')} />
                </button>
              </h3>
              <div id={`${baseId}-a${index}`} role="region" aria-labelledby={`${baseId}-q${index}`} data-open={isOpen} className="accordion-panel">
                <div>
                  <p className="px-5 pb-5 leading-relaxed text-secondary">{t(a)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
