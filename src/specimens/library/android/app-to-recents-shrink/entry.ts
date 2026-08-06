import type { Specimen } from '../types'
export const appToRecentsShrink: Specimen = {
  id: 'app-to-recents-shrink',
  ref: 'SPX-1802',
  title: 'App-to-Recents Shrink',
  blurb:
    '390×700 GALLERY app shrinks to 300×520 centre task card over 380ms; adjacent MAIL/MAPS cards at ±250px.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired recents overview',
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
  tags: ['recents', 'task-card', 'gesture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, overview geometry switches instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 780,
    background: 'dark',

    label: 'App-to-recents shrink',
  },

}
