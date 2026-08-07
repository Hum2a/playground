import type { Specimen } from '../../../types'

export const adaptiveTriggerMeter: Specimen = {
  id: 'adaptive-trigger-meter',
  ref: 'SPX-3364',
  title: 'Adaptive Trigger Meter',
  blurb:
    'DualSense L2 silhouette: hold fills soft → firm → lock zones over 1000ms; resistance stiffens near threshold.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['dualsense', 'trigger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Holds still require the full 1000ms threshold; fill/zone/shell transitions snap under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    label: 'Adaptive Trigger Meter demo',
  },
}
