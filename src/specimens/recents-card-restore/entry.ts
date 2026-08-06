import type { Specimen } from '../types'
export const recentsCardRestore: Specimen = {
  id: 'recents-card-restore',
  ref: 'SPX-1805',
  title: 'Recents Card Restore',
  blurb:
    'Three 286×500 task cards — any selection expands to 390×700 over 380ms; neighbours fade away; OVERVIEW restores order.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired recents restore',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['recents', 'restore', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, geometry swaps immediately with short fade.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 760,
    background: 'dark',

    label: 'Recents card restore',
  },

}
