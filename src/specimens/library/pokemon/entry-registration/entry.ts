import type { Specimen } from '../../../types'
export const entryRegistration: Specimen = {
  id: 'entry-registration',
  ref: 'SPX-786',
  title: 'Entry Registration',
  blurb:
    'A vertical scan resolves an unknown silhouette into structured geometry, swaps UNKNOWN metadata at fixed thresholds, cycles seven index candidates, then locks ENTRY // 086 as a permanent registered record.',
  origin: {
    project: 'Original',
    surface: 'Pokémon Pokédex–inspired registration language (abstract)',
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
  tags: ['registration', 'discovery', 'catalogue'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, REGISTER jumps straight to the final ENTRY // 086 registered record with no scan or index flicker.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',

    label: 'Entry registration',
  },

}
