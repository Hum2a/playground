import type { Specimen } from '../../../types'
export const controlModuleCollapse: Specimen = {
  id: 'control-module-collapse',
  ref: 'SPX-1472',
  title: 'Control Centre Module Collapse',
  blurb:
    'NETWORK expanded 320×210 retracts rows bottom-up at 35ms stagger; latency first; boundary contracts 300ms to 142×72 NETWORK // CONNECTED.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired system module collapse',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['control', 'rich-to-compact', 'collapse'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate collapse to compact state.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 260,
    background: 'dark',

    label: 'Control module collapse',
  },

}
