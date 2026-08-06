import type { Specimen } from '../types'
export const dramaticObjectionError: Specimen = {
  id: 'dramatic-objection-error',
  ref: 'SPX-004',
  title: 'Dramatic Objection Error',
  blurb:
    'A huge typographic HOLD IT! burst slams across a form when a major validation failure occurs, then collapses to an inline field error.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'ace-attorney',
  },
  tags: ['validation', 'typography', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scale and rotation slam are skipped under prefers-reduced-motion or data-force-reduced-motion; a static HOLD IT! + strip appear briefly, then the inline field error remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Access code form',
  },

}
