import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

export interface AppTabItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

/**
 * Barra de pestañas flotante (cápsula inferior, solo iconos). Replica la de la app:
 * cápsula despegada del borde, fondo opaco, borde fino y estado activo por color.
 */
export function AppTabBar({ items, className }: { items: AppTabItem[]; className?: string }) {
  return (
    <div className={cn('absolute inset-x-3 bottom-4 z-20 flex items-center gap-0.5 rounded-full border border-default bg-surface p-1.5 shadow-lg', className)}>
      {items.map(({ icon: Icon, label, active }) => (
        <span
          key={label}
          title={label}
          className={cn('flex flex-1 items-center justify-center rounded-full py-2.5', active ? 'text-link' : 'text-muted')}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
      ))}
    </div>
  );
}
