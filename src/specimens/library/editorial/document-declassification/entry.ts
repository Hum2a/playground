import type { Specimen } from '../../../types'

export const documentDeclassification: Specimen = {
  id: 'document-declassification',
  ref: 'SPX-3601',
  title: 'Document Declassification',
  blurb: 'An original editorial motion primitive for document declassification.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'rule'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Document Declassification' },
}
