import type { Specimen } from '../../../types'
export const callingCardPeel: Specimen = {
  id: 'calling-card-peel',
  ref: 'SPX-012',
  title: 'Calling Card Peel',
  blurb:
    'A crooked printed notice curls from one corner, peels diagonally across its host, and flicks away to reveal the content underneath.',
  origin: {
    project: 'Original',
    surface: "Persona 5's handmade graphic interface language",
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['reveal', 'paper', 'peel', 'unlock'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Corner curl, diagonal peel, and release flick are skipped under prefers-reduced-motion or data-force-reduced-motion; the obstruction disappears immediately and host content stays available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Covered archive card',
  },

}
