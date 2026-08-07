import type { Specimen } from '../../../types'

export const cloudSyncProgress: Specimen = {
  id: 'cloud-sync-progress',
  ref: 'SPX-3446',
  title: 'Cloud Sync Progress',
  blurb:
    'Local and cloud vertical meters start unbalanced and climb together until both read 100% and the hub shows OK.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'loop',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['cloud', 'sync'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion both meters snap to 100% / SYNCED immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 320,
    background: 'dark',
    label: 'Cloud Sync Progress demo',
  },
}
