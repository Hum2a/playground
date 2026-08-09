import type { Specimen } from '../../../types'

export const waterDisturbanceHover: Specimen = {
  id: 'water-disturbance-hover',
  ref: 'SPX-416',
  title: 'Water Disturbance Hover',
  blurb:
    'Pointer or focus disturbs a calm dark-blue water plate: a local highlight, tiny line nudges, and three rings that restart only after meaningful travel.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired liquid hover surface',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['water', 'hover', 'ripple'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'No expanding rings or line displacement; a static cyan circle tracks the pointer or focus point under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 500,
    height: 360,
    background: 'dark',
    label: 'Water disturbance hover',
  },
}
