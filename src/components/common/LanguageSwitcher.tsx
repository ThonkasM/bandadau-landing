'use client';

import { Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { useLocale } from '@/components/common/use-locale';
import { rememberLocale, switchLocalePath } from '@/lib/locale';

/** Enlace real al mismo contenido en el otro idioma (rastreable) que además recuerda la elección. */
export function LanguageSwitcher() {
  const { t } = useTranslation();
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === 'es' ? 'en' : 'es';
  const href = switchLocalePath(pathname, locale, target);
  const label = t(`language.${target}`);
  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      onClick={() => rememberLocale(target)}
      aria-label={t('language.switchTo', { language: label })}
      title={label}
      className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-surface-muted hover:text-primary"
    >
      <Globe className="size-4" />
      <span>{t(target === 'es' ? 'language.codeEs' : 'language.codeEn')}</span>
    </a>
  );
}
