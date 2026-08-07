import type { Specimen } from '../../../types'

export const chakraControlBalance: Specimen = {
  id: 'chakra-control-balance',
  ref: 'SPX-2358',
  title: 'Chakra Control Balance',
  blurb:
    'Dual inputs drive a needle into a ±0.08 centre band; hold 380ms to lock balanced control.',
  origin: {
    project: 'Original',
    surface: 'Naruto / chakra training — control balance',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["balance","hold","equilibrium"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Chakra Control Balance state appears immediately.',
  },
  acceptance: [
    'Needle must stay inside ±band 0.08 for lockHoldMs 380 to reach LOCKED',
    'Wobble uses halfLifeMs 90 before settling; lock pulse is lockPulseMs 150 one-shot',
    'Leaving the band before lock cancels the hold timer',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Chakra Control Balance',
  },
}
