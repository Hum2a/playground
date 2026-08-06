import type { Specimen } from '../../../types'

export const fourShapeOrbitLoader: Specimen = {
  id: 'four-shape-orbit-loader',
  ref: 'SPX-3317',
  title: 'Four-Shape Orbit Loader',
  blurb: 'Four original geometric symbols orbit a center point and settle into a completion lock.',
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
  },
  tags: ["loader","orbit","shapes"],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote: 'Orbit animation removed; COMPLETE shows the settled frame instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 280,
    background: 'dark',
    label: 'Four-shape orbit loader',
  },
}
