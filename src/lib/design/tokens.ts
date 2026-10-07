
// -----------------------------------------------------------------------------
// COLORS — every color earned. No decoration for decoration's sake.
// -----------------------------------------------------------------------------

export const colors = {
  // Accent — Claude terracotta. The one warm signal in the system.
  accent: '#D97757',
  accentDeep: '#C2603F',
  accentSoft: '#F5E5DE', // light tint for backgrounds, hover states

  // Ink — warm dark, never pure black.
  ink: '#191919',

  // Surfaces — warm off-white family. Paper, not screen.
  surface: '#F0EEE6', // panels, cards, sidebars
  canvas: '#FAF9F5',  // page background — the base of everything
  white: '#FFFFFF',   // contrast moments only. Use sparingly.

  // Text
  muted: '#6B6B6B',   // supporting copy, labels, secondary info

  // Borders — subtle separation, never loud.
  border: 'rgba(25, 25, 25, 0.08)',
  borderStrong: 'rgba(25, 25, 25, 0.15)',
} as const;

// -----------------------------------------------------------------------------
// TYPOGRAPHY — three families, one job each. Editorial restraint.
// -----------------------------------------------------------------------------

export const typography = {
  families: {
    // Headings — Fraunces, loaded via next/font
    serif: 'var(--font-serif)',
    // Body — Inter
    sans: 'var(--font-sans)',
    // Technical labels, code, data — JetBrains Mono
    mono: 'var(--font-mono)',
  },
} as const;

// -----------------------------------------------------------------------------
// RADII — rounded corners. Consistent across the system.
// -----------------------------------------------------------------------------

export const radii = {
  sm: '4px',   // inputs, small chips
  md: '8px',   // buttons, tags
  lg: '12px',  // cards
  xl: '16px',  // panels, modals
  '2xl': '24px', // hero surfaces
} as const;

// -----------------------------------------------------------------------------
// SHADOWS — restrained. Warm-tinted (rgba of ink), never pure black.
// -----------------------------------------------------------------------------

export const shadows = {
  subtle: '0 1px 2px rgba(25, 25, 25, 0.04)',
  card: '0 4px 12px rgba(25, 25, 25, 0.06)',
  elevated: '0 12px 32px rgba(25, 25, 25, 0.08)',
} as const;

// -----------------------------------------------------------------------------
// MOTION — motion is information. Every easing has a job.
// -----------------------------------------------------------------------------

export const motion = {
  duration: {
    fast: 0.15,   // hover, tap
    base: 0.25,   // most transitions
    slow: 0.4,    // page-level, hero moments
  },
  // Framer Motion easings — cubic-bezier arrays
  ease: {
    outExpo: [0.22, 1, 0.36, 1] as const,     // exits, reveals — confident
    inOutSoft: [0.65, 0, 0.35, 1] as const,   // state changes — balanced
    spring: [0.34, 1.56, 0.64, 1] as const,   // micro-interactions — alive
  },
} as const;

// -----------------------------------------------------------------------------
// Z-INDEX — one scale, no guessing.
// -----------------------------------------------------------------------------

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
} as const;

// -----------------------------------------------------------------------------
// EXPORT AGGREGATE — for convenience
// -----------------------------------------------------------------------------

export const tokens = {
  colors,
  typography,
  radii,
  shadows,
  motion,
  zIndex,
} as const;

export type Tokens = typeof tokens;