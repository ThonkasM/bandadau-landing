'use client';

import { useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';

import { Providers } from '@/components/common/Providers';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { FlockArt } from '@/components/ui/Logo';
import type { Locale } from '@/lib/i18n';
import { detectBrowserLocale, homePath } from '@/lib/locale';

const subscribeNothing = () => () => {};

function Message({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  return (
    <main id="main" className="bg-hero flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <FlockArt className="w-64 max-w-full" />
      <p className="mt-6 font-display text-6xl font-extrabold text-link">{t('notFound.code')}</p>
      <h1 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-lg text-secondary">{t('notFound.body')}</p>
      <ButtonLink href={homePath(locale)} size="lg" className="mt-8">
        {t('notFound.home')}
      </ButtonLink>
    </main>
  );
}

/** 404 global: el idioma se resuelve en el cliente (la página es estática y no conoce la URL pedida). */
export function NotFoundContent() {
  const locale = useSyncExternalStore<Locale>(subscribeNothing, detectBrowserLocale, () => 'es');
  return (
    <Providers locale={locale}>
      <Message locale={locale} />
    </Providers>
  );
}
