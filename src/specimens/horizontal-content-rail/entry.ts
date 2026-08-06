import type { Specimen } from '../types'

export const horizontalContentRail: Specimen = {
  id: 'horizontal-content-rail',
  ref: 'SPX-3134',
  title: 'Horizontal Content Rail',
  blurb:
    'NEXT/PREV move a six-card rail by exactly one three-card viewport group, with identical easing in both directions.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming content rail (abstract)',
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
  tags: ['rail', 'carousel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Page changes apply instantly with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 260,
    background: 'dark',
    label: 'Horizontal content rail demo',
  },
}
