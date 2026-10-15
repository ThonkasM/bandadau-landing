'use client';

import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Bookmark,
  CalendarDays,
  Check,
  ChevronLeft,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  PlusCircle,
  ScanLine,
  Send,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { TicketPass } from '@/components/mockups/TicketPass';
import { AppTabBar, type AppTabItem } from '@/components/ui/AppTabBar';
import { LogoMark } from '@/components/ui/Logo';

type TabId = 'feed' | 'events' | 'create' | 'wallet' | 'profile';

/** Mismas cinco pestañas que la app: Inicio, Eventos, Crear, Billetera y Perfil. */
function useTabs(active: TabId): AppTabItem[] {
  const { t } = useTranslation();
  return [
    { icon: Home, label: t('mock.tabHome'), active: active === 'feed' },
    { icon: CalendarDays, label: t('mock.tabEvents'), active: active === 'events' },
    { icon: PlusCircle, label: t('mock.tabCreate'), active: active === 'create' },
    { icon: Wallet, label: t('mock.tabWallet'), active: active === 'wallet' },
    { icon: User, label: t('mock.tabProfile'), active: active === 'profile' },
  ];
}

/** Cabecera de la app: marca centrada y campana. */
function AppHeader() {
  return (
    <div className="relative flex h-10 items-center justify-center border-b border-default bg-canvas">
      <LogoMark className="h-5" />
      <span className="absolute right-3 flex size-6 items-center justify-center text-primary">
        <Bell aria-hidden="true" className="size-4" />
      </span>
    </div>
  );
}

/** Pantalla de detalle: botón atrás y título. */
function BackHeader({ title }: { title: string }) {
  return (
    <div className="flex h-10 items-center gap-2 border-b border-default bg-canvas px-2.5">
      <ChevronLeft aria-hidden="true" className="size-5 text-primary" />
      <span className="truncate text-[11px] font-semibold text-primary">{title}</span>
    </div>
  );
}

