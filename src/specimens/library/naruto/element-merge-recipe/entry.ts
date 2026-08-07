import type { Specimen } from '../../../types'

export const elementMergeRecipe: Specimen = {
  id: 'element-merge-recipe',
  ref: 'SPX-2476',
  title: 'Element Merge Recipe',
  blurb:
    'Two element orbs travel from opposite sides into a central slot, merge in a flash, and produce a dual-tone result token — abstract graphic combination, no copyrighted iconography.',
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
  tags: ['merge', 'combination', 'recipe'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the result token appears directly with no travel/merge choreography.',
  },
  acceptance: [
    'Dual inputs meet at frozen seam then result token appears',
    'Result inherits marks from both inputs',
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
