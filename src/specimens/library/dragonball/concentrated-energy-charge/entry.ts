import type { Specimen } from '../types'
export const concentratedEnergyCharge: Specimen = {
  id: 'concentrated-energy-charge',
  ref: 'SPX-968',
  title: 'Concentrated Energy Charge',
  blurb:
    'BUILD TEST PACKAGE SIGN send twelve packets along four frozen paths into a central node that grows 26→72px, stabilises, then sits ARMED without releasing.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Kamehameha charge / convergence (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['convergence', 'preparation', 'armed-action'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, CHARGE immediately shows the 72px armed node, subdued provenance paths, and ARMED / RELEASE with no packet travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 400,
    background: 'dark',

    label: 'Concentrated energy charge to ARMED',
  },

}
