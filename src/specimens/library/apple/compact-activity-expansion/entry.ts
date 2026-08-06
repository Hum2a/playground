import type { Specimen } from '../../../types'
export const compactActivityExpansion: Specimen = {
  id: 'compact-activity-expansion',
  ref: 'SPX-1326',
  title: 'Compact Activity Expansion',
  blurb:
    'A 126×36 deploy capsule morphs to 318×152 over 360ms; progress glyph persists while header, job rows, and ETA construct at 35/50/68%.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired compact live-status expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['morph', 'live-activity', 'expansion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Geometry switches in 100ms non-scaling transition; all status text remains available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',

    label: 'Compact activity expansion',
  },

}
