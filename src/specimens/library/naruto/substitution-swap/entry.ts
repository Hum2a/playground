import type { Specimen } from '../../../types'

export const substitutionSwap: Specimen = {
  id: 'substitution-swap',
  ref: 'SPX-2385',
  title: 'Substitution Swap',
  blurb:
    'Primary puffs out into a log decoy-only mid-state for 220ms, then puffs into the real failover target.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the slot jumps straight to the resolved failover target with no decoy step or puff.',
  },
  acceptance: [
    'Mid-sequence is decoy-only for 220ms (log grain visible)',
    'Swaps use clip-path + puff — not opacity crossfade; timings 100/220/140ms',
    'Reduced motion jumps to failover target',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 300,
    background: 'dark',
    label: 'Substitution swap',
  },
}
