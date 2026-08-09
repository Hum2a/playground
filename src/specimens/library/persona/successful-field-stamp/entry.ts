import type { Specimen } from '../../../types'

export const successfulFieldStamp: Specimen = {
  id: 'successful-field-stamp',
  ref: 'SPX-146',
  title: 'Successful Field Stamp',
  blurb:
    'An OK stamp slams beside a valid email field — overshoot, settle, success border — without a bounce loop.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form success',
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
  tags: ['form', 'validation', 'stamp'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Stamp and success border appear immediately with no rotation or scale travel under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 240,
    background: 'dark',
    label: 'Successful field stamp',
  },
}
