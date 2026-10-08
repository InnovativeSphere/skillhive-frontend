'use client';

import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useCommand } from './CommandPalette';
import { useIsMobile } from '@/hooks/useMediaQuery';

export function CommandTrigger() {
  const { open } = useCommand();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex items-center gap-1 rounded-full border border-border bg-surface p-1 shadow-card">
      <ThemeToggle />
      <button
        type="button"
        onClick={open}
        aria-label="Open command palette"
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        <Search size={18} />
      </button>
    </div>
  );
}