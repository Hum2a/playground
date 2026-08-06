import type { Specimen } from '../types'
export const appLaunchExpansion: Specimen = {
  id: 'app-launch-expansion',
  ref: 'SPX-1399',
  title: 'App Launch Expansion',
  blurb:
    'APP // 05 expands from its exact 72×72 slot to a full ANALYTICS surface over 430ms while siblings recede to scale .92; glyph peaks at 1.18.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired grid tile launch transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['launch', 'expansion', 'grid', 'shared-origin'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, grid and detail swap instantly with outline — no large spatial travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 300,
    height: 380,
    background: 'dark',

    label: 'App launch expansion',
  },

}
