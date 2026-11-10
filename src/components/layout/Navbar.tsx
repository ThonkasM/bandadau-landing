'use client';

import { CalendarDays, CircleHelp, Home, Menu, Sparkles, Users, Waypoints, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useLocale } from '@/components/common/use-locale';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Logo } from '@/components/ui/Logo';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/cn';
import { env } from '@/lib/env';
import { aboutPath, homePath } from '@/lib/locale';

const LINKS = [
  { id: 'home', key: 'nav.home', icon: Home },
  { id: 'features', key: 'nav.features', icon: Sparkles },
  { id: 'how', key: 'nav.how', icon: Waypoints },
  { id: 'events', key: 'nav.events', icon: CalendarDays },
  { id: 'faq', key: 'nav.faq', icon: CircleHelp },
] as const;

const SECTION_IDS = LINKS.map((link) => link.id);

/** «Sobre nosotros» abre su propia página, no una ancla de la home. */
const ABOUT_LINK = { key: 'nav.about', icon: Users } as const;

/**
 * Navbar sólida: fondo opaco, borde fino y altura fija de 4 rem. Resalta la sección visible
 * y en móvil abre un menú lateral que se cierra con Escape o tocando el fondo.
 */
export function Navbar() {
  const { t } = useTranslation();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const home = homePath(locale);
  const aboutHref = aboutPath(locale);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header className={cn('fixed inset-x-0 top-0 z-50 border-b border-default bg-canvas px-4 transition-shadow duration-300 sm:px-6 lg:px-8', scrolled && 'shadow-sm')}>
        <div className="mx-auto flex h-16 w-full max-w-[clamp(80rem,85vw,104rem)] items-center justify-between gap-3">
          <a href={home} aria-label={t('a11y.logo')} className="flex shrink-0 items-center gap-2 rounded-md">
            <Logo />
          </a>

          <nav aria-label={t('a11y.mainNav')} className="hidden min-w-0 items-center gap-0.5 xl:flex xl:gap-1">
            {LINKS.map(({ id, key }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={id === 'home' ? home : `${home}#${id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4',
                    isActive ? 'bg-surface-muted text-link' : 'text-secondary hover:bg-surface-muted hover:text-primary',
                  )}
                >
                  {t(key)}
                </a>
              );
            })}
            <a
              href={aboutHref}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-surface-muted hover:text-primary xl:px-4"
            >
              {t(ABOUT_LINK.key)}
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="ml-2 hidden xl:block">
              <ButtonLink href={env.appUrl} className="rounded-full px-5">
                {t('nav.openApp')}
              </ButtonLink>
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex size-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-muted xl:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil: panel lateral bajo la navbar con fondo opaco que cierra al tocar. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn('fixed inset-0 top-16 z-40 bg-surface-inverse/40 transition-opacity duration-300 xl:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
      />
      <div
        id={menuId}
        inert={!open}
        className={cn(
          'fixed bottom-0 right-0 top-16 z-40 flex w-[88vw] max-w-sm flex-col border-l border-default bg-canvas shadow-lg transition-transform duration-300 ease-out xl:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav aria-label={t('a11y.mainNav')} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {LINKS.map(({ id, key, icon: Icon }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={id === 'home' ? home : `${home}#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors',
                      isActive ? 'bg-surface-muted text-link' : 'text-primary hover:bg-surface-muted',
                    )}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                    {t(key)}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={aboutHref}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-medium text-primary transition-colors hover:bg-surface-muted"
              >
                <ABOUT_LINK.icon aria-hidden="true" className="size-5" />
                {t(ABOUT_LINK.key)}
              </a>
            </li>
          </ul>
        </nav>
        <div className="border-t border-default p-4">
          <ButtonLink href={env.appUrl} size="lg" className="w-full rounded-full">
            {t('nav.openApp')}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
