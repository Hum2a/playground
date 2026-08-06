import type { Specimen } from '../types'
export const darkHourConversionLoader: Specimen = {
  id: 'dark-hour-conversion-loader',
  ref: 'SPX-583',
  title: 'Dark Hour Conversion Loader',
  blurb:
    'A determinate loader where progress is the share of the interface converted by a travelling Dark Hour boundary, resolving to INDEX COMPLETE at 100%.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Dark Hour conversion-as-progress language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['loading', 'progress', 'transformation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'No travelling boundary under prefers-reduced-motion or data-force-reduced-motion; the demo jumps to the completed INDEX COMPLETE state after a short hold.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Dark Hour conversion loader',
  },

}
