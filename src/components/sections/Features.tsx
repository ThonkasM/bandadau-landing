'use client';

import { CalendarCheck, LayoutDashboard,Moon, ShieldCheck, Users, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const ITEMS = [
  { id: 'identity', icon: ShieldCheck, title: 'features.identityTitle', body: 'features.identityBody' },
  { id: 'community', icon: Users, title: 'features.communityTitle', body: 'features.communityBody' },
  { id: 'events', icon: CalendarCheck, title: 'features.eventsTitle', body: 'features.eventsBody' },
  { id: 'wallet', icon: Wallet, title: 'features.walletTitle', body: 'features.walletBody' },
  { id: 'organizers', icon: LayoutDashboard, title: 'features.organizersTitle', body: 'features.organizersBody' },
  { id: 'theme', icon: Moon, title: 'features.themeTitle', body: 'features.themeBody' },
] as const;

export function Features() {
  const { t } = useTranslation();
  return (
    <Section id="features" labelledBy="features-title">
      <Reveal>
        <SectionHeading id="features-title" eyebrow={t('features.eyebrow')} title={t('features.title')} subtitle={t('features.subtitle')} />
      </Reveal>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ id, icon: Icon, title, body }, index) => (
          <Reveal as="li" key={id} delay={(index % 3) * 90} className="group rounded-xl border border-default bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
            <span className="inline-flex size-12 items-center justify-center rounded-lg border border-feedback-info-border bg-feedback-info text-feedback-info-fg transition-transform group-hover:-translate-y-0.5">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-primary">{t(title)}</h3>
            <p className="mt-2 leading-relaxed text-secondary">{t(body)}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
