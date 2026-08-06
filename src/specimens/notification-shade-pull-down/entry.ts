import type { Specimen } from '../types'
export const notificationShadePullDown: Specimen = {
  id: 'notification-shade-pull-down',
  ref: 'SPX-1637',
  title: 'Notification Shade Pull-Down',
  blurb:
    'Top 32px drag reveals shade tracking pointer to 620px max with resistance; detents at 0, 260, and 620px.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired notification shade',
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
  tags: ['notification-shade', 'gesture', 'system-surface'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, drag and detents preserved; settling snaps instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 760,
    background: 'dark',

    label: 'Notification shade pull-down',
  },

}
