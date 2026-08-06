import type { Specimen } from '../types'

export const lateEditionStamp: Specimen = {
  id: 'late-edition-stamp',
  ref: 'SPX-3525',
  title: 'Late Edition Stamp',
  blurb: 'An original editorial motion primitive for late edition stamp.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['editorial', 'typeset'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Late Edition Stamp' },
}
