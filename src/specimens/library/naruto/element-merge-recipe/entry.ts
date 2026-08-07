import type { Specimen } from '../../../types'

export const elementMergeRecipe: Specimen = {
  id: 'element-merge-recipe',
  ref: 'SPX-2476',
  title: 'Element Merge Recipe',
  blurb:
    'Two marked orbs travel 104px into a 30px seam (340ms), flash-merge (200ms), then a dual-tone result inherits both marks — elemental recipe commit, no copyrighted iconography.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — elemental-combination recipes',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['merge', 'combination', 'recipe', 'seam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the dual-tone result appears directly with no travel/merge choreography.',
  },
  acceptance: [
    'Orbs travel 104px into 30px seam in 340ms then merge flash 200ms',
    'Result token inherits triangle+dot marks before RESULT READY',
    'Reduced motion shows RESULT READY immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    label: 'Element merge recipe',
  },
}
