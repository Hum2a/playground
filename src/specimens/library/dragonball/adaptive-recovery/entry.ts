import type { Specimen } from '../types'
export const adaptiveRecovery: Specimen = {
  id: 'adaptive-recovery',
  ref: 'SPX-1211',
  title: 'Adaptive Recovery',
  blurb:
    'A failed worker reconstructs through a frozen health ladder, briefly matches its prior baseline, then adapts three metrics upward — previous baseline stays visible beside the new one.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Zenkai-style post-failure adaptation (abstract)',
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
  tags: ['recovery', 'adaptation', 'improvement'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Health ladder and adaptation motion are skipped; adapted metrics and ADAPTED status appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 480,
    background: 'dark',

    label: 'Adaptive recovery demo',
  },

}
