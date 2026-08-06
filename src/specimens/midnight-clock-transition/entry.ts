import type { Specimen } from '../types'
export const midnightClockTransition: Specimen = {
  id: 'midnight-clock-transition',
  ref: 'SPX-531',
  title: 'Midnight Clock Transition',
  blurb:
    'An abstract clock accelerates from 23:54 to midnight; hands align at 12, a pale seam splits the host, and panels wipe into 07 APR / MIDNIGHT.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Dark Hour–inspired temporal threshold',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['time', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Hand travel, seam, and panel wipe are skipped under prefers-reduced-motion or data-force-reduced-motion; the midnight state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Midnight threshold demo',
  },

}
