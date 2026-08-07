import type { Specimen } from '../../../types'

export const missionRankReveal: Specimen = {
  id: 'mission-rank-reveal',
  ref: 'SPX-2534',
  title: 'Mission Rank Reveal',
  blurb:
    'A generic D-through-S tier card slams into the briefing panel and a rubber stamp impacts down to confirm the assigned rank.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mission system — briefing rank reveal overlays',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['rank'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the rank card and stamp appear already settled with CONFIRMED shown.',
  },
  acceptance: [
    'Rank glyph + stamp settle with frozen overshoot angle',
    'Final CONFIRMED static',
    'Reduced motion shows settled rank immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission rank reveal',
  },
}
