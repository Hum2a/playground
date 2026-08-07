import type { Specimen } from '../../../types'

export const chakraControlBalance: Specimen = {
  id: 'chakra-control-balance',
  ref: 'SPX-2358',
  title: 'Chakra Control Balance',
  blurb:
    'Dual chakra inputs draw a needle into a ±0.08 centre band (wobble 0.035) and lock.',
  origin: {
    project: 'Original',
    surface: 'Naruto / chakra training — control balance',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["balance","hold","equilibrium"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the needle appears LOCKED in the centre band immediately.',
  },
    acceptance: [
    'Needle must settle within lock threshold ±0.08 and hold lockHoldMs 380',
    'Auto-run applies frozen wobble amplitude 0.035 while seeking centre',
    'Resolved latches LOCKED with lock pulse 150ms',
    'Replay restores unbalanced needle before rerunning',
    'Reduced motion shows LOCKED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Chakra Control Balance',
  },
}
