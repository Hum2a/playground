import type { Specimen } from '../../../types'
export const homeSwipeUp: Specimen = {
  id: 'home-swipe-up',
  ref: 'SPX-1611',
  title: 'Home Swipe Up',
  blurb:
    '390×700 app shrinks over launcher as bottom 28px upward drag maps scale 1→0.72; commit at 150px or 0.6 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired home gesture',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['gesture', 'home', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, drag tracking remains; release snaps immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 760,
    background: 'dark',

    label: 'Home swipe up',
  },

}
