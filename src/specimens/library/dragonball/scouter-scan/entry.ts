import type { Specimen } from '../types'
export const scouterScan: Specimen = {
  id: 'scouter-scan',
  ref: 'SPX-996',
  title: 'Scouter Scan',
  blurb:
    'Four angular brackets acquire an abstract node, one scan sweep structures it, and deterministic metrics settle on OUTPUT 8,471 / 24ms / 82% / EXTREME.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired diagnostic / targeting language',
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
  tags: ['scan', 'analysis', 'target-lock', 'diagnostic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Bracket search, sweep, metric cycling, and pulse are skipped under prefers-reduced-motion or data-force-reduced-motion; the completed EXTREME report appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',

    label: 'Diagnostic scouter scan',
  },

}
