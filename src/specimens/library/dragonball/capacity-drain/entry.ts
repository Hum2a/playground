import type { Specimen } from '../types'
export const capacityDrain: Specimen = {
  id: 'capacity-drain',
  ref: 'SPX-1210',
  title: 'Capacity Drain',
  blurb:
    'Process B initiates a drain against Service A: six 10-capacity packets move A→B until A hits SAFE MIN 30 (B reaches 70), then the line breaks into five segments retracting to B.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired hostile capacity extraction (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['resource-drain', 'dependency', 'extraction'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediately shows final 30/70 distribution with DRAIN STOPPED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 360,
    background: 'dark',

    label: 'Capacity drain A→B to safe min',
  },

}
