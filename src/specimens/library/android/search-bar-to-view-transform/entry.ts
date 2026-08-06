import type { Specimen } from '../types'
export const searchBarToViewTransform: Specimen = {
  id: 'search-bar-to-view-transform',
  ref: 'SPX-1736',
  title: 'Search Bar-to-View Transform',
  blurb:
    '320×56 search bar in 360×560 catalogue expands to 344×500 view; radius 28→24px; icon shifts 8px; results after 140ms; Back restores scroll.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired search container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['search', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate container geometry switch.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 600,
    background: 'card',

    label: 'Search bar-to-view transform',
  },

}
