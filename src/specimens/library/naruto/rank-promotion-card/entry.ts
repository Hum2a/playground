import type { Specimen } from '../../../types'

export const rankPromotionCard: Specimen = {
  id: 'rank-promotion-card',
  ref: 'SPX-2544',
  title: 'Rank Promotion Card',
  blurb:
    'A profile badge morphs GENIN→CHUNIN through collapse (140ms), expand (180ms), and glow (280ms) phases.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-rank-promotion — profile transformation',
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
  tags: ['promotion', 'rank', 'profile'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the profile shows CHUNIN / PROMOTED immediately with no morph.',
  },
    acceptance: [
    'Idle shows GENIN badge only (CURRENT)',
    'Morph phases: collapse 140ms → expand CHUNIN 180ms → glow 280ms',
    'Resolved shows CHUNIN with PROMOTED status',
    'Replay restores GENIN before rerunning',
    'Reduced motion shows CHUNIN / PROMOTED immediately',
  ],,
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Rank promotion card',
  },
}
