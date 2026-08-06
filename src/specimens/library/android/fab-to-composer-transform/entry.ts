import type { Specimen } from '../../../types'
export const fabToComposerTransform: Specimen = {
  id: 'fab-to-composer-transform',
  ref: 'SPX-1559',
  title: 'FAB-to-Composer Transform',
  blurb:
    '56×56 FAB grows into a 342×210 composer over 360ms; glyph rotates 45° and fades; content staggers in; Escape cancels.',
  origin: {
    project: 'Original',
    surface: 'Android Material FAB container transform',
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
  tags: ['fab', 'container-transform', 'composer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediate container geometry switch; contents reveal without movement.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 640,
    background: 'dark',

    label: 'FAB to composer transform',
  },

}
