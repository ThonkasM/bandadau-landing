'use client';

import { formatDate } from '@bandada/i18n';
import { useTranslation } from 'react-i18next';

import { useLocale } from '@/components/common/use-locale';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import type { LegalKind } from '@/lib/locale';
import { homePath } from '@/lib/locale';

const SECTIONS = ['s1', 's2', 's3', 's4', 's5', 's6'] as const;
/** Fecha de la última revisión de los textos legales. */
const UPDATED = '2026-10-14T12:00:00Z';

export function LegalPage({ kind }: { kind: LegalKind }) {
  const { t } = useTranslation();
  const locale = useLocale();
  return (
    <>
      <Navbar />
      <main id="main" className="bg-canvas py-14 sm:py-20">
        <article className="container-page max-w-3xl">
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">{t(`legal.${kind}.title`)}</h1>
          <p className="mt-3 text-sm text-muted">{t('legal.updated', { date: formatDate(UPDATED, locale, 'long') })}</p>
          <p className="mt-6 text-lg leading-relaxed text-secondary">{t(`legal.${kind}.intro`)}</p>
          {SECTIONS.map((id) => (
            <section key={id} className="mt-10">
              <h2 className="text-2xl font-bold text-primary">{t(`legal.${kind}.${id}Title`)}</h2>
              <p className="mt-3 leading-relaxed text-secondary">{t(`legal.${kind}.${id}Body`)}</p>
            </section>
          ))}
          <a href={homePath(locale)} className="mt-12 inline-flex min-h-11 items-center font-semibold text-link underline underline-offset-4">
            {t('legal.back')}
          </a>
        </article>
      </main>
      <Footer />
    </>
  );
}
