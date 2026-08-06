import type { Specimen } from '../types'
export const verticalContentStretch: Specimen = {
  id: 'vertical-content-stretch',
  ref: 'SPX-1757',
  title: 'Vertical Content Stretch',
  blurb:
    'Top/bottom overscroll deforms content scaleY 1→1.055 with opposite transform origins; release settles 260ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired overscroll stretch physics',
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
  tags: ['overscroll', 'stretch', 'physics'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Replaces deformation with static 2px boundary emphasis under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 520,
    background: 'dark',

    label: 'Vertical content stretch',
  },

}
