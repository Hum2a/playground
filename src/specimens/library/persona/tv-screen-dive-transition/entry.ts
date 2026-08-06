import type { Specimen } from '../../../types'
export const tvScreenDiveTransition: Specimen = {
  id: 'tv-screen-dive-transition',
  ref: 'SPX-TODO',
  title: 'TV Screen Dive Transition',
  blurb:
    'Current UI bends inward toward a screen aperture and a TV-world destination emerges from the other side.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired TV world / screen portal language',
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
  tags: ['tv', 'portal', 'dive'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, destination layer appears immediately without dive or scale.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'TV screen dive',
  },
}
