import { applyTheme, resolveEffectiveTheme, THEME_STORAGE_KEY, type ThemePreference } from '@bandada/ui-tokens';

export type { ThemePreference };
export const THEME_ORDER: readonly ThemePreference[] = ['SYSTEM', 'LIGHT', 'DARK'];

const listeners = new Set<() => void>();

export function readThemePreference(): ThemePreference {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'LIGHT' || value === 'DARK' ? value : 'SYSTEM';
  } catch {
    return 'SYSTEM';
  }
}

export function setThemePreference(preference: ThemePreference): void {
  try {
    if (preference === 'SYSTEM') window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* sin almacenamiento: el cambio solo dura la visita */
  }
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  applyTheme(resolveEffectiveTheme(preference, prefersDark), document);
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  const media = window.matchMedia?.('(prefers-color-scheme: dark)');
  const onSystemChange = () => {
    if (readThemePreference() === 'SYSTEM') {
      applyTheme(resolveEffectiveTheme('SYSTEM', media?.matches ?? false), document);
    }
  };
  media?.addEventListener('change', onSystemChange);
  return () => {
    listeners.delete(listener);
    media?.removeEventListener('change', onSystemChange);
  };
}
