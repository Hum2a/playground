import type { Specimen } from '../types'
export const arcanaRankUp: Specimen = {
  id: 'arcana-rank-up',
  ref: 'SPX-2970',
  title: 'Arcana Rank-Up',
  blurb:
    'A social-link bond card rises to a new rank with a finite card flourish and RANK UP stamp.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired social links / arcana progression language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['arcana', 'rank', 'social-link'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, new rank and flourish appear immediately without rise animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'Arcana rank-up',
  },
}
