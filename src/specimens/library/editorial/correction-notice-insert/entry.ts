import type { Specimen } from '../../../types'

export const correctionNoticeInsert: Specimen = {
  id: 'correction-notice-insert',
  ref: 'SPX-3591',
  title: 'Correction Notice Insert',
  blurb: 'An original editorial motion primitive for correction notice insert.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'ticker'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Correction Notice Insert' },
}
