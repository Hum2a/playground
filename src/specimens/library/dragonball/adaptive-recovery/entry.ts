import type { Specimen } from '../../../types'
export const adaptiveRecovery: Specimen = {
  id: 'adaptive-recovery',
  ref: 'SPX-1211',
  title: 'Adaptive Recovery',
  blurb:
    'A failed worker’s truss frame shows structural damage, rebuilds through a health ladder, retains a scar remnant, then gains three reinforcement struts and upgraded metrics.',
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
      'Health ladder and adaptation motion are skipped; reinforced truss with scar and ADAPTED metrics appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 500,
    background: 'dark',
    label: 'Structural scar rebuild',
  },
}
