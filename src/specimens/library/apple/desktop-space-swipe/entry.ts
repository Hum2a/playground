import type { Specimen } from '../../../types'
export const desktopSpaceSwipe: Specimen = {
  id: 'desktop-space-swipe',
  ref: 'SPX-1352',
  title: 'Desktop Space Swipe',
  blurb:
    'SPACE 01 (3 windows) and SPACE 02 (2 windows) on 520×360 viewport — planes slide 460ms with depth scale .985; indicator updates at 50%.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired desktop space navigation',
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
  tags: ['workspace', 'navigation', 'plane'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, space planes switch instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 560,
    height: 400,
    background: 'dark',

    label: 'Desktop space swipe',
  },

}
