import type { Specimen } from '../../../types'

export const libraryGridFocus: Specimen = {
  id: 'library-grid-focus',
  ref: 'SPX-3394',
  title: 'Library Grid Focus',
  blurb: 'Focus moves through a dense game grid with strong controller-readable emphasis.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["grid","focus","library"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Focus changes apply instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Library grid focus',
  },
}
