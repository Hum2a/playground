import type { Specimen } from '../types'

export const barrierBreachAlert: Specimen = {
  id: 'barrier-breach-alert',
  ref: 'SPX-2525',
  title: 'Barrier Breach Alert',
  blurb: 'A perimeter fractures at a breach point with an alert.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['alert'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Barrier Breach Alert',
  },
}
