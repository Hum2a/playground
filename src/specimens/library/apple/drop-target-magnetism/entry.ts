import type { Specimen } from '../types'
export const dropTargetMagnetism: Specimen = {
  id: 'drop-target-magnetism',
  ref: 'SPX-1453',
  title: 'Drop Target Magnetism',
  blurb:
    'FILE // 07 drag proxy is pulled up to 28% toward ARCHIVE within 86px with four acquisition ticks below 42px; LOCKED never attracts.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired drop target magnetism',
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
  tags: ['drag', 'target', 'attraction'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, disable positional magnetism and use static valid-target outline when in bounds.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 280,
    background: 'dark',

    label: 'Drop target magnetism',
  },

}
