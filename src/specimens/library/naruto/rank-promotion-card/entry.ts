import type { Specimen } from '../../../types'

export const rankPromotionCard: Specimen = {
  id: 'rank-promotion-card',
  ref: 'SPX-2544',
  title: 'Rank Promotion Card',
  blurb:
    'Profile badge collapses Genin (140ms) then expands to Chunin (180ms) with a 280ms settle glow.',
  origin: {
    project: 'Original',
    surface: 'Naruto / rank system — promotion card',
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
  tags: ["rank","promotion","morph"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the Chunin badge appears immediately as PROMOTED.',
  },
  acceptance: [
    'collapseMs 140 → expandMs 180 → glowMs 280 GENIN→CHUNIN',
    'PROMOTED only after glow; one-shot',
    'Reduced motion shows Chunin PROMOTED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Rank promotion card',
  },
}
