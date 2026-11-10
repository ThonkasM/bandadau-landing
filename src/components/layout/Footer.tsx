'use client';

import { useTranslation } from 'react-i18next';

import { useLocale } from '@/components/common/use-locale';
import { Logo } from '@/components/ui/Logo';
import { env } from '@/lib/env';
import { aboutPath, legalPath } from '@/lib/locale';

export function Footer() {
  const { t } = useTranslation();
  const locale = useLocale();
  const link = 'inline-flex min-h-11 items-center text-secondary transition-colors hover:text-primary hover:underline';
  return (
    <footer className="border-t border-default bg-surface-muted py-12 lg:py-16">
      <div className="container-page grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo title={t('meta.siteName')} className="gap-3 [&>svg:first-child]:h-11 [&>svg:last-child]:h-6" />
          <p className="mt-4 max-w-sm text-secondary">{t('footer.tagline')}</p>
        </div>
        <nav aria-label={t('a11y.footerNav')}>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-primary">{t('footer.productTitle')}</h2>
          <ul className="mt-3">
            <li><a href={env.appUrl} className={link}>{t('footer.app')}</a></li>
            <li><a href={env.adminUrl} className={link}>{t('footer.panel')}</a></li>
            <li><a href={aboutPath(locale)} className={link}>{t('footer.about')}</a></li>
          </ul>
        </nav>
        <nav aria-label={t('a11y.legalNav')}>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-primary">{t('footer.legalTitle')}</h2>
          <ul className="mt-3">
            <li><a href={legalPath(locale, 'privacy')} className={link}>{t('footer.privacy')}</a></li>
            <li><a href={legalPath(locale, 'terms')} className={link}>{t('footer.terms')}</a></li>
          </ul>
        </nav>
      </div>
      <p className="container-page mt-10 border-t border-default pt-6 text-sm text-muted">{t('footer.copyright', { year: String(new Date().getFullYear()) })}</p>
    </footer>
  );
}
