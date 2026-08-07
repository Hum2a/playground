import type { Specimen } from '../../../types'

export const chakraChargeField: Specimen = {
  id: 'chakra-charge-field',
  ref: 'SPX-2354',
  title: 'Chakra Charge Field',
  blurb:
    'Hold grows an irregular chakra boundary through frozen diameter steps over 620ms; release commits.',
  origin: {
    project: 'Original',
    surface: 'Naruto / chakra training — charge field',
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
  tags: ["charge","hold","field"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Chakra Charge Field state appears immediately.',
  },
  acceptance: [
    'Boundary fill uses irregular clip-path growth driven by --p over chargeMs 620',
    'Diameter steps pass through 42% / 68% / 100% before READY/COMMITTED',
    'Release commits current level; early release below full still commits partial',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Chakra Charge Field',
  },
}
