import type { Specimen } from '../../../types'

export const handSignComboSequence: Specimen = {
  id: 'hand-sign-combo-sequence',
  ref: 'SPX-2344',
  title: 'Hand-Sign Combo Sequence',
  blurb:
    'Four distinct glyphs (peak, ring, bars, plate) snap-latch one-by-one into a READY command sequence.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — command sequences',
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
  tags: ['command-sequence', 'input', 'ritual', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four signs appear acquired immediately as READY with no snap.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Hand-sign combo sequence',
  },
}
