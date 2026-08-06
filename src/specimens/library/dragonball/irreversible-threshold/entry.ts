import type { Specimen } from '../../../types'
export const irreversibleThreshold: Specimen = {
  id: 'irreversible-threshold',
  ref: 'SPX-1124',
  title: 'Irreversible Threshold',
  blurb:
    'PURGE // CACHE-04 climbs a fixed rail to a 65% COMMIT marker: CANCEL works through 64%, four brackets retract on crossing, then accelerated progress to PURGED.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired irreversible destruction threshold (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['threshold', 'progress', 'warning'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Cancel remains available before commit under prefers-reduced-motion or data-force-reduced-motion; post-commit progress may snap to PURGED without animated fill.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',

    label: 'Irreversible purge threshold',
  },


}
