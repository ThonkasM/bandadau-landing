import { applyTheme, resolveEffectiveTheme, THEME_STORAGE_KEY, type ThemePreference } from '@bandada/ui-tokens';

export type { ThemePreference };

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
      listeners.forEach((notify) => notify());
    }
  };
  media?.addEventListener('change', onSystemChange);
  return () => {
    listeners.delete(listener);
    media?.removeEventListener('change', onSystemChange);
  };
}

export type EffectiveTheme = 'light' | 'dark';

/** Tema que se está mostrando ahora (el atributo lo fija `themeScript` antes de pintar). */
export function readEffectiveTheme(): EffectiveTheme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Cambia entre claro y oscuro con un círculo que crece desde `origin` (View Transitions API).
 * Sin soporte o con movimiento reducido el cambio es inmediato.
 */
export function toggleTheme(origin?: { x: number; y: number }): void {
  const next: ThemePreference = readEffectiveTheme() === 'dark' ? 'LIGHT' : 'DARK';
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  if (typeof document.startViewTransition !== 'function' || reduced || !origin) {
    setThemePreference(next);
    return;
  }
  const { x, y } = origin;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const transition = document.startViewTransition(() => setThemePreference(next));
  void transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 480, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
    );
  });
}
