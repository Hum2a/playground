import type { Specimen } from '../../../types'

export const yellowImpactWipe: Specimen = {
  id: 'yellow-impact-wipe',
  ref: 'SPX-3030',
  title: 'Yellow Impact Wipe',
  blurb:
    'A saturated yellow plane cuts across the preview to exchange scene states.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 yellow/black graphic language study',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['yellow', 'wipe', 'impact', 'slash'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Wipe animations stop under reduced motion; scene B appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Yellow impact wipe',
  },
}
