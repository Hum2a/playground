import type { Specimen } from '../../../types'

export const patchCableConnect: Specimen = {
  id: 'patch-cable-connect', ref: 'SPX-3856', title: 'Patch Cable Connect',
  blurb: 'A manufacturer-neutral music equipment primitive for patch cable connect.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', 'timeline'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Patch Cable Connect' },
}
