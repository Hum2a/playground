import type { Specimen } from '../types'

export const hazardStripeReveal: Specimen = {
  id: 'hazard-stripe-reveal',
  ref: 'SPX-3029',
  title: 'Hazard Stripe Reveal',
  blurb:
    'Diagonal warning stripes sweep away to expose newly available content.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 yellow/black graphic language study',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['hazard', 'stripes', 'reveal', 'keep-out'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Stripe sweep animation stops under reduced motion; content appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Hazard stripe reveal',
  },
}
