import type { Specimen } from '../../../types'

export const redactionApply: Specimen = {
  id: 'redaction-apply',
  ref: 'SPX-3600',
  title: 'Redaction Apply',
  blurb: 'An original editorial motion primitive for redaction apply.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'typeset'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Redaction Apply' },
}
