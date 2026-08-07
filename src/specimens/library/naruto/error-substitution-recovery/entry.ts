import type { Specimen } from '../../../types'

export const errorSubstitutionRecovery: Specimen = {
  id: 'error-substitution-recovery',
  ref: 'SPX-2387',
  title: 'Error Substitution Recovery',
  blurb:
    'Service A faults at 170ms, swaps to a decoy fallback with 4 residue marks, then a 140ms recovery latch settles Service B ACTIVE.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — substitution failover',
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
  tags: ['failover', 'recovery', 'decoy'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jump to the latched recovered fallback with no intermediate motion.',
  },
  acceptance: [
    'Primary faults at 170ms then decoy fallback acquires with 4 residue marks',
    'Recovery latch (140ms) settles Service B ACTIVE with primary FAULTED',
    'Reduced motion shows recovered fallback immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Error Substitution Recovery',
  },
}
