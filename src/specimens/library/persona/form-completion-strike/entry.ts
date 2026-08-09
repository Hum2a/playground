import type { Specimen } from '../../../types'

export const formCompletionStrike: Specimen = {
  id: 'form-completion-strike',
  ref: 'SPX-154',
  title: 'Form Completion Strike',
  blurb:
    'Completing a valid contact form brightens the card once, then a cyan slash and COMPLETE badge settle with four radial accents.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form confirmation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['form', 'completion', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'COMPLETE badge and final slash appear immediately with no draw or movement under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 380,
    background: 'dark',
    label: 'Form completion strike',
  },
}
