import { LOCALE_STORAGE_KEY } from '@bandada/i18n';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { detectBrowserLocale, legalKindFromSlug, legalPath, switchLocalePath } from './locale';

function setBrowserLanguages(languages: string[]) {
  vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(languages);
}

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe('detectBrowserLocale (i18n.md §2)', () => {
  it('usa la elección guardada antes que el navegador', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en');
    setBrowserLanguages(['es-BO']);
    expect(detectBrowserLocale()).toBe('en');
  });

  it('usa el primer idioma soportado del navegador', () => {
    setBrowserLanguages(['fr-FR', 'en-GB', 'es']);
    expect(detectBrowserLocale()).toBe('en');
  });

  it('cae a es si ningún idioma está soportado', () => {
    setBrowserLanguages(['fr-FR', 'de']);
    expect(detectBrowserLocale()).toBe('es');
  });

  it('ignora una elección guardada inválida', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'xx');
    setBrowserLanguages(['en-US']);
    expect(detectBrowserLocale()).toBe('en');
  });
});

describe('rutas por idioma', () => {
  it('cambia el prefijo y conserva la ruta', () => {
    expect(switchLocalePath('/es/', 'es', 'en')).toBe('/en/');
    expect(switchLocalePath('/en', 'en', 'es')).toBe('/es/');
  });

  it('traduce el slug legal al cambiar de idioma', () => {
    expect(switchLocalePath('/es/privacidad/', 'es', 'en')).toBe('/en/privacy/');
    expect(switchLocalePath('/en/terms/', 'en', 'es')).toBe('/es/terminos/');
  });

  it('resuelve el tipo legal desde el slug', () => {
    expect(legalKindFromSlug('es', 'terminos')).toBe('terms');
    expect(legalKindFromSlug('en', 'terminos')).toBeUndefined();
    expect(legalPath('en', 'privacy')).toBe('/en/privacy/');
  });
});
