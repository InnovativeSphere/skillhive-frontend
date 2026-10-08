'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MessageCircle, X, ArrowUpRight } from 'lucide-react';
import { contact } from '@/data/landing';
import { cn } from '@/lib/utils';

type Channel = 'email' | 'whatsapp';

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [channel, setChannel] = useState<Channel>('email');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const active = contact.channels[channel];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-label="Contact"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-canvas shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-serif text-lg font-medium tracking-tight text-ink">
                Talk to us
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5">
              <div className="relative grid grid-cols-2 rounded-full border border-border bg-surface p-1">
                {(['email', 'whatsapp'] as Channel[]).map((key) => {
                  const isActive = channel === key;
                  const c = contact.channels[key];
                  const Icon = key === 'email' ? Mail : MessageCircle;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setChannel(key)}
                      className="relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-150"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="contact-tab"
                          className="absolute inset-0 rounded-full bg-canvas shadow-subtle"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span
                        className={cn(
                          'relative flex items-center gap-2',
                          isActive ? 'text-ink' : 'text-muted',
                        )}
                      >
                        <Icon size={14} className={isActive ? 'text-accent' : ''} />
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={channel}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {active.label}
                    </p>
                    <p className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
                      {active.value}
                    </p>
                    <p className="mt-2 text-sm text-muted">{active.description}</p>

                    <a
                      href={active.href}
                      target={channel === 'whatsapp' ? '_blank' : undefined}
                      rel={channel === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all duration-150 hover:scale-[1.02] hover:bg-accent-deep"
                    >
                      {channel === 'email' ? 'Open email' : 'Open WhatsApp'}
                      <ArrowUpRight size={14} />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}