import type { Specimen } from '../../../types'

export const handSignComboSequence: Specimen = {
  id: 'hand-sign-combo-sequence',
  ref: 'SPX-2344',
  title: 'Hand-Sign Combo Sequence',
  blurb:
    'Four abstract command glyphs acquire one-by-one into a READY sequence — ritualised shortcut input without copyrighted sign art.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — command sequences',
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
  tags: ['command-sequence', 'input', 'ritual'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four signs appear acquired immediately as READY.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Hand-sign combo sequence',
  },
}
