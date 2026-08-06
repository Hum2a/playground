import type { Specimen } from '../../../types'

export const envelopeGeneratorCycle: Specimen = {
  id: 'envelope-generator-cycle', ref: 'SPX-3865', title: 'Envelope Generator Cycle',
  blurb: 'A manufacturer-neutral music equipment primitive for envelope generator cycle.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'scope'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Envelope Generator Cycle' },
}
