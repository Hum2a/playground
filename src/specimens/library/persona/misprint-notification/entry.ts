import type { Specimen } from '../../../types'
export const misprintNotification: Specimen = {
  id: 'misprint-notification',
  ref: 'SPX-016',
  title: 'Misprint Notification',
  blurb:
    'Misregistered black/red/cyan/paper print layers snap into alignment as a NEW MESSAGE notification, then stay still until a separating dismiss.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired rough print registration language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['notification', 'misprint', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Layer convergence and separation are skipped under prefers-reduced-motion or data-force-reduced-motion; the final registered notification appears or clears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Misprint notification demo',
  },

}
