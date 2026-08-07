import type { Specimen } from '../../../types'
export const powerLevelReadout: Specimen = {
  id: 'power-level-readout',
  ref: 'SPX-997',
  title: 'Power Level Readout',
  blurb:
    'Fluorescent scouter-style instrument: brackets, ticks, and a frozen sample ladder accelerate then converge on 8,471 before ABOVE BASELINE classification.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball scouter-style power-level reading (abstract instrument)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['measurement', 'analysis', 'numeric-resolution'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Sample ladder and threshold motion are skipped; 8,471 with instrument chrome and ABOVE BASELINE appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 420,
    background: 'dark',
    label: 'Fluorescent power readout',
  },
}
