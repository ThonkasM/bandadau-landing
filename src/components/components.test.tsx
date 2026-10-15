import { THEME_STORAGE_KEY } from '@bandada/ui-tokens';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { PublicEvents } from '@/components/sections/PublicEvents';
import { renderWithProviders } from '@/test/render';

vi.mock('next/navigation', () => ({ usePathname: () => '/es/privacidad/' }));

beforeEach(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});
afterEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  vi.unstubAllGlobals();
});

describe('Hero', () => {
  it('muestra título, CTA «Abrir la app» hacia la app y el mockup accesible (es)', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('La red social de tu universidad');
    expect(screen.getByRole('link', { name: /abrir la app/i })).toHaveAttribute('href', 'http://app.bandada.localhost');
    expect(screen.getByRole('img', { name: /vista previa/i })).toBeInTheDocument();
  });

  it('se traduce al inglés', () => {
    renderWithProviders(<Hero />, 'en');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Your university's social network");
    expect(screen.getByRole('link', { name: /open the app/i })).toBeInTheDocument();
  });
});

describe('LanguageSwitcher', () => {
  it('enlaza a la ruta equivalente en el otro idioma', () => {
    renderWithProviders(<LanguageSwitcher />);
    expect(screen.getByRole('link', { name: /english/i })).toHaveAttribute('href', '/en/privacy/');
  });
});

describe('ThemeToggle', () => {
  it('recorre automático → claro → oscuro y persiste en bandada.theme', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);
    await user.click(screen.getByRole('button'));
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('LIGHT');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    await user.click(screen.getByRole('button'));
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('DARK');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    await user.click(screen.getByRole('button'));
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });
});

describe('Navbar', () => {
  it('abre y cierra el menú móvil con teclado', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);
    const toggle = screen.getByRole('button', { name: /abrir menú/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: /abrir menú/i })).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('PublicEvents', () => {
  it('muestra los eventos de ejemplo con aviso cuando la API no responde', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    renderWithProviders(<PublicEvents />);
    expect(await screen.findByText(/taller de docker para principiantes/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('note')).toHaveTextContent(/eventos de ejemplo/i));
  });

  it('muestra los eventos reales de la API sin aviso de ejemplo', async () => {
    const item = {
      id: 'e1',
      title: 'Feria de proyectos',
      venue: 'Patio central',
      startsAt: '2026-11-02T20:00:00Z',
      priceCredits: 0,
      seatsAvailable: 10,
      capacity: 50,
      coverUrl: null,
      status: 'PUBLISHED',
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ items: [item], nextCursor: null }), { status: 200 })));
    renderWithProviders(<PublicEvents />);
    expect(await screen.findByText('Feria de proyectos')).toBeInTheDocument();
    expect(screen.getByText('Gratis')).toBeInTheDocument();
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });
});
