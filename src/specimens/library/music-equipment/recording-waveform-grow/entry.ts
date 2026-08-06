import type { Specimen } from '../../../types'

export const recordingWaveformGrow: Specimen = {
  id: 'recording-waveform-grow', ref: 'SPX-3924', title: 'Recording Waveform Grow',
  blurb: 'A manufacturer-neutral music equipment primitive for recording waveform grow.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'meter'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Recording Waveform Grow' },
}
