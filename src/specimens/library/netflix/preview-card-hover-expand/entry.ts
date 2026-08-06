import type { Specimen } from '../../../types'

export const previewCardHoverExpand: Specimen = {
  id: 'preview-card-hover-expand',
  ref: 'SPX-3144',
  title: 'Preview Card Hover Expand',
  blurb:
    'Focused content expands while adjacent cards translate outward rather than overlapping — hover and keyboard focus share the same geometry.',
  origin: {
    project: 'Original',
    surface: 'Streaming UI rail preview expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: { franchise: 'netflix' },
  tags: ['preview', 'hover', 'expand'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Expansion and neighbour push still apply without timed transitions under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 280,
    background: 'dark',
    label: 'Preview card hover expand demo',
  },
}
