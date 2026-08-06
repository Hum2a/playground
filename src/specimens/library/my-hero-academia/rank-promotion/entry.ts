import type { Specimen } from '../../../types'
export const rankPromotion: Specimen = {
  id: 'rank-promotion',
  ref: 'SPX-2049',
  title: 'Rank Promotion',
  blurb:
    'UNIT-07 at rank #4 surges upward through the leaderboard while displaced UNIT-22 shifts down; RANK UP badge settles at #3.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired hero ranking progression',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['ranking', 'promotion', 'leaderboard', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, rows jump to final positions with RANK UP badge visible immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'card',

    label: 'Hero ranking list',
  },

}
