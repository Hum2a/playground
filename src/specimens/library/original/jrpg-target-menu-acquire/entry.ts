import type { Specimen } from '../../../types'

export const jrpgTargetMenuAcquire: Specimen = {
  id: 'jrpg-target-menu-acquire',
  ref: 'SPX-1214',
  title: 'JRPG Target Menu Acquire',
  blurb:
    'An angular four-corner reticle acquires one of three original battle targets and mechanically steps between them.',
  origin: {
    project: 'Original',
    surface: 'Classic JRPG-style battle target acquisition',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['targeting', 'reticle', 'selection', 'acquisition'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The reticle and selected target jump directly to their fixed target state under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'JRPG target acquisition',
  },
}
