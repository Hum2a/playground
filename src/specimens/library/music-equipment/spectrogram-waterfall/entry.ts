import type { Specimen } from '../../../types'

export const spectrogramWaterfall: Specimen = {
  id: 'spectrogram-waterfall', ref: 'SPX-3791', title: 'Spectrogram Waterfall',
  blurb: 'A manufacturer-neutral music equipment primitive for spectrogram waterfall.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'timeline'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Spectrogram Waterfall' },
}
