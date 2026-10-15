import { type Locale,LOCALE_STORAGE_KEY, resolveLocale } from '@bandada/i18n';

/** Algoritmo de i18n.md §2 en el navegador: elección guardada → idioma del navegador → `es`. */
export function detectBrowserLocale(): Locale {
  let storedLocale: string | null = null;
  try {
    storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    storedLocale = null;
  }
  const systemLocales = navigator.languages?.length ? navigator.languages : [navigator.language];
  return resolveLocale({ storedLocale, systemLocales });
}

export function rememberLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* almacenamiento no disponible: la elección vive solo en la URL */
  }
}

/** Slugs de las páginas legales por idioma (`/es/privacidad/`, `/en/privacy/`). */
export const LEGAL_SLUGS = {
  es: { privacy: 'privacidad', terms: 'terminos' },
  en: { privacy: 'privacy', terms: 'terms' },
} as const satisfies Record<Locale, Record<'privacy' | 'terms', string>>;

export type LegalKind = 'privacy' | 'terms';

export function legalKindFromSlug(locale: Locale, slug: string): LegalKind | undefined {
  const entry = (Object.entries(LEGAL_SLUGS[locale]) as [LegalKind, string][]).find(([, value]) => value === slug);
  return entry?.[0];
}

export function homePath(locale: Locale): string {
  return `/${locale}/`;
}

export function legalPath(locale: Locale, kind: LegalKind): string {
  return `/${locale}/${LEGAL_SLUGS[locale][kind]}/`;
}

/** Ruta equivalente en otro idioma (cambia el prefijo y traduce el slug legal). */
export function switchLocalePath(pathname: string, from: Locale, to: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === from) segments.shift();
  const [first] = segments;
  if (first) {
    const kind = legalKindFromSlug(from, first);
    if (kind) return legalPath(to, kind);
  }
  const rest = segments.length ? `${segments.join('/')}/` : '';
  return `/${to}/${rest}`;
}
