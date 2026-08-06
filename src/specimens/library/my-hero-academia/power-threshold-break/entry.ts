import type { Specimen } from '../types'
export const powerThresholdBreak: Specimen = {
  id: 'power-threshold-break',
  ref: 'SPX-2001',
  title: 'Power Threshold Break',
  blurb:
    'An OUTPUT meter surges from 92% through a shattering 100% cap line to a BREAKTHROUGH accent overshoot.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired power cap / limit-break feedback language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['meter', 'threshold', 'breakthrough'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, BREAKTHROUGH shows immediately at 108% fill.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',

    label: 'Power threshold break',
  },

}
