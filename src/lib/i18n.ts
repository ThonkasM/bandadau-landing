import { DEFAULT_LOCALE, FALLBACK_LOCALE, type Locale,resources, SUPPORTED_LOCALES } from '@bandada/i18n';
import i18next, { type i18n } from 'i18next';
import ICU from 'i18next-icu';

import en from '../../locales/en/landing.json';
import es from '../../locales/es/landing.json';

export { DEFAULT_LOCALE, type Locale,SUPPORTED_LOCALES };

export const landingResources = { es, en } as const;
export type LandingResource = typeof es;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'landing';
    returnNull: false;
    resources: { landing: LandingResource };
  }
}

/** Crea una instancia i18next síncrona (todos los recursos vienen empaquetados) para un idioma. */
export function createI18n(locale: Locale): i18n {
  const instance = i18next.createInstance();
  void instance.use(ICU).init({
    lng: locale,
    fallbackLng: FALLBACK_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    ns: ['landing', 'common', 'errors'],
    defaultNS: 'landing',
    resources: {
      es: { ...resources.es, landing: es },
      en: { ...resources.en, landing: en },
    },
    initAsync: false,
    returnNull: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}

/** `t` fijo para Server Components / metadata. */
export function getT(locale: Locale) {
  return createI18n(locale).getFixedT(locale, 'landing');
}

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
