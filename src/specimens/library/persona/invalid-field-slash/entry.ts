import type { Specimen } from '../../../types'

export const invalidFieldSlash: Specimen = {
  id: 'invalid-field-slash',
  ref: 'SPX-145',
  title: 'Invalid Field Slash',
  blurb:
    'A 350×8 red slash cuts once underneath a readable username field, then INVALID VALUE settles with aria-invalid.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form rejection',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['form', 'validation', 'slash'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slash and INVALID VALUE appear immediately with no recoil under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    label: 'Invalid field slash',
  },
}
