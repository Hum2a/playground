import type { Specimen } from '../types'
export const gridReorderGap: Specimen = {
  id: 'grid-reorder-gap',
  ref: 'SPX-1902',
  title: 'Grid Reorder Gap',
  blurb:
    '4×3 grid of 64px tiles: long-press 240ms or 6px drag lifts 1.06 proxy; one visible gap travels; tiles animate 160ms; Escape cancels.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired grid reorder gap',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['drag', 'grid', 'reorder'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, tiles jump between slots; drag proxy still follows pointer.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'card',

    label: 'Grid reorder gap',
  },

}
