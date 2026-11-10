'use client';

import { ArrowRight, BadgeCheck, Code2, Compass, HeartHandshake, Languages, ShieldCheck, Target, WifiOff } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Reveal } from '@/components/common/Reveal';
import { useLocale } from '@/components/common/use-locale';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section, SectionHeading } from '@/components/ui/Section';
import { env } from '@/lib/env';
import { homePath } from '@/lib/locale';

const VALUES = [
  { icon: BadgeCheck, key: 'community' },
  { icon: ShieldCheck, key: 'trust' },
  { icon: WifiOff, key: 'offline' },
  { icon: HeartHandshake, key: 'care' },
  { icon: Languages, key: 'inclusive' },
  { icon: Code2, key: 'rigor' },
] as const;

/** Integrantes del equipo (Grupo 24). Los nombres no se traducen. */
const TEAM = [
  { name: 'Jorge Carvajal', photo: '/team/jorge-carvajal.jpg' },
  { name: 'Cesar Caballero', photo: '/team/cesar-caballero.jpg' },
  { name: 'Diego Yebara', photo: '/team/diego-yebara.jpg' },
] as const;

/** Página «Sobre nosotros»: misión, visión, valores, el proyecto y el equipo. */
export function AboutPage() {
  const { t } = useTranslation();
  const locale = useLocale();
  return (
    <>
      <Navbar />
      <main id="main">
        <Section labelledBy="about-title" className="pt-28 sm:pt-32 lg:pt-36">
          <SectionHeading
            id="about-title"
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
            subtitle={t('about.subtitle')}
          />
        </Section>

        <Section tone="muted" labelledBy="about-mv-title">
          <h2 id="about-mv-title" className="sr-only">
            {t('about.mvTitle')}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {(['mission', 'vision'] as const).map((key, index) => {
              const Icon = key === 'mission' ? Target : Compass;
              return (
                <Reveal key={key} delay={index * 80} className="rounded-3xl border border-default bg-surface p-8 sm:p-10">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-surface-muted text-link">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-primary">{t(`about.${key}Title`)}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-secondary">{t(`about.${key}Body`)}</p>
                </Reveal>
              );
            })}
          </div>
        </Section>

        <Section labelledBy="about-values-title">
          <SectionHeading
            id="about-values-title"
            eyebrow={t('about.valuesEyebrow')}
            title={t('about.valuesTitle')}
            subtitle={t('about.valuesSubtitle')}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, key }, index) => (
              <Reveal as="li" key={key} delay={index * 60} className="rounded-2xl border border-default bg-surface p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-surface-muted text-link">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-primary">{t(`about.values.${key}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{t(`about.values.${key}Body`)}</p>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section tone="muted" labelledBy="about-project-title">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 id="about-project-title" className="text-fluid-section font-bold text-primary">
                {t('about.projectTitle')}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary">{t('about.projectBody')}</p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {(['course', 'method'] as const).map((key) => (
                  <div key={key} className="rounded-2xl border border-default bg-surface p-5">
                    <dt className="text-xs font-bold uppercase tracking-widest text-muted">{t(`about.${key}Label`)}</dt>
                    <dd className="mt-2 font-semibold text-primary">{t(`about.${key}Value`)}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="text-2xl font-bold text-primary">{t('about.teamTitle')}</h3>
              <p className="mt-3 text-secondary">{t('about.teamSubtitle')}</p>
              <ul className="mt-6 space-y-3">
                {TEAM.map(({ name, photo }) => (
                  <li key={name} className="flex items-center gap-4 rounded-2xl border border-default bg-surface p-4">
                    <Image
                      src={photo}
                      alt={name}
                      width={96}
                      height={96}
                      unoptimized
                      className="size-16 shrink-0 rounded-full border border-default object-cover"
                    />
                    <span className="font-semibold text-primary">{name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section tone="brand" labelledBy="about-cta-title" className="my-6 lg:my-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="about-cta-title" className="text-fluid-section font-bold sm:text-4xl">
              {t('about.ctaTitle')}
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={env.appUrl} variant="inverse" size="lg" className="rounded-full px-7">
                {t('cta.primary')}
                <ArrowRight className="size-5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={homePath(locale)} variant="ghost" size="lg" className="rounded-full px-7">
                {t('legal.back')}
              </ButtonLink>
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
