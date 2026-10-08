import type { Variants } from 'framer-motion';

// Shared easings — mirror of tokens.ts motion.ease.
export const ease = {
  outExpo: [0.22, 1, 0.36, 1] as const,
  inOutSoft: [0.65, 0, 0.35, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: ease.outExpo } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.outExpo } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.outExpo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: ease.outExpo } },
};

// Wrap children in a parent with this to stagger their reveals.
// Children must use fadeUp / fadeIn / etc. with variants={...}.
export const stagger = (delay = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren },
  },
});

// Standard viewport config for whileInView — fires once, no re-trigger on scroll up.
export const viewportOnce = { once: true, margin: '-80px' } as const;