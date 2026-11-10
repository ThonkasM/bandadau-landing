import { SUPPORTED_LOCALES } from '@bandada/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AboutPage } from '@/components/layout/AboutPage';
import { LegalPage } from '@/components/layout/LegalPage';
import { isSupportedLocale } from '@/lib/i18n';
import { ABOUT_SLUGS, isAboutSlug, LEGAL_SLUGS, legalKindFromSlug } from '@/lib/locale';
import { aboutMetadata, legalMetadata } from '@/lib/metadata';

type Params = Promise<{ locale: string; legal: string }>;

export const dynamicParams = false;

/** `/es/privacidad/`, `/es/terminos/`, `/es/nosotros/`, `/en/privacy/`, `/en/terms/`, `/en/about/`. */
export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => [...Object.values(LEGAL_SLUGS[locale]), ABOUT_SLUGS[locale]].map((legal) => ({ locale, legal })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, legal } = await params;
  if (!isSupportedLocale(locale)) return {};
  if (isAboutSlug(locale, legal)) return aboutMetadata(locale);
  const kind = legalKindFromSlug(locale, legal);
  return kind ? legalMetadata(locale, kind) : {};
}

export default async function LegalRoute({ params }: { params: Params }) {
  const { locale, legal } = await params;
  if (isSupportedLocale(locale) && isAboutSlug(locale, legal)) return <AboutPage />;
  const kind = isSupportedLocale(locale) ? legalKindFromSlug(locale, legal) : undefined;
  if (!kind) notFound();
  return <LegalPage kind={kind} />;
}
