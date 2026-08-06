import type { Specimen } from '../types'

export const shapeScatterTransition: Specimen = {
  id: 'shape-scatter-transition',
  ref: 'SPX-3319',
  title: 'Shape Scatter Transition',
  blurb: 'Geometric tokens scatter from a source control and reform around destination content.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ['scatter', 'shapes', 'tokens'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Destination highlight appears instantly; no scatter travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    label: 'Shape scatter transition',
  },
}
