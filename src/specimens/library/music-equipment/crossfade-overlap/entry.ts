import type { Specimen } from '../../../types'

export const crossfadeOverlap: Specimen = {
  id: 'crossfade-overlap', ref: 'SPX-3948', title: 'Crossfade Overlap',
  blurb: 'A manufacturer-neutral music equipment primitive for crossfade overlap.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'patch'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Crossfade Overlap' },
}
