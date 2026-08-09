import type { Specimen } from '../../../types'
export const overlappingNewspaperTabs: Specimen = {
  id: 'overlapping-newspaper-tabs',
  ref: 'SPX-232',
  title: 'Overlapping newspaper tabs',
  blurb:
    'Torn-edge clipping tabs overlap at fixed rotations; the selected tab climbs above the stack and straightens while others stay tilted underneath.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['tabs', 'newspaper', 'clip-path', 'selection'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Tab lift/scale/rotate and panel translateY apply instantly under prefers-reduced-motion or data-force-reduced-motion; box-shadow, opacity, and panel cross-fade still transition softly, and the tablist remains fully keyboard-operable.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 220,
    background: 'card',
    label: 'Section switcher',
  },
}
