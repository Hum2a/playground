import type { Specimen } from '../../../types'
export const authenticationFailureReset: Specimen = {
  id: 'authentication-failure-reset',
  ref: 'SPX-1428',
  title: 'Authentication Failure Reset',
  blurb:
    'Scan field shakes 240ms on FAIL; four brackets rotate 8deg and retract 5px; NOT VERIFIED holds 650ms; restores to READY TO RETRY over 180ms.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired authentication failure reset',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['authentication', 'failure', 'retry'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, show NOT VERIFIED then READY TO RETRY without shake.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 280,
    height: 280,
    background: 'dark',

    label: 'Authentication failure reset',
  },

}
