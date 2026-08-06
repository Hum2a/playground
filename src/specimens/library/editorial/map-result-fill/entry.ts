import type { Specimen } from '../types'

export const mapResultFill: Specimen = {
  id: 'map-result-fill',
  ref: 'SPX-3632',
  title: 'Map Result Fill',
  blurb: 'An original editorial motion primitive for map result fill.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'roll'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Map Result Fill' },
}
