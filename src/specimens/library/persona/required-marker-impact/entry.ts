import type { Specimen } from '../../../types'

export const requiredMarkerImpact: Specimen = {
  id: 'required-marker-impact',
  ref: 'SPX-155',
  title: 'Required Marker Impact',
  blurb:
    'A compact required marker slams in beside an EMAIL label without moving the label, then settles with a short backing shift.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form required state',
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
  tags: ['form', 'impact', 'slam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Required marker appears instantly at rest scale with no translation under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 240,
    background: 'dark',
    label: 'Required marker impact',
  },
}
