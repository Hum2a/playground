import type { Specimen } from '../../../types'

export const reelSpinUp: Specimen = {
  id: 'reel-spin-up', ref: 'SPX-3881', title: 'Reel Spin-Up',
  blurb: 'A manufacturer-neutral music equipment primitive for reel spin-up.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'deck'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Reel Spin-Up' },
}
