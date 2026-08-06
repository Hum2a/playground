import type { Specimen } from '../types'
export const springSelectionPill: Specimen = {
  id: 'spring-selection-pill',
  ref: 'SPX-1364',
  title: 'Spring Selection Marker',
  blurb:
    'Shared selection backing springs between DAY/WEEK/MONTH/YEAR with distinct long-jump and adjacent settle profiles.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired spring selection pill',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['selection', 'spring', 'pill'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, backing jumps directly to selected segment.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 120,
    background: 'dark',

    label: 'Spring selection pill',
  },

}
