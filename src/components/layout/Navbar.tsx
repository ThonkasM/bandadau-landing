'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useLocale } from '@/components/common/use-locale';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { LogoMark } from '@/components/ui/Logo';
import { env } from '@/lib/env';
import { homePath } from '@/lib/locale';

const LINKS = [
  { id: 'features', key: 'nav.features' },
  { id: 'how', key: 'nav.how' },
  { id: 'events', key: 'nav.events' },
  { id: 'faq', key: 'nav.faq' },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const home = homePath(locale);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-default bg-canvas/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <a href={home} aria-label={t('a11y.logo')} className="flex shrink-0 items-center gap-2 rounded-md">
          <LogoMark className="size-9" />
          <span className="hidden font-display text-xl font-bold text-primary min-[380px]:inline">{t('meta.siteName')}</span>
        </a>
        <nav aria-label={t('a11y.mainNav')} className="hidden items-center gap-1 lg:flex">
          {LINKS.map(({ id, key }) => (
            <a key={id} href={`${home}#${id}`} className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-secondary transition-colors hover:bg-surface-muted hover:text-primary">
              {t(key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink href={env.appUrl} className="ml-2 hidden lg:inline-flex">
            {t('nav.openApp')}
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-md text-primary transition-colors hover:bg-surface-muted lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open ? (
        <div id={menuId} className="border-t border-default bg-canvas lg:hidden">
          <nav aria-label={t('a11y.mainNav')} className="container-page flex flex-col gap-1 py-4">
            {LINKS.map(({ id, key }) => (
              <a key={id} href={`${home}#${id}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-primary hover:bg-surface-muted">
                {t(key)}
              </a>
            ))}
            <ButtonLink href={env.appUrl} size="lg" className="mt-3 w-full">
              {t('nav.openApp')}
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
