import type { Specimen } from '../types'
export const victoryResultsTally: Specimen = {
  id: 'victory-results-tally',
  ref: 'SPX-014',
  title: 'Victory Results Tally',
  blurb:
    'Elegant post-completion results plate with sequential row reveals and deterministic count-up tallies ending in LEVEL UP.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'final-fantasy',
  },
  tags: ['tally', 'results', 'count-up'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'All final values and LEVEL UP appear immediately under prefers-reduced-motion or data-force-reduced-motion; no counting or flare movement.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Activity complete',
  },

}
