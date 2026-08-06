import type { Specimen } from '../../../types'

export const pressRollReveal: Specimen = {
  id: 'press-roll-reveal',
  ref: 'SPX-3575',
  title: 'Press Roll Reveal',
  blurb: 'An original editorial motion primitive for press roll reveal.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'replate'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Press Roll Reveal' },
}
