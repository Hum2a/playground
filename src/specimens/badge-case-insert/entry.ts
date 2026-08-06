import type { Specimen } from '../types'
export const badgeCaseInsert: Specimen = {
  id: 'badge-case-insert',
  ref: 'SPX-844',
  title: 'Badge Case Insert',
  blurb:
    'A newly earned abstract badge targets slot 6 of a rigid Trial Archive, docks with a compress, and only then advances the collection from 5/8 to 6/8.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired badge case / collection insert language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['collection', 'achievement', 'insert'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, six occupied slots and 6/8 appear immediately with no travel or dock choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 400,
    background: 'dark',

    label: 'Badge case insert',
  },

}
