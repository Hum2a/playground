import type { Specimen } from '../types'
export const notificationBannerDrop: Specimen = {
  id: 'notification-banner-drop',
  ref: 'SPX-1409',
  title: 'Notification Banner Drop',
  blurb:
    'DEPLOY COMPLETE banner drops from -96px with 6px overshoot, dwells 2200ms, exits upward; hover/focus pauses retreat.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired temporary notification banner',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['notification', 'banner', 'alert'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, banner appears at final position, dwells, then disappears without travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 280,
    background: 'dark',

    label: 'Notification banner drop',
  },

}
