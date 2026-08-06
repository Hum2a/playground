import type { Specimen } from '../types'
export const windowSnapPreview: Specimen = {
  id: 'window-snap-preview',
  ref: 'SPX-1354',
  title: 'Window Snap Preview',
  blurb:
    'EDITOR 260×190 on 520×380 desktop — left 54px zone shows snap preview inset 10px over 120ms; release commits to left half in 260ms.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired window snap preview',
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
  tags: ['window', 'drag', 'preview'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, preview and committed snap appear instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 560,
    height: 420,
    background: 'dark',

    label: 'Window snap preview',
  },

}
