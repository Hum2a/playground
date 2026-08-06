import type { Specimen } from '../types'

export const cloudSyncProgress: Specimen = {
  id: 'cloud-sync-progress',
  ref: 'SPX-3446',
  title: 'Cloud Sync Progress',
  blurb: 'Local and cloud nodes exchange a determinate sync beam — progress shuttles between endpoints until balanced.',
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
  },
  tags: ["cloud","sync"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion sync resolves to balanced state immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 300,
    background: 'dark',
    label: 'Cloud Sync Progress demo',
  },
}
