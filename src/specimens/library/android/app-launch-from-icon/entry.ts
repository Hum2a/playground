import type { Specimen } from '../../../types'
export const appLaunchFromIcon: Specimen = {
  id: 'app-launch-from-icon',
  ref: 'SPX-1618',
  title: 'App Launch from Icon',
  blurb:
    '4×4 launcher grid: 56×56 Atlas tile expands from centre at scale 0.12 to full 390×700 app over 420ms; internals fade after 45%.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired launcher container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['launcher', 'icon', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediate full-screen switch with ≤100ms fade.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 700,
    background: 'dark',

    label: 'App launch from icon',
  },

}
