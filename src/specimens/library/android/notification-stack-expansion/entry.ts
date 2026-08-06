import type { Specimen } from '../types'
export const notificationStackExpansion: Specimen = {
  id: 'notification-stack-expansion',
  ref: 'SPX-1640',
  title: 'Notification Stack Expansion',
  blurb:
    'Four 336×74 cards in 150px layered stack — offset 8px, scale 0.98 — expand to 10px gaps over 320ms; rear cards travel farther.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired notification stack expansion',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['notifications', 'stack', 'expand'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, cards jump between stacked and separated positions.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 400,
    background: 'dark',

    label: 'Notification stack expansion',
  },

}
