import type { Specimen } from '../../../types'
export const comicCardSelection: Specimen = {
  id: 'comic-card-selection',
  ref: 'SPX-176',
  title: 'Comic Card Selection',
  blurb:
    'Selected card escapes the grid—scales, lifts, and misregisters—while neighbours peel aside so the whole composition reacts.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['selection', 'comic', 'grid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selection snaps to the final selected composition under prefers-reduced-motion or data-force-reduced-motion; neighbour offsets update immediately with no scale/travel choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',

    label: 'Comic card selection',
  },

}
