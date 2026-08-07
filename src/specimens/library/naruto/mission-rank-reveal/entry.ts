import type { Specimen } from '../../../types'

export const missionRankReveal: Specimen = {
  id: 'mission-rank-reveal',
  ref: 'SPX-2534',
  title: 'Mission Rank Reveal',
  blurb:
    'Rank B glyph slams 56px into the briefing, then a wax stamp settles at -12° to confirm.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mission system — briefing rank reveal',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["rank","stamp","briefing"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the rank card and stamp appear already settled at RANK CONFIRMED.',
  },
  acceptance: [
    'Card travels 56px from -8°; stamp settles at -12° after stampMs 240',
    'RANK CONFIRMED only after settleMs 100',
    'Reduced motion shows settled card + stamp immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission rank reveal',
  },
}
