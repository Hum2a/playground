import type { Specimen } from '../../../types'
export const notificationExpand: Specimen = {
  id: 'notification-expand',
  ref: 'SPX-1410',
  title: 'Notification Detail Expansion',
  blurb:
    'Compact 330×76 notification expands to 330×184 over 280ms — title persists, detail rows after 120px, OPEN/APPROVE buttons at 40ms stagger.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired notification compact-to-rich expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['notification', 'expansion', 'compact-to-rich'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, compact and expanded states switch instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',

    label: 'Notification detail expansion',
  },

}
