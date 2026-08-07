import type { Specimen } from '../../../types'

export const fourShapeOrbitLoader: Specimen = {
  id: 'four-shape-orbit-loader',
  ref: 'SPX-3317',
  title: 'Four-Shape Orbit Loader',
  blurb:
    'Four original primitives orbit a hub on a dashed rail, then lock onto a completion diamond at N/E/S/W.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'loop',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['loader', 'orbit', 'shapes'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Orbit and counter-spin removed; COMPLETE reveals the settled diamond instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 280,
    background: 'dark',
    label: 'Four-shape orbit loader',
  },
}
