import type { Specimen } from '../types'

export const breakingNewsBannerSlam: Specimen = {
  id: 'breaking-news-banner-slam',
  ref: 'SPX-3523',
  title: 'Breaking News Banner Slam',
  blurb: 'An original editorial motion primitive for breaking news banner slam.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['editorial', 'slam'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Breaking News Banner Slam' },
}
