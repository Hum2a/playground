import type { Specimen } from '../../../types'

export const signalFlowPulse: Specimen = {
  id: 'signal-flow-pulse', ref: 'SPX-3860', title: 'Signal Flow Pulse',
  blurb: 'A manufacturer-neutral music equipment primitive for signal flow pulse.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'fader'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Signal Flow Pulse' },
}
