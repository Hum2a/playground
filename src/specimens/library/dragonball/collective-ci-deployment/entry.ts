import type { Specimen } from '../../../types'
export const collectiveCiDeployment: Specimen = {
  id: 'collective-ci-deployment',
  ref: 'SPX-1196',
  title: 'Collective CI Deployment',
  blurb:
    'Six CI jobs complete on a frozen schedule; each PASSED job sends one diamond token into RELEASE, which grows only on arrival until 6/6 unlocks DEPLOY — readiness, not auto-deploy.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Spirit Bomb collective contribution → CI pipeline',
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
  tags: ['progress', 'completion', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all jobs show PASSED immediately with 6/6, READY, six links, and DEPLOY enabled — no pulses or token travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 460,
    background: 'dark',

    label: 'Collective CI deployment readiness',
  },

}
