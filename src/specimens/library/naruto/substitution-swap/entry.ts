import type { Specimen } from '../../../types'

export const substitutionSwap: Specimen = {
  id: 'substitution-swap',
  ref: 'SPX-2385',
  title: 'Substitution Swap',
  blurb:
    'A primary target puffs out and is briefly replaced by a proxy log decoy before the real failover target settles into its place.',
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
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 300,
    background: 'dark',
    label: 'Substitution swap',
  },
}
