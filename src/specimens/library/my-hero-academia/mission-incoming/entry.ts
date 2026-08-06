import type { Specimen } from '../../../types'
export const missionIncoming: Specimen = {
  id: 'mission-incoming',
  ref: 'SPX-2102',
  title: 'Mission Incoming',
  blurb:
    'A mission dispatch card slams in from the right with speed lines and an ALERT badge over 420ms.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['mission', 'dispatch', 'card-entry', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the mission card appears settled immediately with no slide or speed lines.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Mission dispatch',
  },

}
