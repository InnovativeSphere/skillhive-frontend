'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { navConfig, utilityNav, type NavItem } from '@/data/navConfig';
import { useAuth } from '@/components/auth/AuthProvider';
import { cn } from '@/lib/utils';
import { initials } from '@/lib/format';

type Props = {
  expanded: boolean;
  onToggle: () => void;
};

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname.startsWith(href);
}

function NavLink({
  item,
  expanded,
  active,
}: {
  item: NavItem;
  expanded: boolean;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-label={item.label}
      title={expanded ? undefined : item.label}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm transition-colors duration-150',
        active ? 'text-ink' : 'text-muted hover:bg-canvas/60 hover:text-ink',
      )}
    >
      {active && (
        <>
          <span className="absolute inset-0 rounded-lg bg-canvas" />
          <motion.span
            layoutId="sidebar-active-glow"
            className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-accent/30 blur-xl"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        </>
      )}
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <Icon size={18} className={active ? 'text-accent' : undefined} />
      </span>
      {expanded && (
        <span className="relative truncate">{item.label}</span>
      )}
      {active && (
        <motion.span
          layoutId="sidebar-underline"
          className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-accent"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export function Sidebar({ expanded, onToggle }: Props) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const items = user ? navConfig[user.role] : [];

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
  }

  return (
    <aside
      className={cn(
        'fixed bottom-4 left-4 top-4 z-30 flex flex-col rounded-2xl border border-border bg-surface/95 shadow-card backdrop-blur-md transition-[width] duration-300 ease-out',
        expanded ? 'w-[220px]' : 'w-[68px]',
      )}
    >
      {/* Top — logo + toggle */}
      <div className="flex items-center justify-between px-3 pb-4 pt-4">
        {expanded ? (
          <Link
            href="/dashboard"
            className="font-serif text-lg font-medium tracking-tight text-ink"
          >
            SkillHive<span className="text-accent">.</span>
          </Link>
        ) : (
          <Link
            href="/dashboard"
            aria-label="SkillHive dashboard"
            className="font-serif text-xl font-medium tracking-tight text-ink"
          >
            S<span className="text-accent">.</span>
          </Link>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <ChevronLeft
            size={16}
            className={cn('transition-transform duration-300', !expanded && 'rotate-180')}
          />
        </button>
      </div>

      {/* Middle — nav items */}
      <nav className="flex-1 overflow-y-auto px-2">
        {expanded && (
          <p className="px-2.5 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted">
            Menu
          </p>
        )}
        <div className="space-y-0.5">
          {items.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              expanded={expanded}
              active={isActive(pathname, item.href)}
            />
          ))}
        </div>
      </nav>

      {/* Bottom — utility + user */}
      <div className="border-t border-border px-2 pt-2">
        <div className="space-y-0.5 pb-2">
          {utilityNav.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              expanded={expanded}
              active={isActive(pathname, item.href)}
            />
          ))}
        </div>

        <div className="border-t border-border py-2">
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg px-2.5 py-2',
              !expanded && 'justify-center',
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-canvas">
              {initials(user?.fullName ?? '')}
            </div>
            {expanded && user && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-ink">
                  {user.fullName}
                </p>
                <p className="truncate font-mono text-[10px] uppercase tracking-widest text-muted">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            )}
            {expanded && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                aria-label="Log out"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink disabled:opacity-50"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}