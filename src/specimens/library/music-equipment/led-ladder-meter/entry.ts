import type { Specimen } from '../../../types'

export const ledLadderMeter: Specimen = {
  id: 'led-ladder-meter', ref: 'SPX-3771', title: 'LED Ladder Meter',
  blurb: 'A manufacturer-neutral music equipment primitive for led ladder meter.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'switch'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'LED Ladder Meter' },
}
