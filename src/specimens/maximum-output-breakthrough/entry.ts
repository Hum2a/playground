import type { Specimen } from '../types'
export const maximumOutputBreakthrough: Specimen = {
  id: 'maximum-output-breakthrough',
  ref: 'SPX-2111',
  title: 'Maximum Output Breakthrough',
  blurb:
    'Output meter reaches 100% then physically breaks beyond its track with an accent burst shard.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['meter', 'breakthrough', 'maximum', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, meter shows extended MAX+ state immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Output meter',
  },

}
