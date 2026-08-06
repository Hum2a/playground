import type { Specimen } from '../types'

export const adaptiveTriggerMeter: Specimen = {
  id: 'adaptive-trigger-meter',
  ref: 'SPX-3364',
  title: 'Adaptive Trigger Meter',
  blurb: 'A trigger hold meter visually stiffens as it nears threshold — fill slows and resistance bands intensify.',
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
  },
  tags: ["dualsense","trigger"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Manual holds still require full duration; resistance animation is static under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    label: 'Adaptive Trigger Meter demo',
  },
}
