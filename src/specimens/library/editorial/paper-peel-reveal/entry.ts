import type { Specimen } from '../types'

export const paperPeelReveal: Specimen = {
  id: 'paper-peel-reveal',
  ref: 'SPX-3569',
  title: 'Paper Peel Reveal',
  blurb: 'An original editorial motion primitive for paper peel reveal.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'slam'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Paper Peel Reveal' },
}
