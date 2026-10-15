'use client';

import { BadgeCheck, Languages, RefreshCw, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const FACTS = [
  { icon: BadgeCheck, key: 'verified' },
  { icon: ShieldCheck, key: 'safe' },
  { icon: RefreshCw, key: 'refund' },
  { icon: Languages, key: 'bilingual' },
] as const;

/** Banda de marca con las garantías del producto (sin cifras inventadas). */
export function Facts() {
  const { t } = useTranslation();
  return (
    <Section tone="brand" labelledBy="facts-title" className="my-6 lg:my-10">
      <SectionHeading id="facts-title" inverse index="03" eyebrow={t('facts.eyebrow')} title={t('facts.title')} subtitle={t('facts.subtitle')} />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map(({ icon: Icon, key }, index) => (
          <Reveal as="li" key={key} delay={index * 80} className="rounded-2xl border border-current/20 p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-surface text-link">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-bold">{t(`facts.${key}Title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-80">{t(`facts.${key}Body`)}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
