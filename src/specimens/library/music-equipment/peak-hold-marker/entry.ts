import type { Specimen } from '../../../types'

export const peakHoldMarker: Specimen = {
  id: 'peak-hold-marker', ref: 'SPX-3772', title: 'Peak Hold Marker',
  blurb: 'A manufacturer-neutral music equipment primitive for peak hold marker.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'sequence'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Peak Hold Marker' },
}
