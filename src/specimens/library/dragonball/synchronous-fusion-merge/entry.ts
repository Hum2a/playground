import type { Specimen } from '../../../types'
export const synchronousFusionMerge: Specimen = {
  id: 'synchronous-fusion-merge',
  ref: 'SPX-1021',
  title: 'Synchronous Fusion Merge',
  blurb:
    'Two distinct sources synchronise with mirrored motion, converge through an 80ms hold, compress past six radial lines, and resolve as hybrid MODEL C with A/B provenance — no characters, no aura.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired fusion synchronisation / merge language',
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
  tags: ['merge', 'synchronisation', 'identity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, MODEL C with A/B provenance appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',

    label: 'Synchronous fusion merge',
  },

}
