import type { Specimen } from '../../../types'
export const powerLevelReadout: Specimen = {
  id: 'power-level-readout',
  ref: 'SPX-997',
  title: 'Power Level Readout',
  blurb:
    'A monospace measurement display walks a frozen sample ladder that accelerates then converges on 8,471 — thresholds lock scale markers before ABOVE BASELINE classification.',
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
      'Sample ladder and threshold motion are skipped; 8,471 with ABOVE BASELINE appears immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 400,
    background: 'dark',

    label: 'Power level readout demo',
  },

}
