import type { Specimen } from '../types'

export const gridCollapseToMobile: Specimen = {
  id: 'grid-collapse-to-mobile',
  ref: 'SPX-3555',
  title: 'Grid Collapse to Mobile',
  blurb: 'An original editorial motion primitive for grid collapse to mobile.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'paper'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Grid Collapse to Mobile' },
}
