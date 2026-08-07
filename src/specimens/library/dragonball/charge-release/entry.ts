import type { Specimen } from '../../../types'
export const chargeRelease: Specimen = {
  id: 'charge-release',
  ref: 'SPX-969',
  title: 'Charge Release',
  blurb:
    'LOCAL charges through a frozen ladder; RELEASE at 85% launches a lane trail and beam with afterimages, impact settles a deploy mark and residue on PRODUCTION.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired charge → release / commit (abstract)',
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
  tags: ['commit', 'execution', 'charge'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, charge steps may snap; RELEASE immediately shows PRODUCTION DEPLOYED, charge 0%, and COMMITTED with no travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 360,
    background: 'dark',

    label: 'Charge then release deploy',
  },

}
