import type { Specimen } from '../types'
export const crossOutReplacement: Specimen = {
  id: 'cross-out-replacement',
  ref: 'SPX-055',
  title: 'Cross-Out Replacement',
  blurb:
    'Old value is struck through by irregular red then black graphic strokes; the replacement attacks into place with a single overshoot — demo £49 → £29.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 editorial / graffiti value-change language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['slam', 'clip-path', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Strikes, impact, and replacement choreography are skipped under prefers-reduced-motion or data-force-reduced-motion; the final £29 value appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260,
    background: 'dark',

    label: 'Plan price change',
  },

}
