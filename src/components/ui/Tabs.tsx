'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Tab = { id: string; label: string; content: React.ReactNode };

export function Tabs({
  tabs,
  defaultTab,
}: {
  tabs: readonly Tab[];
  defaultTab?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div className="mx-auto flex w-fit rounded-full border border-border bg-surface p-1">
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className="relative z-10 rounded-full px-5 py-2 text-sm transition-colors duration-150"
            >
              {isActive && (
                <motion.span
                  layoutId="tabs-pill"
                  className="absolute inset-0 rounded-full bg-canvas shadow-subtle"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  'relative',
                  isActive ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}