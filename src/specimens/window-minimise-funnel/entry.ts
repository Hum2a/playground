import type { Specimen } from '../types'
export const windowMinimiseFunnel: Specimen = {
  id: 'window-minimise-funnel',
  ref: 'SPX-1350',
  title: 'Window Minimise Funnel',
  blurb:
    'TERMINAL 380×250 funnels via clip-path into 52×34 dock token over 520ms — content clips at 70%, title persists; RESTORE reconstructs window.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired window minimise funnel',
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
  tags: ['window', 'minimise', 'funnel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, open and minimised states swap instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',

    label: 'Window minimise funnel',
  },

}
