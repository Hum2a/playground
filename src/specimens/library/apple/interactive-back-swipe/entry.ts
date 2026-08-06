import type { Specimen } from '../../../types'
export const interactiveBackSwipe: Specimen = {
  id: 'interactive-back-swipe',
  ref: 'SPX-1302',
  title: 'Interactive Back Swipe',
  blurb:
    'Edge-initiated back gesture: ORBIT detail follows drag 1:1 while PROJECTS reveals from -28% scale .98; commit at 42% width or >0.62 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired spatial back navigation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['navigation', 'gesture', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Gesture thresholds preserved; parallax scale removed; immediate switch on committed release.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 560,
    background: 'dark',

    label: 'Interactive back swipe',
  },

}
