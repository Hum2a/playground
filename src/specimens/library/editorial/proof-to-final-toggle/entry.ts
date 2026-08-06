import type { Specimen } from '../../../types'

export const proofToFinalToggle: Specimen = {
  id: 'proof-to-final-toggle',
  ref: 'SPX-3581',
  title: 'Proof-to-Final Toggle',
  blurb: 'An original editorial motion primitive for proof-to-final toggle.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'paper'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Proof-to-Final Toggle' },
}
