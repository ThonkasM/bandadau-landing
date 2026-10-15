'use client';

import { Moon, Sun } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';

import { type EffectiveTheme, readEffectiveTheme, subscribeTheme, toggleTheme } from '@/lib/theme';

/** Alterna claro ↔ oscuro (sin opción "sistema"; el sistema solo fija el valor inicial) con un círculo que se expande. */
export function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useSyncExternalStore<EffectiveTheme>(subscribeTheme, readEffectiveTheme, () => 'light');
  const dark = theme === 'dark';
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Los clics por teclado reportan (0,0): se parte del centro del botón.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    toggleTheme({ x, y });
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={dark}
      aria-label={dark ? t('theme.toLight') : t('theme.toDark')}
      className="inline-flex size-11 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface-muted hover:text-primary"
    >
      {dark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
    </button>
  );
}
