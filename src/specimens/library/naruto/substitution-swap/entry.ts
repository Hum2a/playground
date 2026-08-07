import type { Specimen } from '../../../types'

export const substitutionSwap: Specimen = {
  id: 'substitution-swap',
  ref: 'SPX-2385',
  title: 'Substitution Swap',
  blurb:
    'Primary collapses into a decoy-only mid-hold (180ms), then the failover target expands in — scale swaps, not fades.',
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
  tags: ['failover', 'swap', 'decoy', 'mid-state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the slot jumps straight to the resolved failover target with no decoy step or puff.',
  },
  acceptance: [
    'Mid-sequence is decoy-only for 180ms',
    'Layers scale 0↔1 (not opacity fade)',
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
