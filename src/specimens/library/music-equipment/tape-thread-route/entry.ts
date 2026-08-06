import type { Specimen } from '../../../types'

export const tapeThreadRoute: Specimen = {
  id: 'tape-thread-route', ref: 'SPX-3882', title: 'Tape Thread Route',
  blurb: 'A manufacturer-neutral music equipment primitive for tape thread route.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'patch'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Tape Thread Route' },
}
