import type { Specimen } from '../types'

export const backNavigationRestore: Specimen = {
  id: 'back-navigation-restore',
  ref: 'SPX-3377',
  title: 'Back Navigation Restore',
  blurb: 'Returning from a details view restores the exact previous focus target in the list.',
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
  tags: ["navigation","focus","restore"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Focus restore is instant with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    label: 'Back navigation restore',
  },
}
