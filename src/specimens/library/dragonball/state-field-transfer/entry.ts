import type { Specimen } from '../../../types'
export const stateFieldTransfer: Specimen = {
  id: 'state-field-transfer',
  ref: 'SPX-1115',
  title: 'State Field Transfer',
  blurb:
    'Node A sheds wisps as its three-contour field collapses into a token that rides a lit conduit with trail and pulse to Node B, ignites on arrival, and rebuilds — never ACTIVE on both at once.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired state/aura transfer (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['state-transfer', 'inheritance', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, ownership snaps to A NONE / B ACTIVE with no travelling token.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 340,
    background: 'dark',

    label: 'State field transfer A→B',
  },

}
