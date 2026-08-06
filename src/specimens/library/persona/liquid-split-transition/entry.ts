import type { Specimen } from '../types'
export const liquidSplitTransition: Specimen = {
  id: 'liquid-split-transition',
  ref: 'SPX-402',
  title: 'Liquid Split Transition',
  blurb:
    'A pale liquid seam forms across the host, then upper and lower surfaces pull apart to expose a destination that already waits behind the opening.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 water / depth transition language',
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
  tags: ['water', 'split'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Seam growth, opposing slab travel, and refraction are skipped under prefers-reduced-motion or data-force-reduced-motion; the destination appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Liquid split demo',
  },

}
