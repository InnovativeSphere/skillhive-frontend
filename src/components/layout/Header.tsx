'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, sectionIds } from '@/data/nav';
import { useCommand } from '@/components/command/CommandPalette';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

function sectionFromHref(href: string) {
  const i = href.indexOf('#');
  return i === -1 ? null : href.slice(i + 1);
}

export function Header() {
  const { open: openCommand } = useCommand();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = Object.values(sectionIds)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 h-[72px] border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out',
          scrolled
            ? 'border-border bg-canvas/80 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.primary.map((item) => {
              const section = sectionFromHref(item.href);
              const isActive = section !== null && section === activeSection;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm transition-colors duration-150',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={openCommand}
              aria-label="Open command palette"
              className="mr-2 hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-ink lg:flex"
            >
              <span>Search</span>
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] tracking-wide">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <Link
              href={nav.auth.signin.href}
              className="ml-2 text-sm text-ink transition-colors duration-150 hover:text-muted"
            >
              {nav.auth.signin.label}
            </Link>
            <Link
              href={nav.auth.signup.href}
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all duration-150 hover:scale-[1.02] hover:bg-accent-deep"
            >
              {nav.auth.signup.label}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-canvas md:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-24">
              <nav className="flex flex-col gap-6" aria-label="Mobile">
                {nav.primary.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-3xl font-medium tracking-tight text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <Link
                  href={nav.auth.signin.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-ink"
                >
                  {nav.auth.signin.label}
                </Link>
                <Link
                  href={nav.auth.signup.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-accent px-6 py-3 text-center text-base font-medium text-white"
                >
                  {nav.auth.signup.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}