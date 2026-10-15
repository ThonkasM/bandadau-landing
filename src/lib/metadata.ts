import type { Locale } from '@bandada/i18n';
import type { Metadata, Viewport } from 'next';

import { env } from './env';
import { getT } from './i18n';
import { homePath, type LegalKind,legalPath } from './locale';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light dark' };

const OG_LOCALE = { es: 'es_BO', en: 'en_US' } as const;

function languages(path: (locale: Locale) => string): Record<string, string> {
  return { es: path('es'), en: path('en'), 'x-default': path('es') };
}

export function homeMetadata(locale: Locale): Metadata {
  const t = getT(locale);
  return {
    metadataBase: new URL(env.siteUrl),
    title: t('meta.title'),
    description: t('meta.description'),
    applicationName: t('meta.siteName'),
    alternates: { canonical: homePath(locale), languages: languages(homePath) },
    icons: { icon: '/favicon.svg' },
    openGraph: {
      type: 'website',
      siteName: t('meta.siteName'),
      title: t('meta.title'),
      description: t('meta.description'),
      url: homePath(locale),
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === 'es' ? 'en' : 'es'],
    },
    twitter: { card: 'summary', title: t('meta.title'), description: t('meta.description') },
  };
}

export function legalMetadata(locale: Locale, kind: LegalKind): Metadata {
  const t = getT(locale);
  const title = kind === 'privacy' ? t('meta.privacyTitle') : t('meta.termsTitle');
  return {
    ...homeMetadata(locale),
    title,
    description: t('meta.legalDescription'),
    alternates: { canonical: legalPath(locale, kind), languages: languages((l) => legalPath(l, kind)) },
    openGraph: { type: 'website', siteName: t('meta.siteName'), title, url: legalPath(locale, kind), locale: OG_LOCALE[locale] },
  };
}
