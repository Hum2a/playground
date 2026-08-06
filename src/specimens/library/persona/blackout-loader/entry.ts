import type { Specimen } from '../types'
export const blackoutLoader: Specimen = {
  id: 'blackout-loader',
  ref: 'SPX-126',
  title: 'Blackout Loader',
  blurb:
    'Four irregular black polygons consume an archive card, hold with a minimal LOADING mark, telegraph with a red slash, then split diagonally to reveal an updated specimen count.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 aggressive black graphic loading language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['loading', 'clip-path', 'wipe'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Consumption and reveal travel are skipped under prefers-reduced-motion or data-force-reduced-motion; a static blackout LOADING state holds, then the destination count appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',

    label: 'Archive index card',
  },

}
