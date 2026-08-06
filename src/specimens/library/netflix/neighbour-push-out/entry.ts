import type { Specimen } from '../../../types'

export const neighbourPushOut: Specimen = {
  id: 'neighbour-push-out',
  ref: 'SPX-3147',
  title: 'Neighbour Push-Out',
  blurb:
    'SELECT expands a cursor card while only its immediate neighbours translate away to make room — they keep their own size, they never shrink.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming rail selection expansion (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['preview', 'layout'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Selection and push states still apply instantly with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 260,
    background: 'dark',
    label: 'Neighbour push-out demo',
  },
}
