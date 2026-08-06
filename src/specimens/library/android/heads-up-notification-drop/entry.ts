import type { Specimen } from '../types'
export const headsUpNotificationDrop: Specimen = {
  id: 'heads-up-notification-drop',
  ref: 'SPX-1656',
  title: 'Heads-Up Notification Drop',
  blurb:
    '350×88px overlay alert drops from -110px, dwells 3200ms; click expands to 156px; swipe up >55px dismisses early.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired heads-up notification',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['notification', 'heads-up'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, alert appears/disappears without travel; dwell timing retained.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 760,
    background: 'dark',

    label: 'Heads-up notification drop',
  },

}
