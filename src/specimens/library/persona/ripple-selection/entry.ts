import type { Specimen } from '../../../types'

export const rippleSelection: Specimen = {
  id: 'ripple-selection',
  ref: 'SPX-411',
  title: 'Ripple Selection',
  blurb:
    'Selecting a row sends three thin cyan geometric rings across a dark blue liquid plate; the choice locks with a brighter border and angular marker.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired liquid selection feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['ripple', 'selection', 'liquid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selection applies immediately with a static cyan geometric ring; no expanding ripple under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 400,
    background: 'dark',
    label: 'Ripple selection',
  },
}
