import type { Specimen } from '../../../types'

export const waveformTrimHandles: Specimen = {
  id: 'waveform-trim-handles', ref: 'SPX-3944', title: 'Waveform Trim Handles',
  blurb: 'A manufacturer-neutral music equipment primitive for waveform trim handles.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'deck'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Waveform Trim Handles' },
}
