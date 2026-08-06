import type { Specimen } from '../../../types'
export const moonPhaseProgress: Specimen = {
  id: 'moon-phase-progress',
  ref: 'SPX-456',
  title: 'Moon Phase Progress',
  blurb:
    'Archive completion as a waxing moon: a dark shade slides off a pale disc so 0% reads new, 50% half, and 100% full — with restrained milestone ticks and a single completion halo.',
  origin: {
    project: 'Original',
    surface: 'Lunar progress visualisation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['progress', 'lunar', 'visualisation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shade snaps to the target phase under prefers-reduced-motion or data-force-reduced-motion; milestone ticks and the 100% halo are omitted.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Archive completion moon',
  },

}
