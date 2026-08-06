import type { Specimen } from '../types'
export const matchedCardExpansion: Specimen = {
  id: 'matched-card-expansion',
  ref: 'SPX-1303',
  title: 'Matched Card Expansion',
  blurb:
    'ORBIT card expands from exact 180×118 bounds into a 20px-inset detail surface over 460ms while the title persists 20px→34px and sibling cards recede.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired shared-element navigation continuity',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['expansion', 'shared-element', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, card and detail swap instantly with a short opacity/outline change — no large-scale movement.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 520,
    background: 'dark',

    label: 'Matched card expansion',
  },

}
