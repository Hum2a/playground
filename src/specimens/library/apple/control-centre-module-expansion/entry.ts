import type { Specimen } from '../types'
export const controlCentreModuleExpansion: Specimen = {
  id: 'control-centre-module-expansion',
  ref: 'SPX-1471',
  title: 'Control Centre Module Expansion',
  blurb:
    'AUDIO compact tile at 62% expands to 320×210 over 340ms with slider, OUTPUT // SPEAKERS, and BALANCE // 0; changed volume persists after collapse.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired system module expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['control', 'compact-to-rich', 'slider'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, instant compact/expanded swap; slider remains functional.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 260,
    background: 'dark',

    label: 'Control module expansion',
  },

}
