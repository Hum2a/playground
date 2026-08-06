import type { Specimen } from '../types'
export const spotlightMaterialise: Specimen = {
  id: 'spotlight-materialise',
  ref: 'SPX-1444',
  title: 'Spotlight Materialise',
  blurb:
    'A 44×44 search seed expands to a 520×286 command panel — bar in 180ms, results in 160ms with 30ms stagger — while background panels recede.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired command search overlay focus',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['search', 'focus', 'materialise', 'command-palette'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, final panel opens immediately; focus semantics preserved.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 400,
    background: 'dark',

    label: 'Spotlight materialise',
  },

}
