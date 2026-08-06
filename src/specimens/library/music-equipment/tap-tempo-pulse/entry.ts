import type { Specimen } from '../../../types'

export const tapTempoPulse: Specimen = {
  id: 'tap-tempo-pulse', ref: 'SPX-3809', title: 'Tap Tempo Pulse',
  blurb: 'A manufacturer-neutral music equipment primitive for tap tempo pulse.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'deck'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Tap Tempo Pulse' },
}
