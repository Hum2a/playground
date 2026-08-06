import type { Specimen } from '../types'
export const captureBreakout: Specimen = {
  id: 'capture-breakout',
  ref: 'SPX-713',
  title: 'Capture Breakout',
  blurb:
    'A capture begins like Capture Shake — two checks land — then the third is interrupted, the capsule splits, and the entity escapes to ESCAPED.',
  origin: {
    project: 'Original',
    surface: 'Pokémon capture-fail / breakout language (generic geometry)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['failure', 'uncertainty', 'capture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Enter, shakes, compress, and breakout travel are skipped under prefers-reduced-motion or data-force-reduced-motion; open container, visible target, and ESCAPED appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Capture breakout demo',
  },

}
