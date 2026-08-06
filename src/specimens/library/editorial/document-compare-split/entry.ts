import type { Specimen } from '../../../types'

export const documentCompareSplit: Specimen = {
  id: 'document-compare-split',
  ref: 'SPX-3605',
  title: 'Document Compare Split',
  blurb: 'An original editorial motion primitive for document compare split.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'roll'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Document Compare Split' },
}
