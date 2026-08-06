import type { Specimen } from '../../../types'

export const crossfaderBlend: Specimen = {
  id: 'crossfader-blend', ref: 'SPX-3846', title: 'Crossfader Blend',
  blurb: 'A manufacturer-neutral music equipment primitive for crossfader blend.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'deck'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Crossfader Blend' },
}
