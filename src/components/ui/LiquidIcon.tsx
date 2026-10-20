'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  icon: React.ElementType;
  className?: string;
};

export function LiquidIcon({ icon: Icon, className }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-border transition-colors duration-300',
        hovered && 'border-accent',
        className,
      )}
    >
      {/* The liquid fill */}
      <motion.div
        initial={false}
        animate={{
          y: hovered ? '0%' : '100%',
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 bg-accent"
      />

      {/* The icon */}
      <Icon
        size={24}
        className={cn(
          'relative z-10 transition-colors duration-300',
          hovered ? 'text-canvas' : 'text-muted',
        )}
      />

      {/* The bubbles */}
      <AnimatePresence>
        {hovered && (
          <>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: -30, opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
              className="absolute left-4 z-10 h-1.5 w-1.5 rounded-full bg-canvas/50"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: -40, opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 0.8 }}
              className="absolute right-5 z-10 h-2 w-2 rounded-full bg-canvas/40"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: -25, opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatDelay: 0.4 }}
              className="absolute left-8 z-10 h-1 w-1 rounded-full bg-canvas/60"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}