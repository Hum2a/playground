import type { Specimen } from '../../../types'
export const tacticalAlertPing: Specimen = {
  id: 'tactical-alert-ping',
  ref: 'SPX-011',
  title: 'Tactical alert ping',
  blurb:
    'Instant detection ping: a large red ! and DETECTED snap above a target with two thin attention rings.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'metal-gear',
    works: ['mgs'],
  },
  tags: ['alert', 'detection', 'ping'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scale, rings, and host nudge are skipped under prefers-reduced-motion or data-force-reduced-motion; static ! DETECTED remains until reset.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260,
    background: 'card',

    label: 'Stealth status',
  },

}
