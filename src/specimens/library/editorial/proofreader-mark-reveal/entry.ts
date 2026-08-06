import type { Specimen } from '../../../types'

export const proofreaderMarkReveal: Specimen = {
  id: 'proofreader-mark-reveal',
  ref: 'SPX-3587',
  title: 'Proofreader Mark Reveal',
  blurb: 'An original editorial motion primitive for proofreader mark reveal.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'redact'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Proofreader Mark Reveal' },
}
