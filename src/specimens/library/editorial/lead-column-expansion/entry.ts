import type { Specimen } from '../../../types'

export const leadColumnExpansion: Specimen = {
  id: 'lead-column-expansion',
  ref: 'SPX-3550',
  title: 'Lead Column Expansion',
  blurb: 'An original editorial motion primitive for lead column expansion.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'replate'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Lead Column Expansion' },
}
