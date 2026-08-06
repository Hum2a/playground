import type { Specimen } from '../types'

export const staticPortalMaterialise: Specimen = {
  id: 'static-portal-materialise',
  ref: 'SPX-2937',
  title: 'Static Portal Materialise',
  blurb:
    'Analogue static condenses and resolves into a clean interactive portal panel.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 TV-world portal study',
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
  tags: ['static', 'portal', 'materialise', 'tv'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Static flicker and condense animations stop under reduced motion; panel appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Static portal',
  },
}
