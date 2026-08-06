import type { Specimen } from '../types'

export const previewCardHoverExpand: Specimen = {
  id: 'preview-card-hover-expand',
  ref: 'SPX-3144',
  title: 'Preview Card Hover Expand',
  blurb:
    'Hovering or focusing a content card scales it up in place while its neighbours translate outward — no overlap, no layout jump.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming rail preview expansion (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['preview', 'hover', 'expand'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Expand/push states still apply instantly with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 260,
    background: 'dark',
    label: 'Preview card hover expand demo',
  },
}
