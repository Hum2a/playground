import type { Specimen } from '../../../types'

export const beatgridLock: Specimen = {
  id: 'beatgrid-lock', ref: 'SPX-3849', title: 'Beatgrid Lock',
  blurb: 'A manufacturer-neutral music equipment primitive for beatgrid lock.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'tape'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Beatgrid Lock' },
}
