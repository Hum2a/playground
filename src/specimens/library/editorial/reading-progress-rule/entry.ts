import type { Specimen } from '../types'

export const readingProgressRule: Specimen = {
  id: 'reading-progress-rule',
  ref: 'SPX-3561',
  title: 'Reading Progress Rule',
  blurb: 'An original editorial motion primitive for reading progress rule.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'edit'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Reading Progress Rule' },
}
