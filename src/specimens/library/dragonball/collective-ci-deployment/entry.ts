import type { Specimen } from '../../../types'
export const collectiveCiDeployment: Specimen = {
  id: 'collective-ci-deployment',
  ref: 'SPX-1196',
  title: 'Collective CI Deployment',
  blurb:
    'Six orbit CI nodes charge a central deployment mass on a frozen schedule; each PASSED job sends one orb inward until 6/6 unlocks DEPLOY — readiness, not auto-deploy.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired collective charge → CI pipeline aggregation',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all jobs show PASSED immediately with 6/6 CHARGE, READY, six links, and DEPLOY enabled — no pulses or orb travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 480,
    background: 'dark',
    label: 'Collective CI deployment readiness',
  },
  integration: [
    'Keep the radial arena: six orbit job nodes, six frozen SVG paths, central deployment mass that grows only on orb arrival.',
    'Call runCollectiveCi() / resetCollectiveCi() / replayCollectiveCi(); COLLECTIVE_CI_TIMING export available.',
    'Frozen schedule: LINT 420 · UNIT 680 · BUILD 920 · E2E 1240 · SECURITY 1510 · PACKAGE 1780ms; travel 240ms.',
  ],
  acceptance: [
    'Six jobs complete on frozen schedule; each emits exactly one charge orb.',
    'Deployment mass grows 34→86 only on arrival; CHARGE reads 0/6→6/6.',
    'PACKAGE contributes last; DEPLOY enables at 6/6 but does not execute.',
    'Reduced motion immediately shows all PASSED, six lit paths, READY, DEPLOY enabled.',
  ],
}
