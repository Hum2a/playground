import type { Specimen } from '../../../types'
export const measurementOverload: Specimen = {
  id: 'measurement-overload',
  ref: 'SPX-1185',
  title: 'Measurement Overload',
  blurb:
    'An analyser built for 0–9,999 climbs a frozen reading sequence, holds at maximum, then fails representation into > 9,999 with a broken frame — controlled overflow, not a glitch loop.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball scouter overload–inspired measurement failure (abstract)',
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
  tags: ['overflow', 'measurement', 'warning'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, MEASURE jumps to the static broken-frame state with > 9,999 and RANGE EXCEEDED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Measurement overload',
  },

}
