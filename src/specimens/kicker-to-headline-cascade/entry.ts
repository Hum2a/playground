import type { Specimen } from '../types'

export const kickerToHeadlineCascade: Specimen = {
  id: 'kicker-to-headline-cascade',
  ref: 'SPX-3543',
  title: 'Kicker-to-Headline Cascade',
  blurb: 'An original editorial motion primitive for kicker-to-headline cascade.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['editorial', 'ticker'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Kicker-to-Headline Cascade' },
}
