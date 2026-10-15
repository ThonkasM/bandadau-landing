import '../globals.css';

import { themeScript } from '@bandada/ui-tokens';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { fontVariables } from '@/lib/fonts';
import { homeMetadata, viewport as baseViewport } from '@/lib/metadata';

export const viewport = baseViewport;
export const metadata: Metadata = { ...homeMetadata('es'), robots: { index: false, follow: true } };

/** Raíz `/`: no tiene idioma propio; redirige en el cliente según i18n.md §2. */
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
