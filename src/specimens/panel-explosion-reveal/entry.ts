import type { Specimen } from '../types'
export const panelExplosionReveal: Specimen = {
  id: 'panel-explosion-reveal',
  ref: 'SPX-105',
  title: 'Panel explosion reveal',
  blurb:
    'A solid irregular black seal cracks into seven comic panels that accelerate away from an off-centre impact, exposing content already underneath.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired comic-panel fracture reveal',
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
  tags: ['reveal', 'impact', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Cover is removed immediately; host content appears at full scale with no crack, flight, or scale animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Panel explosion reveal',
  },

}
