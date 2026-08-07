import type { Specimen } from '../../../types'

export const elementMergeRecipe: Specimen = {
  id: 'element-merge-recipe',
  ref: 'SPX-2476',
  title: 'Element Merge Recipe',
  blurb:
    'Two orbs travel 104px into a 3×44px seam flash (340ms → 200ms), then a dual-tone result token appears — abstract combination recipe.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the result token appears directly with no travel/seam choreography.',
  },
  acceptance: [
    'Dual inputs meet at 3×44px seam flash then result appears',
    'Result is dual-tone chakra|danger halves',
    'Reduced motion shows result token directly',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    label: 'Element merge recipe',
  },
}
