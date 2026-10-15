import '../globals.css';

import { SUPPORTED_LOCALES } from '@bandada/i18n';
import { themeScript, tokens } from '@bandada/ui-tokens';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { Providers } from '@/components/common/Providers';
import { SkipLink } from '@/components/common/SkipLink';
import { fontVariables } from '@/lib/fonts';
import { isSupportedLocale } from '@/lib/i18n';
import { homeMetadata, viewport as baseViewport } from '@/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const viewport = baseViewport;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isSupportedLocale(locale) ? homeMetadata(locale) : {};
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={tokens.light.color.bg.canvas} media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content={tokens.dark.color.bg.canvas} media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers locale={locale}>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
