import type { Specimen } from '../../../types'
export const dockLaunchBounce: Specimen = {
  id: 'dock-launch-bounce',
  ref: 'SPX-1339',
  title: 'Dock Launch Bounce',
  blurb:
    'APP // 03 performs exactly three decreasing launch bounces (34 / 24 / 14px peaks, ~820ms), holds 80ms, then resolves into a 5×5 running indicator and RUNNING status.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired dock launch bounce and running indicator',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['dock', 'launch', 'bounce'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, no bounce; running indicator and RUNNING appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 220,
    background: 'dark',

    label: 'Dock launch bounce',
  },

}
