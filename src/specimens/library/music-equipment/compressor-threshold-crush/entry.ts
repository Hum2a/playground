import type { Specimen } from '../../../types'

export const compressorThresholdCrush: Specimen = {
  id: 'compressor-threshold-crush', ref: 'SPX-3795', title: 'Compressor Threshold Crush',
  blurb: 'A manufacturer-neutral music equipment primitive for compressor threshold crush.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'fader'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Compressor Threshold Crush' },
}
