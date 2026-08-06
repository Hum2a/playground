import type { Specimen } from '../../../types'
export const waterlinePageWipe: Specimen = {
  id: 'waterline-page-wipe',
  ref: 'SPX-400',
  title: 'Waterline Page Wipe',
  blurb:
    'A stylised blue water mass with a lobed waterline rises from below, fully covers for a hard A↔B swap, then continues upward to reveal the destination — graphic CSS water, not fluid sim.',
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
  tags: ['wipe', 'water', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Water travel, lobe drift, and refraction tracking are skipped under prefers-reduced-motion or data-force-reduced-motion; surfaces switch immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Waterline page transition',
  },

}
