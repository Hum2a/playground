import type { Specimen } from '../types'

export const raceCalledStamp: Specimen = {
  id: 'race-called-stamp',
  ref: 'SPX-3633',
  title: 'Race Called Stamp',
  blurb: 'An original editorial motion primitive for race called stamp.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'edit'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Race Called Stamp' },
}
