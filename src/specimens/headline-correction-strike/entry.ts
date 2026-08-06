import type { Specimen } from '../types'

export const headlineCorrectionStrike: Specimen = {
  id: 'headline-correction-strike',
  ref: 'SPX-3544',
  title: 'Headline Correction Strike',
  blurb: 'An original editorial motion primitive for headline correction strike.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['editorial', 'tally'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Headline Correction Strike' },
}
