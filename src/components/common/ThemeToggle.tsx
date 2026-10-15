'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';

import { readThemePreference, setThemePreference, subscribeTheme, THEME_ORDER, type ThemePreference } from '@/lib/theme';

const ICONS = { SYSTEM: Monitor, LIGHT: Sun, DARK: Moon } as const;
const KEYS = { SYSTEM: 'theme.system', LIGHT: 'theme.light', DARK: 'theme.dark' } as const;

/** Alterna Automático → Claro → Oscuro y persiste la preferencia en `bandada.theme`. */
export function ThemeToggle() {
  const { t } = useTranslation();
  const preference = useSyncExternalStore<ThemePreference>(subscribeTheme, readThemePreference, () => 'SYSTEM');
  const next = THEME_ORDER[(THEME_ORDER.indexOf(preference) + 1) % THEME_ORDER.length] ?? 'SYSTEM';
  const Icon = ICONS[preference];
  return (
    <button
      type="button"
      onClick={() => setThemePreference(next)}
      aria-label={t('theme.switchTo', { current: t(KEYS[preference]), next: t(KEYS[next]) })}
      title={t(KEYS[preference])}
      className="inline-flex size-11 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface-muted hover:text-primary"
    >
      <Icon className="size-5" />
    </button>
  );
}
