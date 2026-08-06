import type { Specimen } from '../types'
export const notificationSwipeDismiss: Specimen = {
  id: 'notification-swipe-dismiss',
  ref: 'SPX-1658',
  title: 'Notification Swipe Dismiss',
  blurb:
    'Top 336×76 notification drags horizontally; opacity fades after 35%; commit at 45% or 0.65 px/ms; exit then 180ms height collapse.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired notification swipe dismiss',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['notification', 'swipe', 'dismiss'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, card follows drag then disappears/collapses immediately on commit.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 400,
    background: 'dark',

    label: 'Notification swipe dismiss',
  },

}
