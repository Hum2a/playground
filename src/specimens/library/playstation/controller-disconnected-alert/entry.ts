import type { Specimen } from '../../../types'

export const controllerDisconnectedAlert: Specimen = {
  id: 'controller-disconnected-alert',
  ref: 'SPX-3415',
  title: 'Controller Disconnected Alert',
  blurb: 'Input loss produces a high-priority modal-like interruption over the play surface.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ["alert","controller","modal"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Overlay appears instantly without fade.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    label: 'Controller disconnected alert',
  },
}
