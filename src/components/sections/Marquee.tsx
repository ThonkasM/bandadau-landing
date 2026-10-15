'use client';

import { BookOpen, Code2, Languages, Mic, Moon, QrCode, ShieldCheck, Users, Wallet, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ITEMS = [
  { icon: BookOpen, key: 'marquee.notes' },
  { icon: Users, key: 'marquee.groups' },
  { icon: Wrench, key: 'marquee.workshops' },
  { icon: Mic, key: 'marquee.talks' },
  { icon: Code2, key: 'marquee.hackathons' },
  { icon: QrCode, key: 'marquee.tickets' },
  { icon: Wallet, key: 'marquee.credits' },
  { icon: ShieldCheck, key: 'marquee.moderation' },
  { icon: Moon, key: 'marquee.theme' },
  { icon: Languages, key: 'marquee.languages' },
] as const;

function Track({ hidden }: { hidden?: boolean }) {
  const { t } = useTranslation();
  return (
    <ul aria-hidden={hidden ? 'true' : undefined} className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map(({ icon: Icon, key }) => (
        <li key={key} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-secondary">
          <Icon aria-hidden="true" className="size-4 text-link" />
          {t(key)}
        </li>
      ))}
    </ul>
  );
}

/** Franja con desplazamiento lento (se pausa al pasar el cursor y con movimiento reducido queda estática). */
export function Marquee() {
  return (
    <div className="marquee-track flex overflow-hidden border-y border-default bg-surface py-5">
      <Track />
      <Track hidden />
    </div>
  );
}
