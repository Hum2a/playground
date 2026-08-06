import type { Specimen } from '../../../types'
export const listToIconViewMorph: Specimen = {
  id: 'list-to-icon-view-morph',
  ref: 'SPX-1463',
  title: 'List-to-Icon View Morph',
  blurb:
    'Six files morph from 44px list rows to 3×2 grid cells at 116×104 over 420ms; filenames persist; metadata collapses in first 35%.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired collection view morph',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['layout', 'identity-preservation', 'grid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate re-layout.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 340,
    background: 'dark',

    label: 'List to icon view morph',
  },

}
