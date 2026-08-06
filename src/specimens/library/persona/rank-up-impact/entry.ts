import type { Specimen } from '../../../types'
export const rankUpImpact: Specimen = {
  id: 'rank-up-impact',
  ref: 'SPX-022',
  title: 'Rank Up Impact',
  blurb:
    'Dramatic rank progression: 04 is struck and split, irregular rings expand, huge 05 slams in, RANK UP and a new ability unlock, then settle to a compact result.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 dramatic social/progression presentation language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['achievement', 'progress', 'rank-up', 'slam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Strike, radial expansion, number slam, and travelling panels are skipped under prefers-reduced-motion or data-force-reduced-motion; RANK 05 and Advanced Filters unlocked appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'card',

    label: 'Archive rank card',
  },

}
