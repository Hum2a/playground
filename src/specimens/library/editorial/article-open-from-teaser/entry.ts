import type { Specimen } from '../types'

export const articleOpenFromTeaser: Specimen = {
  id: 'article-open-from-teaser',
  ref: 'SPX-3558',
  title: 'Article Open from Teaser',
  blurb: 'An original editorial motion primitive for article open from teaser.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'roll'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Article Open from Teaser' },
}
