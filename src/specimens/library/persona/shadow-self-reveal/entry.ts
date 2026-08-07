import type { Specimen } from '../../../types'
export const shadowSelfReveal: Specimen = {
  id: 'shadow-self-reveal',
  ref: 'SPX-2962',
  title: 'Shadow Self Reveal',
  blurb:
    'A polished public profile fractures to expose a darker underlying DENIED SIGNAL shadow state.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired shadow / identity confrontation language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['shadow', 'fracture', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, shadow layer shown immediately without fracture animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'Shadow self reveal',
  },
}
