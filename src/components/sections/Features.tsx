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
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ModerationCard } from '@/components/mockups/ModerationCard';
import { EventsScreen, FeedScreen, ScanScreen, TicketScreen, WalletScreen } from '@/components/mockups/screens';
import { TicketModalButton } from '@/components/mockups/TicketModal';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { Section, SectionHeading } from '@/components/ui/Section';
import { cn } from '@/lib/cn';

type Audience = 'students' | 'organizers';

interface Step {
  audience: Audience;
  /** Prefijo de claves en `features.<audience>.<id>`. */
  id: string;
  icon: LucideIcon;
  stepIcons: [LucideIcon, LucideIcon, LucideIcon];
  visual: (label: string) => ReactNode;
}

const STEPS: Step[] = [
  { audience: 'students', id: 'feed', icon: Users, stepIcons: [BadgeCheck, MessageCircle, GraduationCap], visual: (label) => <PhoneFrame label={label}><FeedScreen /></PhoneFrame> },
  { audience: 'students', id: 'events', icon: CalendarDays, stepIcons: [CalendarDays, Wallet, Ticket], visual: (label) => <PhoneFrame label={label}><EventsScreen /></PhoneFrame> },
  { audience: 'students', id: 'wallet', icon: Wallet, stepIcons: [CircleDollarSign, RefreshCw, ShieldCheck], visual: (label) => <PhoneFrame label={label}><WalletScreen /></PhoneFrame> },
  {
    audience: 'organizers',
    id: 'publish',
    icon: Megaphone,
    stepIcons: [CalendarClock, CircleDollarSign, Users],
    visual: (label) => (
      <div className="flex flex-col items-center gap-5">
        <PhoneFrame label={label}><TicketScreen /></PhoneFrame>
        <TicketModalButton />
      </div>
    ),
  },
  { audience: 'organizers', id: 'scan', icon: QrCode, stepIcons: [ScanLine, ShieldCheck, Ticket], visual: (label) => <PhoneFrame label={label}><ScanScreen /></PhoneFrame> },
  { audience: 'organizers', id: 'moderation', icon: Flag, stepIcons: [Flag, ShieldCheck, BadgeCheck], visual: () => <ModerationCard /> },
];

/** Paso activo = el que cruza la franja central del viewport. */
function useActiveStep(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.slice(0, count).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [count]);
  return { active, refs };
}

function StepText({ step }: { step: Step }) {
  const { t } = useTranslation();
  const tx = (key: string): string => String(t(key as never));
  const base = `features.${step.audience}.${step.id}`;
  const Icon = step.icon;
  return (
    <>
      <span className="flex size-12 items-center justify-center rounded-2xl bg-action-primary text-action-primary-fg">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-link">{tx(`${base}.badge`)}</p>
      <h3 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">{tx(`${base}.title`)}</h3>
      <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">{tx(`${base}.text`)}</p>
      <ul className="mt-7 space-y-4">
        {step.stepIcons.map((StepIcon, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-link">
              <StepIcon aria-hidden="true" className="size-4" />
            </span>
            <span className="text-sm leading-relaxed text-secondary">{tx(`${base}.s${index + 1}`)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-xs font-semibold text-link">
        <ShieldCheck aria-hidden="true" className="size-3.5" />
        {tx(`${base}.pill`)}
      </p>
    </>
  );
}

/**
 * Recorrido pegajoso: el texto avanza con el scroll y el teléfono (fijo en pantalla) cambia de
 * pantalla con fundido. En móvil cada paso lleva su propio teléfono debajo del texto.
 */
export function Features() {
  const { t } = useTranslation();
  const tx = (key: string): string => String(t(key as never));
  const { active, refs } = useActiveStep(STEPS.length);
  const audienceLabel: Record<Audience, string> = { students: t('features.tabStudents'), organizers: t('features.tabOrganizers') };

  return (
    <Section id="features" tone="muted" labelledBy="features-title">
      <SectionHeading
        id="features-title"
        index="01"
        eyebrow={t('features.eyebrow')}
        title={<>{t('features.titleLead')} <em>{t('features.titleAccent')}</em></>}
        subtitle={t('features.subtitle')}
        className="mb-12"
      />

      <div className="grid gap-x-16 lg:grid-cols-2">
        <ol className="lg:pb-[20vh]">
          {STEPS.map((step, index) => {
            const label = tx(`features.${step.audience}.${step.id}.alt`);
            const first = STEPS.findIndex((candidate) => candidate.audience === step.audience) === index;
            return (
              <li
                key={step.id}
                ref={(node) => {
                  refs.current[index] = node;
                }}
                data-index={index}
                className={cn('flex flex-col justify-center py-10 lg:min-h-[80vh] lg:py-16', active === index ? 'lg:opacity-100' : 'lg:opacity-40', 'lg:transition-opacity lg:duration-500')}
              >
                {first ? (
                  <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-default bg-surface px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                    {step.audience === 'students' ? <GraduationCap aria-hidden="true" className="size-3.5 text-link" /> : <Megaphone aria-hidden="true" className="size-3.5 text-link" />}
                    {audienceLabel[step.audience]}
                  </p>
                ) : null}
                <StepText step={step} />
                <div className="mt-10 lg:hidden">{step.visual(label)}</div>
              </li>
            );
          })}
        </ol>

        <div className="relative hidden lg:block">
          <div className="sticky top-24 flex h-[calc(100svh-8rem)] items-center justify-center">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                data-active={active === index}
                aria-hidden={active === index ? undefined : true}
                inert={active !== index}
                className="stage-item absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full max-w-[340px]">{step.visual(tx(`features.${step.audience}.${step.id}.alt`))}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
