import type { Specimen } from '../types'
export const translucentMaterialLift: Specimen = {
  id: 'translucent-material-lift',
  ref: 'SPX-1536',
  title: 'Translucent Material Lift',
  blurb:
    'FILTERS panel lifts over a dense document grid with semi-transparent material, inner highlight, outer border, and 220ms spatial open.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired translucent material hierarchy',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['material', 'translucent', 'panel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, panel appears without scale or translation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 400,
    background: 'dark',

    label: 'Translucent material lift',
  },

}
