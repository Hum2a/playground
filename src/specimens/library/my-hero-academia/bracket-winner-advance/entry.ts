import type { Specimen } from '../types'
export const bracketWinnerAdvance: Specimen = {
  id: 'bracket-winner-advance',
  ref: 'SPX-2038',
  title: 'Bracket Winner Advance',
  blurb:
    'Winner card ALPHA travels along a tournament connector path from round one into the next-round slot while the connector draws.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired tournament bracket UI (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['bracket', 'tournament', 'advance'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, next-round slot updates immediately without travel choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Bracket winner advance',
  },

}
