import type { Specimen } from '../types'
export const forgetAMove: Specimen = {
  id: 'forget-a-move',
  ref: 'SPX-816',
  title: 'Forget a Move',
  blurb:
    'Four capabilities hold SCAN FILTER EXPORT CACHE; REPLACE compresses the selected slot, breaks its outline, then installs SYNC into the vacant place before a sweep locks the new set.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired forget-a-move / capability replacement (abstract)',
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
  tags: ['replacement', 'capability', 'decision'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, radiogroup selection remains; REPLACE instantly swaps the selected label to SYNC with no compress/break/travel choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',

    label: 'Forget a Move capability replacement',
  },

}
