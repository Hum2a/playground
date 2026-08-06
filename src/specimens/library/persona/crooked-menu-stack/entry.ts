import type { Specimen } from '../../../types'
export const crookedMenuStack: Specimen = {
  id: 'crooked-menu-stack',
  ref: 'SPX-056',
  title: 'Crooked Menu Stack',
  blurb:
    'Unstable overlapping menu where selection expands the active item and physically recomposes neighbouring items around it.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['selection', 'navigation', 'menu', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selection states switch immediately under prefers-reduced-motion or data-force-reduced-motion; final irregular layout and active geometry remain with no translation/scale choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 400,
    background: 'dark',

    label: 'Site menu',
  },

}
