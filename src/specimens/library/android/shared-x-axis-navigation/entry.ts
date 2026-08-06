import type { Specimen } from '../types'
export const sharedXAxisNavigation: Specimen = {
  id: 'shared-x-axis-navigation',
  ref: 'SPX-1568',
  title: 'Shared X-Axis Navigation',
  blurb:
    'Three-step hierarchy with 300ms shared-axis panel transitions; persistent progress chrome; nav locks during animation.',
  origin: {
    project: 'Original',
    surface: 'Android Material shared-axis forward navigation',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['shared-axis', 'navigation', 'x-axis'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Content swaps with opacity only; no translation or scale.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 520,
    background: 'dark',

    label: 'Shared X-axis navigation',
  },

}
