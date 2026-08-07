import type { Specimen } from '../../../types'

export const chakraControlBalance: Specimen = {
  id: 'chakra-control-balance',
  ref: 'SPX-2358',
  title: 'Chakra Control Balance',
  blurb:
    'Hold both chakra inputs to draw the needle into an ±8% lock threshold; early release cancels before LOCKED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the needle appears LOCKED in the centre band immediately.',
  },
    acceptance: [
    'Needle must enter ±8% lock threshold inside the centre band to lock',
    'Hold both inputs; early release cancels before lock',
    'Lock holds then pulses LOCKED',
    'Replay returns needle unbalanced before rerunning',
    'Reduced motion shows LOCKED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    label: 'Chakra control balance',
  },
}
