import type { Specimen } from '../../../types'

export const missionRankReveal: Specimen = {
  id: 'mission-rank-reveal',
  ref: 'SPX-2534',
  title: 'Mission Rank Reveal',
  blurb:
    'A Rank B card lands in the briefing, then a wax stamp impacts at −22° and settles to −12° CONFIRMED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, Rank B and the −12° CONFIRMED stamp appear already settled.',
  },
    acceptance: [
    'Rank B card lands over 280ms before the wax stamp appears',
    'Stamp impacts at −22° overshoot then settles to −12° over 120ms',
    'Resolved shows RANK CONFIRMED with settled stamp angle',
    'Replay clears card and stamp before rerunning',
    'Reduced motion shows settled card + −12° stamp immediately',
  ],,
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission rank reveal',
  },
}
