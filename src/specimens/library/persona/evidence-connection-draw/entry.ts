import type { Specimen } from '../types'
export const evidenceConnectionDraw: Specimen = {
  id: 'evidence-connection-draw',
  ref: 'SPX-TODO',
  title: 'Evidence Connection Draw',
  blurb:
    'Selecting two clues draws a physical yellow connection line and establishes a linked relationship state.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired investigation / evidence language',
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
  tags: ['evidence', 'connection', 'investigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, connection line appears immediately without dash draw.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'Evidence connection',
  },
}
