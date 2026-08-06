import type { Specimen } from '../../../types'
export const clockHandWipe: Specimen = {
  id: 'clock-hand-wipe',
  ref: 'SPX-027',
  title: 'Clock-Hand Wipe',
  blurb:
    'A long clock hand sweeps clockwise from 12; a dark-blue destination sector opens behind it via conic mask until full coverage, then hands contract into the hub.',
  origin: {
    project: 'Original',
    surface: 'Temporal radial wipe / clock-hand transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['radial', 'time'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Sweep and hand contract skip under prefers-reduced-motion or data-force-reduced-motion; destination appears immediately at full coverage.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 400,
    background: 'dark',

    label: 'Clock-hand radial wipe demo',
  },

}
