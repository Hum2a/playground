import type { Specimen } from '../../../types'
export const swipeFullCommit: Specimen = {
  id: 'swipe-full-commit',
  ref: 'SPX-1508',
  title: 'Swipe Full Commit',
  blurb:
    'CACHE // BUILD-04 swipes left: DELETE readable at 72px, full commit at 190px with one marker, auto-delete collapses 64→0 over 220ms; UNDO restores.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired destructive swipe threshold',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['swipe', 'destructive', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, preserve thresholds but commit may collapse immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 200,
    background: 'dark',

    label: 'Swipe full commit',
  },

}
