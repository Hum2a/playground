import type { Specimen } from '../types'

export const breakingTickerCrawl: Specimen = {
  id: 'breaking-ticker-crawl',
  ref: 'SPX-3622',
  title: 'Breaking Ticker Crawl',
  blurb: 'An original editorial motion primitive for breaking ticker crawl.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'slam'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Breaking Ticker Crawl' },
}
