import type { Specimen } from '../types'
export const contextMenuBloom: Specimen = {
  id: 'context-menu-bloom',
  ref: 'SPX-1392',
  title: 'Context Menu Bloom',
  blurb:
    'FILE // NOTES.MD blooms a four-action menu from its trailing anchor — 6px node, 188×176 boundary, 35ms row stagger — collapsing back on dismiss.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired contextual menu anchor expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['context-menu', 'anchor', 'expansion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, menu appears/disappears immediately at the anchored position.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',

    label: 'Context menu bloom',
  },

}
