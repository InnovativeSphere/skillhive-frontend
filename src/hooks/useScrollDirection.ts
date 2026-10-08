'use client';

import { useEffect, useState } from 'react';

type Direction = 'up' | 'down' | null;

// Tracks scroll direction with a threshold so tiny jitters don't flip state.
export function useScrollDirection(threshold = 8): Direction {
  const [direction, setDirection] = useState<Direction>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= threshold) {
        setDirection(y > lastY ? 'down' : 'up');
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}