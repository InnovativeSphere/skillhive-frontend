'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { formatCompact, formatCurrency, formatCurrencyCompact } from '@/lib/format';

type Format = 'plain' | 'compact' | 'currency' | 'currencyCompact';

type Props = {
  to: number;
  from?: number;
  duration?: number; // seconds
  format?: Format;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const formatters: Record<Format, (v: number) => string> = {
  plain: (v) => v.toString(),
  compact: formatCompact,
  currency: formatCurrency,
  currencyCompact: formatCurrencyCompact,
};

export function CountUp({
  to,
  from = 0,
  duration = 1.2,
  format = 'plain',
  prefix,
  suffix,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatters[format](value)}
      {suffix}
    </span>
  );
}