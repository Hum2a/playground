import type { Specimen } from '../types'
export const contradictionFound: Specimen = {
  id: 'contradiction-found',
  ref: 'SPX-TODO',
  title: 'Contradiction Found',
  blurb:
    'Two evidence cards collide and highlight the exact timestamp values that conflict.',
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
  tags: ['contradiction', 'evidence', 'collision'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, cards sit collided with highlights and banner visible immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'Contradiction found',
  },
}
