import type { Specimen } from '../types'

export const chakraControlBalance: Specimen = {
  id: 'chakra-control-balance',
  ref: 'SPX-2358',
  title: 'Chakra Control Balance',
  blurb:
    'Two opposing chakra inputs push a needle apart — hold both sides in the narrow centre band to lock a stable balance.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction chakra-control training — equilibrium',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['balance', 'hold', 'equilibrium'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the needle jumps straight to the centred, locked-balanced state with no oscillation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    label: 'Chakra control balance',
  },
}
