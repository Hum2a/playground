import type { Specimen } from '../../../types'

export const transportPlayEngage: Specimen = {
  id: 'transport-play-engage', ref: 'SPX-3935', title: 'Transport Play Engage',
  blurb: 'A manufacturer-neutral music equipment primitive for transport play engage.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'switch'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Transport Play Engage' },
}
