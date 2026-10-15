import { SUPPORTED_LOCALES } from '@bandada/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LegalPage } from '@/components/layout/LegalPage';
import { isSupportedLocale } from '@/lib/i18n';
import { LEGAL_SLUGS, legalKindFromSlug } from '@/lib/locale';
import { legalMetadata } from '@/lib/metadata';

type Params = Promise<{ locale: string; legal: string }>;

export const dynamicParams = false;

/** `/es/privacidad/`, `/es/terminos/`, `/en/privacy/`, `/en/terms/`. */
export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => Object.values(LEGAL_SLUGS[locale]).map((legal) => ({ locale, legal })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, legal } = await params;
  const kind = isSupportedLocale(locale) ? legalKindFromSlug(locale, legal) : undefined;
  return isSupportedLocale(locale) && kind ? legalMetadata(locale, kind) : {};
}

export default async function LegalRoute({ params }: { params: Params }) {
  const { locale, legal } = await params;
  const kind = isSupportedLocale(locale) ? legalKindFromSlug(locale, legal) : undefined;
  if (!kind) notFound();
  return <LegalPage kind={kind} />;
}
