import './globals.css';

import { themeScript } from '@bandada/ui-tokens';
import type { Metadata } from 'next';

import { NotFoundContent } from '@/components/common/NotFoundContent';
import { fontVariables } from '@/lib/fonts';
import { getT } from '@/lib/i18n';

export const metadata: Metadata = { title: getT('es')('meta.notFoundTitle'), robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="es" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NotFoundContent />
      </body>
    </html>
  );
}
