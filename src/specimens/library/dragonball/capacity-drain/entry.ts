import type { Specimen } from '../../../types'
export const capacityDrain: Specimen = {
  id: 'capacity-drain',
  ref: 'SPX-1210',
  title: 'Capacity Drain',
  blurb:
    'Process B locks an extraction beam on Service A: donor vessel depletes and dims while six capacity packets travel into the sink until SAFE MIN 30 stops the drain.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, immediately shows final 30/70 vessel levels with DRAIN STOPPED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 380,
    background: 'dark',
    label: 'Capacity drain vessel + beam',
  },
}
