import type { Specimen } from '../../../types'

export const oscilloscopeTrace: Specimen = {
  id: 'oscilloscope-trace', ref: 'SPX-3789', title: 'Oscilloscope Trace',
  blurb: 'A manufacturer-neutral music equipment primitive for oscilloscope trace.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'tuner'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Oscilloscope Trace' },
}
