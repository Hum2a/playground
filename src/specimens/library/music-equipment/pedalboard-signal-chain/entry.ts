import type { Specimen } from '../../../types'

export const pedalboardSignalChain: Specimen = {
  id: 'pedalboard-signal-chain', ref: 'SPX-3807', title: 'Pedalboard Signal Chain',
  blurb: 'A manufacturer-neutral music equipment primitive for pedalboard signal chain.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'sequence'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Pedalboard Signal Chain' },
}
