import type { Specimen } from '../types'
export const personaFusionCombine: Specimen = {
  id: 'persona-fusion-combine',
  ref: 'SPX-2987',
  title: 'Persona Fusion Combine',
  blurb:
    'Two input persona cards travel into a central synthesis field and become one derived SYNTH result.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired persona fusion / compendium language',
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
  tags: ['fusion', 'combine', 'synthesis'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, SYNTH result appears immediately without travel or burst.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'Persona fusion',
  },
}
