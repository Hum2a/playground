import type { Specimen } from '../../../types'

export const quantizeSweep: Specimen = {
  id: 'quantize-sweep', ref: 'SPX-3956', title: 'Quantize Sweep',
  blurb: 'A manufacturer-neutral music equipment primitive for quantize sweep.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'tape'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Quantize Sweep' },
}
