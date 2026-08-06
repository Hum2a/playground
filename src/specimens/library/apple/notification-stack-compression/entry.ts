import type { Specimen } from '../../../types'
export const notificationStackCompression: Specimen = {
  id: 'notification-stack-compression',
  ref: 'SPX-1412',
  title: 'Notification Stack Compression',
  blurb:
    'Three 320×74 notifications compress into a layered stack over 320ms — offsets 6/12px, scales .98/.96 — with a 3 NOTIFICATIONS counter.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired notification stack aggregation',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['notification', 'stack', 'compression'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, expanded and compressed layouts switch instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Notification stack compression',
  },

}
