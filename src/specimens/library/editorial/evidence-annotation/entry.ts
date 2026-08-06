import type { Specimen } from '../types'

export const evidenceAnnotation: Specimen = {
  id: 'evidence-annotation',
  ref: 'SPX-3604',
  title: 'Evidence Annotation',
  blurb: 'An original editorial motion primitive for evidence annotation.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'paper'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Evidence Annotation' },
}
