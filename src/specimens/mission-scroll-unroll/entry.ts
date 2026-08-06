import type { Specimen } from '../types'

export const missionScrollUnroll: Specimen = {
  id: 'mission-scroll-unroll',
  ref: 'SPX-2365',
  title: 'Mission Scroll Unroll',
  blurb: 'A rolled mission scroll expands to reveal briefing content.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['scroll'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Mission Scroll Unroll',
  },
}
