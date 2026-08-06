import type { Specimen } from '../../../types'
export const trainingSimulationStart: Specimen = {
  id: 'training-simulation-start',
  ref: 'SPX-2027',
  title: 'Training Simulation Start',
  blurb:
    'READY panel counts down 3-2-1-GO then bursts into active telemetry tiles with pulse, load, and alert readouts.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired training interface (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['training', 'countdown', 'telemetry'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, telemetry tiles appear immediately without countdown or burst.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Training simulation start',
  },

}
