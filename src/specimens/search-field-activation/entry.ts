import type { Specimen } from '../types'
export const searchFieldActivation: Specimen = {
  id: 'search-field-activation',
  ref: 'SPX-1442',
  title: 'Search Field Activation',
  blurb:
    'Header LIBRARY with compact 38px search — title retracts 120ms, search expands to 276px over 260ms, placeholder after 55%, CANCEL restores.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired search field layout morph',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['search', 'focus', 'layout-morph'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, header layout swaps instantly with focus preserved.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 120,
    background: 'dark',

    label: 'Search field activation',
  },

}
