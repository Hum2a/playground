import type { Specimen } from '../../../types'

export const fogOfWarCard: Specimen = {
  id: 'fog-of-war-card',
  ref: 'SPX-2940',
  title: 'Fog-of-War Card',
  blurb:
    'Unknown regions of a card are revealed by pointer scrubbing across a fog overlay.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 fog and hidden-information study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['fog', 'reveal', 'scrub', 'hidden-info'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Fog fade transition stops under reduced motion; first scrub reveals all content.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Fog-of-war card',
  },
}
