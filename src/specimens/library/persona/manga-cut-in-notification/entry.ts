import type { Specimen } from '../../../types'
export const mangaCutInNotification: Specimen = {
  id: 'manga-cut-in-notification',
  ref: 'SPX-104',
  title: 'Manga Cut-In Notification',
  blurb:
    'A narrow diagonal slit attacks across the host, expands into a black/red comic strip with BUILD COMPLETE!, holds still, then collapses without reversing perfectly.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired manga cut-in interruption',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['notification', 'interruption', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slit expansion, text travel, and host split are skipped under prefers-reduced-motion or data-force-reduced-motion; the static strip appears and clears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Cut-in notification demo',
  },

}
