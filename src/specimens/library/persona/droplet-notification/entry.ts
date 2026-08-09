import type { Specimen } from '../../../types'

export const dropletNotification: Specimen = {
  id: 'droplet-notification',
  ref: 'SPX-415',
  title: 'Droplet Notification',
  blurb:
    'A geometric cyan droplet appears, falls onto a dark inbox plate, and two thin rings mark impact as the muted badge locks to NEW.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired liquid notification indicator',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['droplet', 'notification', 'ripple'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Active badge, NEW label, and static cyan ring appear immediately; no fall or expanding ripple under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Droplet notification',
  },
}
