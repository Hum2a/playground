import type { Specimen } from '../types'
export const missionControlSpread: Specimen = {
  id: 'mission-control-spread',
  ref: 'SPX-1348',
  title: 'Mission Control Spread',
  blurb:
    'Five overlapping desktop windows spread into a separated overview over 520ms; SPACE // 01 appears at 60%; selecting EDITOR restores exact desktop coords with EDITOR frontmost in 460ms.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired Mission Control workspace overview',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['workspace', 'overview', 'windows'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, desktop and overview layouts swap instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 480,
    background: 'dark',

    label: 'Mission Control spread',
  },

}
