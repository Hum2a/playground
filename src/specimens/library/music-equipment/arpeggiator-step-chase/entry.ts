import type { Specimen } from '../../../types'

export const arpeggiatorStepChase: Specimen = {
  id: 'arpeggiator-step-chase', ref: 'SPX-3819', title: 'Arpeggiator Step Chase',
  blurb: 'A manufacturer-neutral music equipment primitive for arpeggiator step chase.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'tape'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Arpeggiator Step Chase' },
}
