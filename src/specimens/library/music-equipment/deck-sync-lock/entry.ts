import type { Specimen } from '../../../types'

export const deckSyncLock: Specimen = {
  id: 'deck-sync-lock', ref: 'SPX-3845', title: 'Deck Sync Lock',
  blurb: 'A manufacturer-neutral music equipment primitive for deck sync lock.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'sequence'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Deck Sync Lock' },
}
