import type { Specimen } from '../types'

export const headlineReflow: Specimen = {
  id: 'headline-reflow',
  ref: 'SPX-3541',
  title: 'Headline Reflow',
  blurb: 'An original editorial motion primitive for headline reflow.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['editorial', 'redact'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Headline Reflow' },
}
