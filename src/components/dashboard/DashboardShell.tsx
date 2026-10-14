'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Menu, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useCommand } from '@/components/command/CommandPalette';
import { useAuth } from '@/components/auth/AuthProvider';
import { initials } from '@/lib/format';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'skillhive.sidebar.expanded';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { open: openCommand } = useCommand();
  const [expanded, setExpanded] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hydrate from localStorage once.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'false') setExpanded(false);
  }, []);

  function toggle() {
    setExpanded((v) => {
      const next = !v;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  // Close mobile drawer on route change (pathname change while open).
  useEffect(() => {
    setDrawerOpen(false);
  }, [children]);

  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar expanded={expanded} onToggle={toggle} />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '-120%' }}
              animate={{ x: 0 }}
              exit={{ x: '-120%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="md:hidden"
            >
              <Sidebar expanded={true} onToggle={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main area — shifts on desktop when sidebar expands */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-[padding] duration-300 ease-out',
          expanded ? 'md:pl-[236px]' : 'md:pl-[84px]',
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-border bg-canvas/80 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 md:px-6">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface md:hidden"
            >
              <Menu size={20} />
            </button>

            <button
              type="button"
              onClick={openCommand}
              className="flex h-9 flex-1 items-center gap-2 rounded-full border border-border bg-surface/60 px-3 text-left text-xs text-muted transition-colors hover:border-border-strong hover:text-ink md:max-w-sm"
            >
              <Search size={14} />
              <span className="flex-1">Search or jump to…</span>
              <kbd className="hidden rounded border border-border bg-canvas px-1.5 py-0.5 font-mono text-[10px] md:inline">
                ⌘K
              </kbd>
            </button>

            <div className="ml-auto flex items-center gap-1">
              <Link
                href="/dashboard/notifications"
                aria-label="Notifications"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <Bell size={18} />
              </Link>
              <ThemeToggle />
              <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-canvas">
                {initials(user?.fullName ?? '')}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}