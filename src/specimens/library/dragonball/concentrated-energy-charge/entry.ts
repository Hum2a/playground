import type { Specimen } from '../../../types'
export const concentratedEnergyCharge: Specimen = {
  id: 'concentrated-energy-charge',
  ref: 'SPX-968',
  title: 'Concentrated Energy Charge',
  blurb:
    'Four sources send beam-streak packets along frozen channels into a growing node with nozzle flare; stabilises to static ARMED without releasing.',
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
