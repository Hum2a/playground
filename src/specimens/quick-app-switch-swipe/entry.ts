import type { Specimen } from '../types'
export const quickAppSwitchSwipe: Specimen = {
  id: 'quick-app-switch-swipe',
  ref: 'SPX-1613',
  title: 'Quick App Switch Swipe',
  blurb:
    'Bottom 32px zone acquires horizontal swipe between two tasks; preview up to 72px / scale 0.96; commit at 96px or 0.6 px/ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired quick app switch gesture',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['gesture', 'task-switching', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, maintain drag preview but snap immediately on release.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 460,
    background: 'dark',

    label: 'Quick app switch swipe',
  },

}
