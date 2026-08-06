import type { Specimen } from '../../../types'

export const seatCountTally: Specimen = {
  id: 'seat-count-tally',
  ref: 'SPX-3631',
  title: 'Seat Count Tally',
  blurb: 'An original editorial motion primitive for seat count tally.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'paper'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Seat Count Tally' },
}
