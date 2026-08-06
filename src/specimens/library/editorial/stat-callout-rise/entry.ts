import type { Specimen } from '../types'

export const statCalloutRise: Specimen = {
  id: 'stat-callout-rise',
  ref: 'SPX-3616',
  title: 'Stat Callout Rise',
  blurb: 'An original editorial motion primitive for stat callout rise.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'tally'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Stat Callout Rise' },
}
