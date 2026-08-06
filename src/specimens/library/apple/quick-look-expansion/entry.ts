import type { Specimen } from '../types'
export const quickLookExpansion: Specimen = {
  id: 'quick-look-expansion',
  ref: 'SPX-1459',
  title: 'Quick Look Expansion',
  blurb:
    'DESIGN.PDF expands from its file row into a 420×330 preview over 380ms; list stays visible at scale 0.985; three content blocks stagger 45ms.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired quick preview expansion',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['preview', 'expansion', 'context'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, show/hide preview directly while preserving selected row.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 400,
    background: 'dark',

    label: 'Quick look expansion',
  },

}
