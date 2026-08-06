import type { Specimen } from '../types'

export const dwellToSelectRing: Specimen = {
  id: 'dwell-to-select-ring',
  ref: 'SPX-3463',
  title: 'Dwell-to-Select Ring',
  blurb: 'A radial timer fills around a target before activation completes.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["dwell","ring","select"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Dwell completes instantly on pointer down.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 300,
    background: 'dark',
    label: 'Dwell-to-select ring',
  },
}
