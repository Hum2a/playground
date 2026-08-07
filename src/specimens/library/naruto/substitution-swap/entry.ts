import type { Specimen } from '../../../types'

export const substitutionSwap: Specimen = {
  id: 'substitution-swap',
  ref: 'SPX-2385',
  title: 'Substitution Swap',
  blurb:
    'Log target puffs out into a decoy-only mid-state (200ms hold), then clip/scales into the true failover target — not a crossfade.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction kawarimi study — substitution failover',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['failover', 'swap', 'decoy'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the slot jumps straight to the true failover target with no decoy step or puff.',
  },
  acceptance: [
    'Mid-sequence shows decoy only before true target restores',
    'Swap timings frozen: Log → decoy 120ms, hold 200ms, target 140ms',
    'Reduced motion jumps to true target',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 300,
    background: 'dark',
    label: 'Substitution swap',
  },
}
