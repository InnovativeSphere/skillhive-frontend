'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import {
  commands,
  type Command,
  type CommandGroup,
} from '@/data/command';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

type Ctx = { isOpen: boolean; open: () => void; close: () => void };
const CommandContext = createContext<Ctx | null>(null);

export function useCommand() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error('useCommand must be used inside CommandProvider');
  return ctx;
}

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  useKeyboardShortcut('k', { meta: true }, () => setOpen((v) => !v));
  useKeyboardShortcut('Escape', { preventDefault: false }, () => {
    if (isOpen) setOpen(false);
  });

  return (
    <CommandContext.Provider
      value={{ isOpen, open: () => setOpen(true), close: () => setOpen(false) }}
    >
      {children}
      <CommandPalette />
    </CommandContext.Provider>
  );
}

function CommandPalette() {
  const { isOpen, close } = useCommand();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query]);

  const groups = useMemo(() => {
    const map = new Map<CommandGroup, Command[]>();
    filtered.forEach((c) => {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const run = (c: Command) => {
    close();
    if (c.kind === 'navigate') {
      router.push(c.target);
    } else if (c.kind === 'scroll') {
      document
        .getElementById(c.target)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (c.kind === 'action') {
      if (c.target === 'toggle-theme') {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      } else if (c.target === 'open-github') {
        window.open(
          'https://github.com/InnovativeSphere/skillhive-frontend',
          '_blank',
        );
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const c = filtered[selectedIndex];
      if (c) run(c);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: isMobile ? 40 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 40 : 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'fixed z-50 overflow-hidden border border-border bg-canvas shadow-elevated',
              isMobile
                ? 'inset-x-0 bottom-0 rounded-t-2xl'
                : 'left-1/2 top-[18%] w-full max-w-lg -translate-x-1/2 rounded-2xl',
            )}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search size={16} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or jump to…"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              {!isMobile && (
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted">
                  esc
                </kbd>
              )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-muted">
                  No results.
                </p>
              )}

              {groups.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                    {group}
                  </p>
                  {items.map((c) => {
                    const idx = filtered.indexOf(c);
                    const selected = idx === selectedIndex;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => run(c)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          'flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors',
                          selected
                            ? 'bg-surface text-ink'
                            : 'text-muted hover:text-ink',
                        )}
                      >
                        <span>{c.label}</span>
                        {c.hint && (
                          <span className="font-mono text-xs text-muted">
                            {c.hint}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {!isMobile && (
              <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                <span>
                  <kbd className="rounded border border-border bg-surface px-1 py-0.5">
                    ↑↓
                  </kbd>{' '}
                  navigate
                </span>
                <span>
                  <kbd className="rounded border border-border bg-surface px-1 py-0.5">
                    ↵
                  </kbd>{' '}
                  select
                </span>
                <span>
                  <kbd className="rounded border border-border bg-surface px-1 py-0.5">
                    esc
                  </kbd>{' '}
                  close
                </span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}