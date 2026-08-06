import type { Specimen } from '../../../types'
export const collapsingAppBar: Specimen = {
  id: 'collapsing-app-bar',
  ref: 'SPX-1762',
  title: 'Collapsing App Bar',
  blurb:
    '152px app bar collapses to 64px over first 96px scroll; same title element interpolates 32→20px; divider after 88px.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired collapsing toolbar',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['scroll', 'app-bar', 'header'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Geometry updates directly from scroll position under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 600,
    background: 'dark',

    label: 'Collapsing app bar',
  },

}
