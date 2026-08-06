import type { Specimen } from '../../../types'

export const motorisedFaderRecall: Specimen = {
  id: 'motorised-fader-recall', ref: 'SPX-3761', title: 'Motorised Fader Recall',
  blurb: 'A manufacturer-neutral music equipment primitive for motorised fader recall.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'fader'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Motorised Fader Recall' },
}
