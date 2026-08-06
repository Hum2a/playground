import type { Specimen } from '../../../types'
export const performanceMeterBurst: Specimen = {
  id: 'performance-meter-burst',
  ref: 'SPX-2030',
  title: 'Performance Meter Burst',
  blurb:
    'Result bars race to final values; the OUTPUT meter overshoots the graph ceiling with an accent burst shadow.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired training results UI (abstract)',
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
  tags: ['meter', 'results', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, bars appear at final values immediately with burst shadow on OUTPUT.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Performance meter burst',
  },

}
