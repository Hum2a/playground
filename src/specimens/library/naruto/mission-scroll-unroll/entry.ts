import type { Specimen } from '../../../types'

export const missionScrollUnroll: Specimen = {
  id: 'mission-scroll-unroll',
  ref: 'SPX-2365',
  title: 'Mission Scroll Unroll',
  blurb:
    'A rolled parchment scroll unrolls between its caps, revealing a mission briefing panel line by line.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction mission-briefing language — scroll reveal',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['scroll', 'reveal', 'briefing'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the scroll appears fully unrolled with all briefing lines visible immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    label: 'Mission scroll unroll',
  },
}
