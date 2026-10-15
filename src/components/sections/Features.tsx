'use client';

import {
  BadgeCheck,
  CalendarClock,
  CalendarDays,
  CircleDollarSign,
  Flag,
  GraduationCap,
  type LucideIcon,
  Megaphone,
  MessageCircle,
  QrCode,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Ticket,
  Users,
  Wallet,
} from 'lucide-react';
import { type KeyboardEvent, type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { EventsScreen, FeedScreen, ScanScreen, TicketScreen, WalletScreen } from '@/components/mockups/screens';
import { TicketModalButton } from '@/components/mockups/TicketModal';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { Section, SectionHeading } from '@/components/ui/Section';
import { cn } from '@/lib/cn';

type Audience = 'students' | 'organizers';

interface Block {
  /** Prefijo de claves en `features.<audience>.<id>`. */
  id: string;
  icon: LucideIcon;
  stepIcons: [LucideIcon, LucideIcon, LucideIcon];
  visual: ReactNode;
}

function useBlocks(): Record<Audience, Block[]> {
  const { t } = useTranslation();
  return {
    students: [
      { id: 'feed', icon: Users, stepIcons: [BadgeCheck, MessageCircle, GraduationCap], visual: <PhoneFrame label={t('features.students.feed.alt')}><FeedScreen /></PhoneFrame> },
      { id: 'events', icon: CalendarDays, stepIcons: [CalendarDays, Wallet, Ticket], visual: <PhoneFrame label={t('features.students.events.alt')}><EventsScreen /></PhoneFrame> },
      { id: 'wallet', icon: Wallet, stepIcons: [CircleDollarSign, RefreshCw, ShieldCheck], visual: <PhoneFrame label={t('features.students.wallet.alt')}><WalletScreen /></PhoneFrame> },
    ],
    organizers: [
      { id: 'publish', icon: Megaphone, stepIcons: [CalendarClock, CircleDollarSign, Users], visual: (
          <div className="flex flex-col items-center gap-5">
            <PhoneFrame label={t('features.organizers.publish.alt')}><TicketScreen /></PhoneFrame>
            <TicketModalButton />
          </div>
        ),
      },
      { id: 'scan', icon: QrCode, stepIcons: [ScanLine, ShieldCheck, Ticket], visual: <PhoneFrame label={t('features.organizers.scan.alt')}><ScanScreen /></PhoneFrame> },
      { id: 'moderation', icon: Flag, stepIcons: [Flag, ShieldCheck, BadgeCheck], visual: <ModerationCard /> },
    ],
  };
}

/** Vista del panel de moderación (cola de contenido marcado) en una tarjeta. */
function ModerationCard() {
  const { t } = useTranslation();
  const rows = [
    { key: 'moderationRow1', tone: 'bg-feedback-warning text-feedback-warning-fg', badge: 'moderationReview' },
    { key: 'moderationRow2', tone: 'bg-feedback-danger text-feedback-danger-fg', badge: 'moderationReports' },
    { key: 'moderationRow3', tone: 'bg-feedback-info text-feedback-info-fg', badge: 'moderationNew' },
  ] as const;
  return (
    <div role="img" aria-label={t('features.organizers.moderation.alt')} className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-default bg-surface shadow-lg">
      <div aria-hidden="true">
        <div className="flex items-center justify-between border-b border-default px-4 py-3">
          <p className="font-display text-sm font-bold text-primary">{t('features.organizers.moderation.panelTitle')}</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
            <span className="size-2 rounded-full bg-feedback-success-fg" />
            {t('features.organizers.moderation.live')}
          </span>
        </div>
        <ul className="divide-y divide-default">
          {rows.map(({ key, tone, badge }) => (
            <li key={key} className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-secondary">
                <Flag className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary">{t(`features.organizers.moderation.${key}`)}</p>
                <p className="truncate text-xs text-muted">{t('features.organizers.moderation.rowMeta')}</p>
              </div>
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', tone)}>{t(`features.organizers.moderation.${badge}`)}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 border-t border-default bg-surface-muted p-3">
          <span className="flex-1 rounded-lg bg-action-primary py-2 text-center text-xs font-semibold text-action-primary-fg">{t('features.organizers.moderation.keep')}</span>
          <span className="flex-1 rounded-lg border border-default bg-surface py-2 text-center text-xs font-semibold text-primary">{t('features.organizers.moderation.remove')}</span>
        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ audience, block, reverse }: { audience: Audience; block: Block; reverse: boolean }) {
  const { t } = useTranslation();
  const tx = (key: string): string => String(t(key as never));
  const base = `features.${audience}.${block.id}`;
  const Icon = block.icon;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && 'lg:order-2')}>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-action-primary text-action-primary-fg">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-link">{tx(`${base}.badge`)}</p>
        <h3 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">{tx(`${base}.title`)}</h3>
        <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">{tx(`${base}.text`)}</p>
        <ul className="mt-7 space-y-4">
          {block.stepIcons.map((StepIcon, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-link">
                <StepIcon aria-hidden="true" className="size-4" />
              </span>
              <span className="text-sm leading-relaxed text-secondary">{tx(`${base}.s${index + 1}`)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-surface-muted px-4 py-2 text-xs font-semibold text-link">
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          {tx(`${base}.pill`)}
        </p>
      </Reveal>
      <Reveal delay={120} className={cn(reverse && 'lg:order-1')}>
        {block.visual}
      </Reveal>
    </div>
  );
}

export function Features() {
  const { t } = useTranslation();
  const [audience, setAudience] = useState<Audience>('students');
  const blocks = useBlocks();
  const tabs: { id: Audience; label: string; icon: LucideIcon }[] = [
    { id: 'students', label: t('features.tabStudents'), icon: GraduationCap },
    { id: 'organizers', label: t('features.tabOrganizers'), icon: Megaphone },
  ];

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, current: Audience) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next: Audience = event.key === 'Home' ? 'students' : event.key === 'End' ? 'organizers' : current === 'students' ? 'organizers' : 'students';
    setAudience(next);
    document.getElementById(`features-tab-${next}`)?.focus();
  };

  return (
    <Section id="features" tone="muted" labelledBy="features-title">
      <SectionHeading
        id="features-title"
        index="01"
        eyebrow={t('features.eyebrow')}
        title={<>{t('features.titleLead')} <em>{t('features.titleAccent')}</em></>}
        subtitle={t('features.subtitle')}
        className="mb-10"
      />

      <div role="tablist" aria-label={t('features.eyebrow')} className="mx-auto flex w-full max-w-md rounded-full border border-default bg-surface p-1 shadow-sm">
        {tabs.map(({ id, label, icon: Icon }) => {
          const selected = audience === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`features-tab-${id}`}
              aria-selected={selected}
              aria-controls={`features-panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setAudience(id)}
              onKeyDown={(event) => onTabKeyDown(event, id)}
              className={cn(
                'inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
                selected ? 'bg-action-primary text-action-primary-fg shadow-sm' : 'text-secondary hover:text-primary',
              )}
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              <span className="min-w-0 truncate">{label}</span>
            </button>
          );
        })}
      </div>

      {tabs.map(({ id }) => (
        <div
          key={id}
          id={`features-panel-${id}`}
          role="tabpanel"
          aria-labelledby={`features-tab-${id}`}
          hidden={audience !== id}
          className="tab-enter mt-14 space-y-16 lg:space-y-24"
        >
          {blocks[id].map((block, index) => (
            <FeatureBlock key={block.id} audience={id} block={block} reverse={index % 2 === 1} />
          ))}
        </div>
      ))}
    </Section>
  );
}
