import type { Specimen } from '../../../types'

export const transformationMorph: Specimen = {
  id: 'transformation-morph',
  ref: 'SPX-2402',
  title: 'Transformation Morph',
  blurb:
    'One profile card collapses through a bold silhouette intermediate and expands into a second, distinct profile.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — transformation & disguise',
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
  tags: ['morph', 'identity', 'silhouette'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the second profile appears immediately with no silhouette intermediate.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    label: 'Transformation morph',
  },
}
