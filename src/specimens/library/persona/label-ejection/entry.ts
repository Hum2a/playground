import type { Specimen } from '../../../types'

export const labelEjection: Specimen = {
  id: 'label-ejection',
  ref: 'SPX-150',
  title: 'Label Ejection',
  blurb:
    'A real EMAIL label sits inside the field, then shoots upward in two hard stages instead of floating on a curve.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form focus language',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['focus', 'keyboard'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Label jumps to the ejected or rest pose with no travel under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 240,
    background: 'dark',
    label: 'Email field label ejection',
  },
}
