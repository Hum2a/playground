import type { Specimen } from '../types'
export const crystallisedSelection: Specimen = {
  id: 'crystallised-selection',
  ref: 'SPX-429',
  title: 'Crystallised selection',
  blurb:
    'Choosing an item assembles five translucent blue glass regions around it, crystallising the selection into a locked composition.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired glass crystallisation selection',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['selection', 'glass', 'crystallise'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Final five-region locked composition appears immediately; no assemble stagger or sweep.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Glass selection',
  },

}
