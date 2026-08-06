import type { Specimen } from '../types'
export const enemyScanReveal: Specimen = {
  id: 'enemy-scan-reveal',
  ref: 'SPX-482',
  title: 'Enemy Scan Reveal',
  blurb:
    'ENTITY // 07 starts with four ??? fields; a pale-blue vertical scanner travels left to right and replaces each unknown at frozen x-thresholds while an angular outline completes — analysis, not a spinner.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 SEES / tactical analysis language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['analysis', 'scan', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all fields and the complete outline appear immediately with ANALYSIS COMPLETE — no beam travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',

    label: 'Entity analysis scan (demo)',
  },

}