/** Portada de evento (en la app es una foto): fondo de marca con la bandada centrada. */
function Cover({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-action-primary ${className ?? ''}`}>
      <LogoMark tone="inverse" className="h-[55%] opacity-90" />
    </div>
  );
}

/** Feed: tarjeta de publicación al estilo Instagram (avatar con aro ámbar, carrusel, acciones). */
export function FeedScreen() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full flex-col bg-canvas">
      <AppHeader />
      <div className="flex-1 overflow-hidden pb-24">
        <article>
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-brand-accent bg-surface-muted text-[8px] font-bold text-primary">
              {t('mock.postInitials')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10.5px] font-semibold text-primary">{t('mock.postAuthor')}</p>
              <p className="truncate text-[8.5px] text-muted">{t('mock.postMeta')}</p>
            </div>
          </div>
          <div className="relative">
            <Cover className="aspect-[4/5] w-full" />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
              <span className="size-1.5 rounded-full bg-brand-accent" />
              <span className="size-1.5 rounded-full bg-surface opacity-70" />
              <span className="size-1.5 rounded-full bg-surface opacity-70" />
            </span>
          </div>
          <div className="flex items-center gap-3 px-3 pt-2 text-primary">
            <Heart aria-hidden="true" className="size-[18px]" />
            <MessageCircle aria-hidden="true" className="size-[18px]" />
            <Send aria-hidden="true" className="size-[18px]" />
            <Bookmark aria-hidden="true" className="ml-auto size-[18px]" />
          </div>
          <p className="px-3 pt-1.5 text-[10px] font-bold text-primary">{t('mock.likes', { count: 12 })}</p>
          <p className="px-3 pt-0.5 text-[10px] leading-snug text-secondary">
            <span className="font-bold text-primary">{t('mock.postAuthor')}</span> {t('mock.postBody')}
          </p>
          <p className="px-3 pt-1 text-[9px] text-muted">{t('mock.viewComments', { count: 3 })}</p>
        </article>
      </div>
      <AppTabBar items={useTabs('feed')} />
    </div>
  );
}

/** Lista de eventos: portada, chip de fecha oscuro, chip de precio ámbar, lugar y cupos. */
export function EventsScreen() {
  const { t } = useTranslation();
  const events = [
    { title: t('mock.eventTitle'), date: t('mock.eventChip'), price: t('mock.eventPrice'), venue: t('mock.eventVenue') },
    { title: t('mock.event2Title'), date: t('mock.event2Chip'), price: t('mock.event2Price'), venue: t('mock.event2Venue') },
  ];
  return (
    <div className="relative flex h-full flex-col bg-canvas">
      <AppHeader />
      <div className="flex-1 space-y-3 overflow-hidden px-3 pb-24 pt-3">
        {events.map(({ title, date, price, venue }) => (
          <article key={title} className="overflow-hidden rounded-2xl border border-default bg-surface">
            <div className="relative">
              <Cover className="h-24 w-full" />
              <span className="absolute left-2 top-2 rounded-lg bg-device px-2 py-1 text-[8.5px] font-bold text-device">{date}</span>
              <span className="absolute right-2 top-2 rounded-full bg-brand-accent px-2 py-0.5 text-[8.5px] font-bold text-primary">{price}</span>
            </div>
            <div className="space-y-1 p-2.5">
              <p className="text-[11px] font-bold leading-tight text-primary">{title}</p>
              <p className="flex items-center gap-1 text-[9px] text-muted"><MapPin aria-hidden="true" className="size-3" />{venue}</p>
              <p className="flex items-center gap-1 text-[9px] text-muted"><Users aria-hidden="true" className="size-3" />{t('mock.seatsLeft', { count: 27 })}</p>
            </div>
          </article>
        ))}
      </div>
      <AppTabBar items={useTabs('events')} />
    </div>
  );
}

/** Billetera: saldo, paquetes en bolivianos y movimientos. */
export function WalletScreen() {
  const { t } = useTranslation();
  const packages = [
    { credits: 20, price: 15 },
    { credits: 50, price: 35 },
    { credits: 100, price: 65 },
  ];
  const movements = [
    { icon: ArrowDownLeft, label: t('mock.mvTopup'), value: '+50', positive: true },
    { icon: ArrowUpRight, label: t('mock.mvEvent'), value: '−20', positive: false },
    { icon: ArrowDownLeft, label: t('mock.mvRefund'), value: '+20', positive: true },
  ];
  return (
    <div className="relative flex h-full flex-col bg-canvas">
      <AppHeader />
      <div className="flex-1 space-y-3 overflow-hidden px-3 pb-24 pt-3">
        <div className="rounded-2xl bg-action-primary p-3.5 text-action-primary-fg">
          <p className="text-[9px] font-semibold uppercase tracking-wide opacity-80">{t('mock.balanceLabel')}</p>
          <p className="mt-1 font-display text-2xl font-bold leading-none">{t('mock.balanceValue', { credits: 100 })}</p>
        </div>
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wide text-muted">{t('mock.packages')}</p>
          <div className="grid grid-cols-3 gap-2">
            {packages.map(({ credits, price }) => (
              <span key={credits} className="rounded-xl border border-default bg-surface px-1 py-2 text-center">
                <span className="block text-[10px] font-bold text-primary">{t('mock.package', { credits })}</span>
                <span className="block text-[9px] text-muted">{t('mock.packagePrice', { price })}</span>
              </span>
            ))}
          </div>
          <span className="mt-2 flex items-center justify-center rounded-full bg-action-primary py-2 text-[10px] font-semibold text-action-primary-fg">{t('mock.topup')}</span>
        </div>
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wide text-muted">{t('mock.movements')}</p>
          <ul className="divide-y divide-default overflow-hidden rounded-xl border border-default bg-surface">
            {movements.map(({ icon: Icon, label, value, positive }) => (
              <li key={label} className="flex items-center gap-2 px-2.5 py-2">
                <span className={`flex size-6 items-center justify-center rounded-full ${positive ? 'bg-feedback-success text-feedback-success-fg' : 'bg-surface-muted text-secondary'}`}>
                  <Icon aria-hidden="true" className="size-3" />
                </span>
                <span className="flex-1 text-[10px] text-primary">{label}</span>
                <span className="text-[10.5px] font-bold tabular-nums text-primary">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AppTabBar items={useTabs('wallet')} />
    </div>
  );
}

/** Ticket: el mismo pase con muesca, degradado y QR de la app. */
export function TicketScreen() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full flex-col bg-canvas">
      <BackHeader title={t('mock.ticketTitle')} />
      <div className="flex flex-1 items-start justify-center overflow-hidden px-4 pb-24 pt-4">
        <TicketPass />
      </div>
      <AppTabBar items={useTabs('events')} />
    </div>
  );
}

/** Escáner del organizador: valida la entrada en la puerta. */
export function ScanScreen() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full flex-col bg-canvas">
      <BackHeader title={t('mock.scanTitle')} />
      <div className="flex-1 space-y-3 overflow-hidden px-3.5 pb-24 pt-3">
        <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-device">
          <span aria-hidden="true" className="absolute left-4 top-4 size-6 rounded-tl-lg border-l-2 border-t-2 border-brand-accent" />
          <span aria-hidden="true" className="absolute right-4 top-4 size-6 rounded-tr-lg border-r-2 border-t-2 border-brand-accent" />
          <span aria-hidden="true" className="absolute bottom-4 left-4 size-6 rounded-bl-lg border-b-2 border-l-2 border-brand-accent" />
          <span aria-hidden="true" className="absolute bottom-4 right-4 size-6 rounded-br-lg border-b-2 border-r-2 border-brand-accent" />
          <ScanLine aria-hidden="true" className="size-12 text-brand-accent" />
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-feedback-success-border bg-feedback-success p-2.5 text-feedback-success-fg">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-feedback-success-fg text-feedback-success">
            <Check aria-hidden="true" className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold leading-tight">{t('mock.scanValid')}</p>
            <p className="truncate text-[9.5px] leading-tight opacity-80">{t('mock.scanWho')}</p>
          </div>
        </div>
        <p className="text-center text-[9.5px] text-muted">{t('mock.scanHint')}</p>
      </div>
      <AppTabBar items={useTabs('events')} />
    </div>
  );
}
