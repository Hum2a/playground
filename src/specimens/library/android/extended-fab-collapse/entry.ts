import type { Specimen } from '../../../types'
export const extendedFabCollapse: Specimen = {
  id: 'extended-fab-collapse',
  ref: 'SPX-1586',
  title: 'Extended FAB Collapse',
  blurb:
    '152×56 extended FAB contracts to 56×56 icon-only over 240ms when scroll down exceeds 48px — right edge anchored; expands after 36px up-scroll.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired extended FAB scroll collapse',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['fab', 'scroll', 'adaptive-control'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, width state switches immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 420,
    background: 'dark',

    label: 'Extended FAB collapse',
  },

}
