import type { Specimen } from '../../../types'
export const pictureInPictureCollapse: Specimen = {
  id: 'picture-in-picture-collapse',
  ref: 'SPX-1814',
  title: 'Picture-in-Picture Collapse',
  blurb:
    '16:9 player collapses to 176×99 PiP at lower-right over 380ms; draggable within bounds; tap restores inline.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired picture-in-picture container transform',
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
  tags: ['pip', 'media', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Direct rectangle switch plus opacity handoff under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 700,
    background: 'dark',

    label: 'Picture-in-picture collapse',
  },

}
