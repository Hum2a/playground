import type { Specimen } from '../../../types'

export const radioTargetSelector: Specimen = {
  id: 'radio-target-selector',
  ref: 'SPX-148',
  title: 'Radio Target Selector',
  blurb:
    'Three native radios wear corner-bracket targets; the chosen option converges, stamps a diamond, and rings once.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial selection',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['form', 'selection', 'targeting'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selected target and diamond appear immediately with no converge or ring under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Radio target selector',
  },
}
